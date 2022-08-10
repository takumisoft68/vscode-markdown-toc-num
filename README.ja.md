# 1. Markdown TOC & Chapter Number

マークダウンに目次作成コマンドと章番号作成コマンドを追加する。

## 1.1. 主な機能

- 目次（TOC）を作成するコマンドを追加する
- 見出しに番号を付けるコマンドを追加する
- 目次と見出しの対象階層は独立して設定できる
- 目次にはアンカーリンクを付与することができる

## 1.2. デモ

![demo](images/insert.gif)

### 1.2.1. 設定値

| Configuration ID                  | Description                           | Type   | Default |
| --------------------------------- | ------------------------------------- | ------ | ------- |
| markdown-toc-num.tocDepthFrom     | 目次の階層, 開始 [1-6]                | number | 2       |
| markdown-toc-num.tocDepthTo       | 目次の階層, 終了 [1-6]                | number | 3       |
| markdown-toc-num.chapterDepthFrom | 見出しの階層, 開始 [1-6]              | number | 1       |
| markdown-toc-num.chapterDepthTo   | 見出しの階層, 終了 [1-6]              | number | 6       |
| markdown-toc-num.anchorMode       | アンカーの様式 [vscode, gitlab, none] | string | vscode  |

各設定値はマークダウンファイル内でインラインでも指定できる。

```md
<!-- TOC tocDepth:2..3 chapterDepth:1..6 anchorMode:embed -->

<!-- TOC tocDepthFrom:2 tocDepthTo:3 chapterDepthFrom:1 chapterDepthTo:6 anchorMode:embed -->

<!-- TOC tocDepthFrom:1 tocDepthTo:6 anchorMode:github -->
```

## 1.3. 補足機能

### 1.3.1. 目次から除外する

対象の見出しの上に<!-- omit in toc -->と入力することで、その見出しは目次内容から除外される。

### 1.3.2. 目次に含める見出しの階層を指定する

設定の markdown-toc-num.tocDepthFrom, markdown-toc-num.tocDepthTo で指定した範囲の階層のみ目次に含める。

デフォルトは 2 - 3。

以下のように本文中で指定することもできる。

#### 1.3.2.1. 方法1

```md
<!-- TOC tocDepthFrom:1 tocDepthTo:6 -->
```

#### 1.3.2.2. 方法2

```md
<!-- TOC tocDepth:1..6 -->
```

### 1.3.3. 見出しに番号を付ける階層を指定する

設定の markdown-toc-num.chapterDepthFrom, markdown-toc-num.chapterDepthTo で指定した範囲の階層のみ番号を付けるようにできる。

デフォルトは 2 - 6。

以下のように本文中で指定することもできる。

#### 1.3.3.1. 方法1

```md
<!-- TOC chapterDepthFrom:2 chapterDepthTo:6 -->
```

#### 1.3.3.2. 方法2

```md
<!-- TOC chapterDepth:2..6 -->
```

## 1.4. 注力

特に日本語にフォーカスしたマークダウン目次作成エクステンション

## 1.5. アンカー作成スキーム

1. !@#$%^&*()_+={}][|\"':;?/>.<,`~ の文字は削除
1. アルファベットは小文字に変換
1. スペースは - に変換
1. 日本語などアルファベット以外の文字はそのまま

### 1.5.1. 参考にしたサイト

https://qiita.com/satokaz/items/64582da4640898c4bf42
