---
title: Astroでブログを作ってCloudflare Pagesで配信する
pubDate: 2025-11-01
description: 作ったは良いけど書くことがないし、続く気がしない
category: tech
tags:
  - astro
  - tailwind
  - cloudflare
---

Astroを使ってブログを作ってみました。

## 使った技術
### Astro
https://astro.build

どうせそのうち飽きて更新しなくなるだろうということで、そこまで凝った作りにしなくても良さそうなのと、あまり無料枠とか気にしなくてすみそうな静的コンテンツでのブログ作成をすることを念頭に調査。

他のフレームワークとかと比べてAstroはなんか速いらしい。知らんけど。なんとなく使ってみようということで選定。

### Content Collections
https://docs.astro.build/ja/guides/content-collections/

Markdownなどのコンテンツを、型安全に管理・取得するためのAstroの機能。

### Tailwind
https://tailwindcss.com

ユーティリティファーストなCSSフレームワーク。

自前でCSS書くよりは楽。もっと楽したいならBootstrapとかBulmaとか使った方が良いが自由度は下がる。

### Cloudflare Pages
https://www.cloudflare.com/ja-jp/developer-platform/products/pages/

安いという理由でCloudflareで独自ドメインを取っていたので、ついでにホスティングもCloudflareに。

最近はAWSのCloudFrontの定額プラン(無料あり)も出たのでそっちも良かったが、CI/CDとかはCloudflare Pagesの方が色々と準備されていて楽。
