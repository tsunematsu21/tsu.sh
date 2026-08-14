---
title: Neovim + Herdr + Ghostty で作る開発環境
pubDate: 2026-07-05
description: Neovimの洗礼
category: tech
tags:
  - neovim
  - herdr
  - ghostty
---

## エディタ
仕事でもプライベートでもVS Codeを使っていました。

なんとなくVimmerってかっこいいかなと思って、
とりあえずプライベートでNeovimを使ってみることにしました。

設定周りはこちら👇

https://github.com/tsunematsu21/dotfiles/tree/main/config/nvim


## ターミナルマルチプレクサ
一緒にCodexとかも使いたくって、ターミナルマルチプレクサを色々試してみたのですが、とりあえずHerdrにしてみました。
* [tmux](https://github.com/tmux/tmux)
  * 情報も多いし、枯れた技術で安定している感ある
  * カスタマイズ前提なのはズボラにはしんどい
* [zellij](https://zellij.dev/)
  * なんか見た目の主張が激しい（設定できたのかも）
* [herdr](https://herdr.dev/)
  * 標準でAIエージェントと連携
  * カスタマイズしなくても使いやすかった

なんかAIエージェントネイティブなtmuxって感じみたいです。

[Custom command keybindings](https://herdr.dev/docs/configuration/#custom-command-keybindings)というもので、キーバインド一つでlazygitを使い捨てペインで起動できるのも嬉しい。

## ターミナル
ターミナルは[Ghostty](https://ghostty.org/)を使っています。

こちらもそんなに設定しなくても使いやすくて嬉しい。

元々は[Warp](https://www.warp.dev/)を使っていましたが、
AI機能がおせっかいすぎて嫌なので乗り換えました。
