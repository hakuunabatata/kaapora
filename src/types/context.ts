export interface ContextType {
  url: string;
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
  blockRequests?: string[];
  errors: string[];
}

export type Action = {
  action: string;
  [key: string]: any;
};
