import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");
  return rss({
    title: "tsu.sh",
    description: "Kuso knowledge for you.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/${post.id}/`,
      customData: `<language>ja-jp</language>`,
    })),
  });
}
