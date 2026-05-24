import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const baseUrl = process.env.COSMOS_ATLAS_BASE_URL ?? "http://127.0.0.1:3001";
const outputDir = path.join(process.cwd(), "artifacts", "visual-review");

const browserCandidates = [
  process.env.PLAYWRIGHT_CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
].filter(Boolean);

function findBrowserExecutable() {
  return browserCandidates.find((candidate) => fs.existsSync(candidate));
}

function recordFailure(failures, message, details = undefined) {
  failures.push(details ? { message, details } : { message });
}

async function collectPageOverflow(page) {
  return page.evaluate(() => {
    const pageOverflow = Math.max(0, document.documentElement.scrollWidth - window.innerWidth);
    const offenders = [...document.querySelectorAll("body *")]
      .map((node) => {
        const element = node;
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName,
          text: (element.textContent ?? "").trim().slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width)
        };
      })
      .filter((item) => item.right > window.innerWidth + 2 || item.left < -2)
      .slice(0, 10);

    return { pageOverflow, offenders };
  });
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const executablePath = findBrowserExecutable();
  if (!executablePath) {
    throw new Error("No system Chrome or Edge executable found for visual review.");
  }

  const failures = [];
  const browser = await chromium.launch({ executablePath });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

  const url = `${baseUrl}/`;
  await page.goto(url, { waitUntil: "networkidle" });

  const bodyText = await page.locator("body").innerText();
  for (const requiredText of [
    "Cosmos Atlas",
    "沿着光、时间和尺度进入可观测宇宙。",
    "宇宙旅程入口",
    "今日推荐探索",
    "站点地图"
  ]) {
    if (!bodyText.includes(requiredText)) {
      recordFailure(failures, `Missing required text: ${requiredText}`);
    }
  }

  const routeHrefs = ["/", "/missions", "/cosmic-timeline", "/structure", "/starmap", "/gallery"];
  for (const href of routeHrefs) {
    const count = await page.locator(`[href="${href}"]`).count();
    if (count === 0) {
      recordFailure(failures, `Missing route link: ${href}`);
    }
  }

  if ((await page.locator('[data-visual-target="home-hero"]').count()) === 0) {
    recordFailure(failures, "Missing home hero visual target.");
  }

  if ((await page.locator('[data-visual-target="home-journey-routes"]').count()) === 0) {
    recordFailure(failures, "Missing home journey routes visual target.");
  }

  await page.screenshot({
    path: path.join(outputDir, "home-desktop.png"),
    fullPage: true
  });

  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto(url, { waitUntil: "networkidle" });
  const mobileOverflow = await collectPageOverflow(page);
  if (mobileOverflow.pageOverflow > 2) {
    recordFailure(failures, "Mobile page has horizontal overflow.", mobileOverflow);
  }

  await page.screenshot({
    path: path.join(outputDir, "home-mobile.png"),
    fullPage: true
  });

  await browser.close();

  const result = {
    baseUrl,
    browser: executablePath,
    url,
    screenshots: [
      path.join(outputDir, "home-desktop.png"),
      path.join(outputDir, "home-mobile.png")
    ],
    mobileOverflow,
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
