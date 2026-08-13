---
title: dotfiles管理をNixに移行した
pubDate: 2026-07-25
description: その方がかっこいいから❄️
category: tech
tags:
  - nix
  - dotfiles
---

https://github.com/tsunematsu21/dotfiles

長らく、`make`をタスクランナー代わりにして、各種コマンドを実行する形で管理してきました。これはこれでシンプルで好きだったんです。

- パッケージインストール: `Brewfile` + `brew bundle install`
- システム設定: `defaults`
- 設定ファイル配置: `stow`

だがしかし。

夜な夜な人様のdotfilesを眺めてニタニタしている僕の偏見によれば、dotfilesをNixで管理している人は、つよつよエンジニアであることが報告されています。

構成に悩んだとき、何を根拠に決めるか。僕の基準は「どちらがかっこいいか」です。

というわけで、思い切ってNixによる管理に移行してみました。

結果として、かっこよくなったと思います。Mac 1台のためにやるにはトゥーマッチな気もします。でも、かっこいいのでOKです。

そもそも「Nixって何？」からのスタートでした。いろいろな人のNixコードを眺めては、意味が分からずそっ閉じすることを繰り返し、今は以下の構成に落ち着いています。

- [NixOS/nix-installer](https://github.com/NixOS/nix-installer): Nixのインストーラー
- Flakes
	- [hercules-ci/flake-parts](https://github.com/hercules-ci/flake-parts): モジュールの分割
	- [denful/import-tree](https://github.com/denful/import-tree): モジュールの自動インポート
	- [nix-darwin/nix-darwin](https://github.com/nix-darwin/nix-darwin): システム設定やGUIアプリの管理
	- [nix-community/home-manager](https://github.com/nix-community/home-manager): パッケージや設定ファイルの管理
	- [numtide/treefmt-nix](https://github.com/numtide/treefmt-nix): フォーマッター

今後も人様のdotfilesを眺めつつアップデートしていきたいです。
