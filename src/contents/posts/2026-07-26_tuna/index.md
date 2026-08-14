---
title: ランチャーにTunaを使ってみる
pubDate: 2026-07-26
description: キーボードから手を離さないとかっこいいよね
category: tech
tags:
  - tuna
  - macos
---

https://tunaformac.com/

Macのランチャーは今までRaycastを使っていたのですが、最近Tunaというランチャーを使っています。

[Quicksilver](https://qsapp.com/)というランチャーの思想を引き継いでいるようです。

subject(アプリケーション、クリップボードなど)を選び、action(開く、探すなど)を実行するという操作体系になっています。

ただ、個人的に良いと思ったところは、設定ファイルを`~/Library/Application Support/Tuna/config.toml`という所定の位置で読み書きする仕様なので、[dotfiles](https://github.com/tsunematsu21/dotfiles)での管理と相性が良いことです。
Raycastのセットアップのために設定ファイルをエクスポート・インポートするのが嫌だなぁと思っていたので、これは非常にありがたいです。

actionの部分は独自にスクリプトを作って拡張することができて、[Obsidian CLI](https://obsidian.md/cli)を使って入力値をデイリーノートに追記する、みたいなことができます。
入力値としてカレントウィンドウで選択中の文字列を渡したりとかもできました。

まだベータ版らしいですが、僕みたいなエンジョイ勢には十分なほど機能は充実していると思います。
