# Markdown TOC & Chapter Number

マークダウンに目次作成コマンドと章番号作成コマンドを追加する。

## 1. 主な機能

- 目次（TOC）を作成するコマンドを追加する
- 見出しに番号を付けるコマンドを追加する
- 目次と見出しの対象階層は独立して設定できる
- 目次にはアンカーリンクを付与することができる

## 2. デモ

![demo](images/insert.gif)

この GIFアニメは過去バージョンのものです。
現在のバージョンとはメニュー名が異なります。

## 3. コマンドと設定値

### 3.1. コマンド

| Title                                          | Command                              | Keybinding | In the Editor Right Click Menu |
| :--------------------------------------------- | :----------------------------------- | :--------- | :----------------------------- |
| TOC: Insert/Update (markdown-toc-num)          | markdown-toc-num.insertToc           |            | Yes (設定で非表示にできます)   |
| TOC: Remove (markdown-toc-num)                 | markdown-toc-num.removeToc           |            | Yes (設定で非表示にできます)   |
| Chapter num.: Insert/Update (markdown-toc-num) | markdown-toc-num.insertChapterNumber |            | Yes (設定で非表示にできます)   |
| Chapter num.: Remove (markdown-toc-num)        | markdown-toc-num.removeChapterNumber |            | Yes (設定で非表示にできます)   |

### 3.2. 設定値

| Configuration ID                             | Description                                                                              | Type    | Default |
| -------------------------------------------- | ---------------------------------------------------------------------------------------- | ------- | ------- |
| markdown-toc-num.tocDepthFrom                | 目次の階層, 開始 [1-6]                                                                   | number  | 2       |
| markdown-toc-num.tocDepthTo                  | 目次の階層, 終了 [1-6]                                                                   | number  | 3       |
| markdown-toc-num.chapterDepthFrom            | 見出しの階層, 開始 [1-6]                                                                 | number  | 2       |
| markdown-toc-num.chapterDepthTo              | 見出しの階層, 終了 [1-6]                                                                 | number  | 6       |
| markdown-toc-num.anchorMode                  | アンカーの様式 [`vscode,gitlab`, `vscode`, `gitlab`, `github`, `azure`, `embed`, `none`] | string  | vscode  |
| markdown-toc-num.showMenuInsertToc           | メニューからコマンドを非表示にする, TOC: Insert/Update                                   | boolean | true    |
| markdown-toc-num.showMenuRemoveToc           | メニューからコマンドを非表示にする, TOC: Remove                                          | boolean | true    |
| markdown-toc-num.showMenuInsertChapterNumber | メニューからコマンドを非表示にする, Chapter num.: Insert/Update                          | boolean | true    |
| markdown-toc-num.showMenuRemoveChapterNumber | メニューからコマンドを非表示にする, Chapter num.: Remove                                 | boolean | true    |

## 4. 補足機能

### 4.1. 目次から除外する

対象の見出しの行に<!-- omit in toc -->と入力することで、その見出しは目次内容から除外される。

### 4.2. 章番号の連番から除外する

対象の見出しの行に<!-- omit from numbering -->と入力することで、その見出しは章番号の連番から除外される。

### 4.3. 目次に含める見出しの階層を指定する

設定の markdown-toc-num.tocDepthFrom, markdown-toc-num.tocDepthTo で指定した範囲の階層のみ目次に含める。

デフォルトは 2 - 3。

以下のように本文中で指定することもできる。

#### 4.3.1. 方法1

```md
<!-- TOC tocDepthFrom:1 tocDepthTo:6 -->
```

#### 4.3.2. 方法2

```md
<!-- TOC tocDepth:1..6 -->
```

### 4.4. 見出しに番号を付ける階層を指定する

設定の markdown-toc-num.chapterDepthFrom, markdown-toc-num.chapterDepthTo で指定した範囲の階層のみ番号を付けるようにできる。

デフォルトは 2 - 6。

以下のように本文中で指定することもできる。

#### 4.4.1. 方法1

```md
<!-- TOC chapterDepthFrom:2 chapterDepthTo:6 -->
```

#### 4.4.2. 方法2

```md
<!-- TOC chapterDepth:2..6 -->
```

## 5. アンカー作成スキーム

5種類が使えます。変更するにはanchorModeを指定します。

1. VSCode プレビュー画面 & GitLab スタイル
1. Azure DevOps スタイル
1. GitHub スタイル
1. 独自埋め込みスタイル
1. アンカーなし

それぞれの詳細は readme を見てください。

### 5.1. 参考にしたサイト

https://qiita.com/satokaz/items/64582da4640898c4bf42
