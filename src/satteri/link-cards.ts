import openGraphScraper from "open-graph-scraper";
import { defineMdastPlugin } from "satteri";
import { getExternalUrl } from "./url";

const LINK_CARD_CLASS = "link-card";
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/127.0.0.0 Safari/537.36";

interface LinkMetadata {
  description?: string;
  favicon: string;
  image?: string;
  title: string;
}

const metadataCache = new Map<string, Promise<LinkMetadata | undefined>>();

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );

const normalizeUrl = (value: string | undefined, baseUrl: URL) => {
  if (!value) {
    return;
  }

  try {
    return new URL(value, baseUrl).href;
  } catch {
    return;
  }
};

const fetchLinkMetadata = async (url: URL) => {
  const cached = metadataCache.get(url.href);

  if (cached) {
    return cached;
  }

  const request = (async () => {
    try {
      const { error, result } = await openGraphScraper({
        url: url.href,
        timeout: 5,
        fetchOptions: {
          headers: { "user-agent": USER_AGENT },
        },
      });

      if (error) {
        return;
      }

      return {
        title: result.ogTitle ?? url.hostname,
        description: result.ogDescription,
        favicon:
          normalizeUrl(result.favicon, url) ??
          `https://www.google.com/s2/favicons?domain=${url.hostname}`,
        image: normalizeUrl(result.ogImage?.[0]?.url, url),
      } satisfies LinkMetadata;
    } catch {
      return;
    }
  })();

  metadataCache.set(url.href, request);
  return request;
};

const renderLinkCard = (url: URL, metadata: LinkMetadata) => {
  const href = escapeHtml(url.href);
  const title = escapeHtml(metadata.title);
  const description = metadata.description
    ? `<div class="link-card__description">${escapeHtml(metadata.description)}</div>`
    : "";
  const image = metadata.image
    ? `<div class="link-card__thumbnail"><img src="${escapeHtml(metadata.image)}" class="link-card__image" alt="" loading="lazy"></div>`
    : "";
  const mainClass = metadata.image
    ? "link-card__main"
    : "link-card__main link-card__main--full";

  return `<div class="link-card__container"><a href="${href}" target="_blank" rel="noopener noreferrer" class="${LINK_CARD_CLASS}"><div class="${mainClass}"><div class="link-card__content"><div class="link-card__title">${title}</div>${description}</div><div class="link-card__meta"><img src="${escapeHtml(metadata.favicon)}" class="link-card__favicon" width="14" height="14" alt=""><span class="link-card__url">${escapeHtml(url.hostname)}</span></div></div>${image}</a></div>`;
};

export const linkCards = defineMdastPlugin({
  name: "link-cards",
  async paragraph(node, ctx) {
    const parent = ctx.parent(node);
    const [link] = node.children;

    if (
      parent?.type !== "root" ||
      node.children.length !== 1 ||
      link?.type !== "link" ||
      link.children.length !== 1 ||
      link.children[0]?.type !== "text" ||
      link.children[0].value !== link.url
    ) {
      return;
    }

    const url = getExternalUrl(link.url);

    if (!url) {
      return;
    }

    const metadata = await fetchLinkMetadata(url);

    if (!metadata) {
      return;
    }

    return {
      raw: renderLinkCard(url, metadata),
      mdxExpressions: false,
    };
  },
});
