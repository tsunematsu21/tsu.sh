import { defineHastPlugin, type HastContent } from "satteri";
import { getExternalUrl } from "./url";

const GITHUB_HOSTNAME = "github.com";
const LINK_CARD_CLASS = "link-card";

const createExternalLinkIcon = (isGitHub: boolean) =>
  ({
    type: "element",
    tagName: "span",
    properties: {
      ariaHidden: "true",
      className: isGitHub
        ? ["i-simple-icons-github", "text-sm", "mr-1"]
        : ["i-ph-arrow-up-right-bold", "text-sm"],
    },
    children: [],
  }) satisfies HastContent;

export const externalLinks = defineHastPlugin({
  name: "external-links",
  element: {
    filter: ["a"],
    visit(node, ctx) {
      const className = node.properties.className;

      if (Array.isArray(className) && className.includes(LINK_CARD_CLASS)) {
        return;
      }

      const url = getExternalUrl(node.properties.href);

      if (!url) {
        return;
      }

      const isGitHub = url.hostname === GITHUB_HOSTNAME;
      const icon = createExternalLinkIcon(isGitHub);

      ctx.setProperty(node, "target", "_blank");
      ctx.setProperty(node, "rel", "noopener noreferrer");

      if (isGitHub) {
        ctx.prependChild(node, icon);
      } else {
        ctx.appendChild(node, icon);
      }
    },
  },
});
