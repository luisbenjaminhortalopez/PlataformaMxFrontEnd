export * from "./advertisement";
export * from "./news";
export * from "./news-detail";
export * from "./categories";
export * from "./related-news";

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
