import { chromium } from "@playwright/test";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const baseUrl = process.env.VISUAL_REVIEW_BASE_URL ?? "http://127.0.0.1:3001";
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

async function reviewPage({ page, pathName, target, selectButton, expectedText, desktopFile, mobileFile }) {
  const failures = [];
  const url = `${baseUrl}${pathName}`;

  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForSelector(target, { timeout: 20000 });
  await page.waitForTimeout(600);

  const initialText = await page.evaluate(() => document.body.innerText);

  if (!initialText.includes("Cosmos Atlas")) {
    failures.push(`${pathName}: missing Cosmos Atlas brand text`);
  }

  if (pathName === "/cosmic-timeline" && !initialText.includes("宇宙历史时间线")) {
    failures.push(`${pathName}: missing Chinese timeline heading`);
  }

  if (pathName === "/structure" && !initialText.includes("宇宙结构层级")) {
    failures.push(`${pathName}: missing Chinese structure heading`);
  }

  await page.getByRole("button", { name: selectButton }).click();
  await page.waitForTimeout(250);
  const interactionText = await page.evaluate(() => document.body.innerText);

  if (!interactionText.includes(expectedText)) {
    failures.push(`${pathName}: interaction did not reveal ${expectedText}`);
  }

  await page.screenshot({ path: path.join(outputDir, desktopFile), fullPage: true });

  await page.setViewportSize({ width: 390, height: 1000 });
  await page.waitForTimeout(700);
  const overflow = await findHorizontalOverflow(page);
  await page.screenshot({ path: path.join(outputDir, mobileFile), fullPage: true });

  if (overflow.pageOverflow > 2) {
    failures.push(`${pathName}: mobile page has horizontal overflow`);
  }

  if (overflow.offenders.length > 0) {
    failures.push(`${pathName}: mobile text has horizontal overflow`);
  }

  return {
    url,
    failures,
    interactionTextFound: interactionText.includes(expectedText),
    mobileOverflow: overflow,
    screenshots: [path.join(outputDir, desktopFile), path.join(outputDir, mobileFile)]
  };
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
  const page = await browser.newPage({ deviceScaleFactor: 1 });

  const timeline = await reviewPage({
    page,
    pathName: "/cosmic-timeline",
    target: '[data-visual-target="cosmic-timeline-explorer"]',
    selectButton: /太阳系形成/,
    expectedText: "陨石同位素记录",
    desktopFile: "cosmic-timeline-desktop.png",
    mobileFile: "cosmic-timeline-mobile.png"
  });

  const structure = await reviewPage({
    page,
    pathName: "/structure",
    target: '[data-visual-target="structure-explorer"]',
    selectButton: /宇宙网/,
    expectedText: "大规模红移巡天",
    desktopFile: "structure-desktop.png",
    mobileFile: "structure-mobile.png"
  });

  await browser.close();

  const failures = [...timeline.failures, ...structure.failures];
  const result = {
    baseUrl,
    browser: executablePath,
    timeline,
    structure,
    failures
  };

  console.log(JSON.stringify(result, null, 2));

  if (failures.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
