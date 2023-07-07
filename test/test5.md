# Markdown TOC & Chapter Number

Add commands for table of contents (TOC) and chapter numbering to markdown.

<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [1. Features](#1-features)
- [2. Demo](#2-demo)
    - [2.1. Configuration](#21-configuration)
- [3. Supplementary functions](#3-supplementary-functions)
    - [3.1. Omit chapter in TOC](#31-omit-chapter-in-toc)
- [4. Anchor Styles](#4-anchor-styles)
    - [4.1. VSCode & GitLab style](#41-vscode-gitlab-style)
    - [4.2. GitHub style](#42-github-style)
    - [4.3. Azure DevOps style](#43-azure-devops-style)
    - [4.4. Embed style](#44-embed-style)
- [5. Release Notes](#5-release-notes)
- [6. Links](#6-links)
- [7. License](#7-license)

<!-- /TOC -->

## 1. Features

- Add command to generate a table of contents (TOC)
- Add command to add chapter numbers
- Control each depth independently
- Insert anchor in TOC

## 2. Demo

![demo](images/insert.gif)

### 2.1. Configuration

| Configuration ID                  | Description                                                                                            | Type   | Default |
| --------------------------------- | ------------------------------------------------------------------------------------------------------ | ------ | ------- |
| markdown-toc-num.tocDepthFrom     | TOC depth control, from [1-6]                                                                          | number | 2       |
| markdown-toc-num.tocDepthTo       | TOC depth control, to [1-6]                                                                            | number | 3       |
| markdown-toc-num.chapterDepthFrom | Chapter numbering depth control, from [1-6]                                                            | number | 2       |
| markdown-toc-num.chapterDepthTo   | Chapter numbering depth control, to [1-6]                                                              | number | 6       |
| markdown-toc-num.anchorMode       | Anchor style [`vscode,gitlab`, `vscode`, `gitlab`, `github`, `azure`, `embed`, `none`] | string | vscode  |

You can override them inline.

```md
<!-- TOC tocDepth:2..3 chapterDepth:2..6 anchorMode:embed -->

<!-- TOC tocDepthFrom:2 tocDepthTo:3 chapterDepthFrom:1 chapterDepthTo:6 anchorMode:embed -->

<!-- TOC tocDepthFrom:1 tocDepthTo:6 anchorMode:github -->
```

## 3. Supplementary functions

### 3.1. Omit chapter in TOC

In case you are seeing unexpected TOC recognition, you can add a <!-- omit in toc --> comment above the list.

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

## 4. Anchor Styles

### 4.1. VSCode & GitLab style

With this style, anchors are started with `#`

```md
# title

<!-- TOC tocDepth:2..3 chapterDepth:2..6 anchorMode:vscode,gitlab -->

- [1. AAA](#1-aaa)
    - [1.1. AAA-1](#11-aaa-1)
    - [1.2. AAA-2](#12-aaa-2)

<!-- /TOC -->

## 1. AAA

### 1.1. AAA-1

### 1.2. AAA-2
```

### 4.2. GitHub style

With this style, anchors are started with `#user-content-`.

- With this sytle, the anchor links in TOC do NOT work in VSCode markdown preview.

```md
# title

<!-- TOC tocDepth:2..3 chapterDepth:2..6 anchorMode:github -->

- [1. AAA](#user-content-1-aaa)
    - [1.1. AAA-1](#user-content-11-aaa-1)
    - [1.2. AAA-2](#user-content-12-aaa-2)

<!-- /TOC -->

## 1. AAA

### 1.1. AAA-1

### 1.2. AAA-2
```

### 4.3. Azure DevOps style

With this style, anchors are started with `#user-content-`.

- With this sytle, the anchor links in TOC do NOT work in VSCode markdown preview.

```md
# title

<!-- TOC tocDepth:2..3 chapterDepth:2..6 anchorMode:azure -->

- [1. AAA](#user-content-1.-aaa)
    - [1.1. AAA-1](#user-content-1.1.-aaa-1)
    - [1.2. AAA-2](#user-content-1.2.-aaa-2)

<!-- /TOC -->

## 1. AAA

### 1.1. AAA-1

### 1.2. AAA-2
```

### 4.4. Embed style

With this style, html div elements are inserted automatically.

```md
# title

<!-- TOC tocDepth:2..3 chapterDepth:2..6 anchorMode:embed -->

- [1. AAA](#toc-1--aaa)
    - [1.1. AAA-1](#toc-1-1--aaa-1)
    - [1.2. AAA-2](#toc-1-2--aaa-2)

<!-- /TOC -->

## 1.1. AAA

### 1.1.1. AAA-1

### 1.1.2. AAA-2
```

## 5. Release Notes

- See [changelog](CHANGELOG.md).

## 6. Links

- [Source Code](https://github.com/takumisoft68/vscode-markdown-toc-num)
- [Marketplace](https://marketplace.visualstudio.com/items?itemName=TakumiI.markdown-toc-num)

## 7. License

Apache 2.0, See [LICENSE](LICENSE) for more information.
