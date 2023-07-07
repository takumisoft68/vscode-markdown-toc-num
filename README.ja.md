# Markdown TOC & Chapter Number

マークダウンに目次作成コマンドと章番号作成コマンドを追加する。

## 1. 主な機能

- 目次（TOC）を作成するコマンドを追加する
- 見出しに番号を付けるコマンドを追加する
- 目次と見出しの対象階層は独立して設定できる
- 目次にはアンカーリンクを付与することができる

## 2. デモ

![demo](images/insert.gif)

### 2.1. 設定値

| Configuration ID                  | Description                                                                              | Type   | Default |
| --------------------------------- | ---------------------------------------------------------------------------------------- | ------ | ------- |
| markdown-toc-num.tocDepthFrom     | 目次の階層, 開始 [1-6]                                                                   | number | 2       |
| markdown-toc-num.tocDepthTo       | 目次の階層, 終了 [1-6]                                                                   | number | 3       |
| markdown-toc-num.chapterDepthFrom | 見出しの階層, 開始 [1-6]                                                                 | number | 2       |
| markdown-toc-num.chapterDepthTo   | 見出しの階層, 終了 [1-6]                                                                 | number | 6       |
| markdown-toc-num.anchorMode       | アンカーの様式 [`vscode,gitlab`, `vscode`, `gitlab`, `github`, `azure`, `embed`, `none`] | string | vscode  |

各設定値はマークダウンファイル内でインラインでも指定できる。

```md
<!-- TOC tocDepth:2..3 chapterDepth:2..6 anchorMode:embed -->

<!-- TOC tocDepthFrom:2 tocDepthTo:3 chapterDepthFrom:1 chapterDepthTo:6 anchorMode:embed -->

<!-- TOC tocDepthFrom:1 tocDepthTo:6 anchorMode:github -->
```

## 3. 補足機能

### 3.1. 目次から除外する

対象の見出しの上に<!-- omit in toc -->と入力することで、その見出しは目次内容から除外される。

```md
# title

<!-- TOC tocDepth:2..3 chapterDepth:2..6 anchorMode:github -->

- [1. AAA](#user-content-1-aaa)
    - [1.2. AAA-2](#user-content-12-aaa-2)

<!-- /TOC -->

## 1. AAA

### 1.1. AAA-1 <!-- omit in toc -->

### 1.2. AAA-2
```

### 3.2. 目次に含める見出しの階層を指定する

設定の markdown-toc-num.tocDepthFrom, markdown-toc-num.tocDepthTo で指定した範囲の階層のみ目次に含める。

デフォルトは 2 - 3。

以下のように本文中で指定することもできる。

#### 3.2.1. 方法1

```md
<!-- TOC tocDepthFrom:1 tocDepthTo:6 -->
```

#### 3.2.2. 方法2

```md
<!-- TOC tocDepth:1..6 -->
```

### 3.3. 見出しに番号を付ける階層を指定する

設定の markdown-toc-num.chapterDepthFrom, markdown-toc-num.chapterDepthTo で指定した範囲の階層のみ番号を付けるようにできる。

デフォルトは 2 - 6。

以下のように本文中で指定することもできる。

#### 3.3.1. 方法1

```md
<!-- TOC chapterDepthFrom:2 chapterDepthTo:6 -->
```

#### 3.3.2. 方法2

```md
<!-- TOC chapterDepth:2..6 -->
```

## 4. 注力

特に日本語にフォーカスしたマークダウン目次作成エクステンション

## 5. アンカー作成スキーム

4種類が使えます。変更するにはanchorModeを指定します。

1. VSCode プレビュー画面 & GitLab スタイル
1. Azure DevOps スタイル
1. GitHub スタイル
1. 独自埋め込みスタイル

### 5.1. 参考にしたサイト

https://qiita.com/satokaz/items/64582da4640898c4bf42
