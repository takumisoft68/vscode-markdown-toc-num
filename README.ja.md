# Markdown TOC & Chapter Number

マークダウンに目次作成コマンドと章番号作成コマンドを追加する。

## 1. 主な機能

- 目次を作成する
- 見出しに番号を付ける

右クリックメニューで `markdown-toc-num: Insert/Update table of contents` を実行する。
実行した場所に目次を作成する。

```md
<!-- TOC -->

- 1. AAA
    - 1.1. AAA-1
- 2. BBB
    - 2.2. BBB-1

<!-- /TOC -->
```

## 2. 補足機能

- 目次を作成する位置を指定する
- 目次から除外する
- 目次に含める見出しの階層を指定する
- 見出しに番号を付ける階層を指定する

### 2.1. 目次から除外する

対象の見出しの上に<!-- omit in toc -->と入力することで、その見出しは目次内容から除外される。

### 2.2. 目次に含める見出しの階層を指定する

設定の markdown-toc-num.tocDepthFrom, markdown-toc-num.tocDepthTo で指定した範囲の階層のみ目次に含める。

デフォルトは 2 - 3。

以下のように本文中で指定することもできる。

#### 2.2.1. 方法1

```md
<!-- TOC tocDepthFrom:1 tocDepthTo:6 -->
```

#### 2.2.2. 方法2

```md
<!-- TOC tocDepth:1..6 -->
```

### 2.3. 見出しに番号を付ける階層を指定する

設定の markdown-toc-num.chapterDepthFrom, markdown-toc-num.chapterDepthTo で指定した範囲の階層のみ番号を付けるようにできる。

デフォルトは 2 - 6。

以下のように本文中で指定することもできる。

#### 2.3.1. 方法1

```md
<!-- TOC chapterDepthFrom:2 chapterDepthTo:6 -->
```

#### 2.3.2. 方法2

```md
<!-- TOC chapterDepth:2..6 -->
```

## 3. 注力

特に日本語にフォーカスしたマークダウン目次作成エクステンション

## 4. アンカー作成スキーム

1. !@#$%^&*()_+={}][|\"':;?/>.<,`~ の文字は削除
1. アルファベットは小文字に変換
1. スペースは - に変換
1. 日本語などアルファベット以外の文字はそのまま

### 4.1. 参考にしたサイト

https://qiita.com/satokaz/items/64582da4640898c4bf42
