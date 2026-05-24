import { chromium } from "@playwright/test";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const url = process.env.VISUAL_REVIEW_URL ?? "http://127.0.0.1:3001/starmap";
const outputDir = path.resolve("artifacts", "visual-review");

const browserCandidates = [
  process.env.PLAYWRIGHT_CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
].filter(Boolean);

function findBrowserExecutable() {
  return browserCandidates.find((candidate) => existsSync(candidate));
}

async function analyzeImageSignal(page, imageBuffer) {
  const dataUrl = `data:image/png;base64,${imageBuffer.toString("base64")}`;

  return page.evaluate(async (src) => {
    const image = new Image();
    image.src = src;
    await image.decode();

    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      return { brightPixels: 0, variedPixels: 0, width: canvas.width, height: canvas.height };
    }

    context.drawImage(image, 0, 0);

    let brightPixels = 0;
    let variedPixels = 0;
    const yLimit = Math.floor(canvas.height * 0.82);
    const xStart = 16;
    const yStart = 16;
    const xEnd = canvas.width - 16;

    for (let x = xStart; x < xEnd; x += 8) {
      for (let y = yStart; y < yLimit; y += 8) {
        const [red, green, blue] = context.getImageData(x, y, 1, 1).data;
        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);

        if (max > 58) {
          brightPixels += 1;
        }

        if (max - min > 10) {
          variedPixels += 1;
        }
      }
    }

    return { brightPixels, variedPixels, width: canvas.width, height: canvas.height };
  }, dataUrl);
}

async function captureStarmapSignal(page, filename) {
  const target = page.locator('[data-visual-target="starmap-canvas"]');
  const hasCanvas = (await target.locator("canvas").count()) > 0;

  if (!hasCanvas) {
    return { hasCanvas: false, brightPixels: 0, variedPixels: 0, width: 0, height: 0 };
  }

  const image = await target.screenshot({ path: path.join(outputDir, filename) });
  const signal = await analyzeImageSignal(page, image);

  return { hasCanvas: true, ...signal };
}

async function findHorizontalOverflow(page) {
  return page.evaluate(() => {
    const bodyWidth = document.documentElement.clientWidth;
    const pageOverflow = document.documentElement.scrollWidth - bodyWidth;
    const elements = Array.from(document.querySelectorAll("h1,h2,h3,p,button,span,dd,dt"));

    function isInsideHorizontalScroller(element) {
      let current = element.parentElement;

      while (current && current !== document.body) {
        const style = window.getComputedStyle(current);
        const scrollsX =
          (style.overflowX === "auto" || style.overflowX === "scroll") &&
          current.scrollWidth > current.clientWidth + 2;

        if (scrollsX) {
          return true;
        }

        current = current.parentElement;
      }

      return false;
    }

    const offenders = elements
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          text: element.textContent?.trim().slice(0, 40) ?? "",
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width)
        };
      })
      .filter((item, index) => {
        const element = elements[index];
        return (
          item.width > 0 &&
          (item.left < -2 || item.right > bodyWidth + 2) &&
          !isInsideHorizontalScroller(element)
        );
      })
      .slice(0, 5);

    return { pageOverflow, offenders };
  });
}

async function main() {
  const executablePath = findBrowserExecutable();

  if (!executablePath) {
    throw new Error(
      "No system Chrome or Edge executable found. Install Chrome/Edge or set PLAYWRIGHT_CHROME_PATH."
    );
  }

  mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 1
  });

  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForSelector("canvas", { timeout: 20000 });
  await page.waitForTimeout(1600);

  const desktopText = await page.evaluate(() => document.body.innerText);
  const desktopCanvas = await captureStarmapSignal(page, "starmap-canvas-desktop.png");
  await page.screenshot({ path: path.join(outputDir, "starmap-desktop.png"), fullPage: true });

  await page.getByRole("button", { name: /主序星/ }).click();
  await page.getByRole("button", { name: /查看织女星/ }).click();
  const interactionText = await page.evaluate(() => document.body.innerText);

  await page.setViewportSize({ width: 390, height: 1000 });
  await page.waitForTimeout(900);
  const mobileCanvas = await captureStarmapSignal(page, "starmap-canvas-mobile.png");
  const mobileOverflow = await findHorizontalOverflow(page);
  await page.screenshot({ path: path.join(outputDir, "starmap-mobile.png"), fullPage: true });

  await browser.close();

  const result = {
    url,
    browser: executablePath,
    desktop: {
      hasChinese: desktopText.includes("交互星图"),
      hasBrand: desktopText.includes("Cosmos Atlas"),
      hasCanvas: desktopCanvas.hasCanvas,
      canvasSignal: desktopCanvas
    },
    interaction: {
      selectedVega: interactionText.includes("织女星"),
      filterVisible: interactionText.includes("主序星")
    },
    mobile: {
      hasCanvas: mobileCanvas.hasCanvas,
      canvasSignal: mobileCanvas,
      pageOverflow: mobileOverflow.pageOverflow,
      overflowCount: mobileOverflow.offenders.length,
      overflowExamples: mobileOverflow.offenders
    },
    screenshots: [
      path.join(outputDir, "starmap-desktop.png"),
      path.join(outputDir, "starmap-mobile.png"),
      path.join(outputDir, "starmap-canvas-desktop.png"),
      path.join(outputDir, "starmap-canvas-mobile.png")
    ]
  };

  const failures = [];

  if (!result.desktop.hasChinese) failures.push("missing Chinese starmap heading");
  if (!result.desktop.hasBrand) failures.push("missing Cosmos Atlas brand text");
  if (!result.desktop.hasCanvas) failures.push("missing desktop canvas");
  if (result.desktop.canvasSignal.brightPixels < 3) failures.push("desktop canvas appears blank");
  if (!result.interaction.selectedVega) failures.push("star selection interaction did not update");
  if (!result.interaction.filterVisible) failures.push("filter interaction did not run");
  if (!result.mobile.hasCanvas) failures.push("missing mobile canvas");
  if (result.mobile.canvasSignal.brightPixels < 3) failures.push("mobile canvas appears blank");
  if (result.mobile.pageOverflow > 2) failures.push("mobile page has horizontal overflow");
  if (result.mobile.overflowCount > 0) failures.push("mobile text has horizontal overflow");

  console.log(JSON.stringify({ ...result, failures }, null, 2));

  if (failures.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
