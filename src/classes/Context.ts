import { Action, ContextType } from "../types";

export class Context implements ContextType {
  useBrowser: boolean;
  validation?: string;
  nextPage?: string;
  maxPages: number;
  proxy?: string;
  vars: Record<string, string>;
  fullScreen: boolean;
  downloadInfo: boolean;
  navigateToUrl: boolean;
  loadImages: boolean;
  waitForNavigation?:
    | "networkidle0"
    | "networkidle2"
    | "domcontentloaded"
    | "load";
  takeScreenshot: boolean;
  collectMetadata: boolean;
  actions: Action[];
  blockRequests: string[];
  errors: string[] = [];

  constructor(
    public url: string,
    {
      actions = [],
      blockRequests = [],
      collectMetadata = true,
      downloadInfo = true,
      fullScreen = true,
      loadImages = true,
      maxPages = 100,
      navigateToUrl,
      nextPage,
      proxy,
      takeScreenshot = true,
      useBrowser = false,
      validation,
      vars = {},
      waitForNavigation = "networkidle0",
    }: Partial<Omit<ContextType, "url" | "errors">>
  ) {
    this.useBrowser = useBrowser;
    if (useBrowser) {
      this.fullScreen = fullScreen;
      this.loadImages = loadImages;
      this.takeScreenshot = takeScreenshot;
      this.blockRequests = blockRequests;
      this.waitForNavigation = waitForNavigation;
      this.actions = [
        ...((navigateToUrl ?? true) || !actions.length
          ? [{ action: "NAVIGATE", url }]
          : []),
        ...actions,
        ...(takeScreenshot ? [{ action: "SCREENSHOT" }] : []),
        ...(downloadInfo ? [{ action: "DOWNLOAD" }] : []),
      ];
    } else {
      this.fullScreen = false;
      this.loadImages = false;
      this.takeScreenshot = false;
      this.blockRequests = [];
      this.actions = [
        ...((navigateToUrl ?? false) || !actions.length
          ? [{ action: "REQUEST", url }]
          : []),
        ...actions,
        ...(downloadInfo ? [{ action: "DOWNLOAD" }] : []),
      ];
    }

    this.collectMetadata = collectMetadata;
    this.nextPage = nextPage;
    this.validation = validation;
    this.proxy = proxy;
    this.maxPages = nextPage ? maxPages : 1;
    this.navigateToUrl = navigateToUrl ?? useBrowser ? true : false;
    this.downloadInfo = downloadInfo;
    this.vars = {
      page: "1",
      url,
      ...vars,
    };
  }
}
