export const getExternalUrl = (href: unknown) => {
  if (typeof href !== "string") {
    return;
  }

  try {
    const url = new URL(href);
    return ["http:", "https:"].includes(url.protocol) ? url : undefined;
  } catch {
    return;
  }
};
