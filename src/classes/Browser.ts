import { Page, Browser as PuppeteerBrowser } from "puppeteer";
import puppeteerExtra from "puppeteer-extra";
import { Context } from ".";

export class Browser {
  private browser?: PuppeteerBrowser;

  constructor(private context: Context) {}

  public async launch() {
    this.browser = await puppeteerExtra.launch({
      headless: false,
      timeout: 0,
      ignoreHTTPSErrors: true,
      executablePath: "google-chrome-stable",
      args: [
        "--disable-gpu",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-web-security",
        "--disable-notifications",
        "--disable-dev-shm-usage",
        "--memory-pressure-off",
        "--ignore-certificate-errors",
        "--disable-features=site-per-process",
      ],
    });

    const page = await this.browser.newPage();

    await page.setViewport({ width: 1366, height: 3000 });

    return page;
  }
}
