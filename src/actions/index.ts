export * from "./advertisement";
export * from "./news";

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
