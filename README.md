# Markdown TOC & Chapter Number

Add commands for table of contents (TOC) and chapter numbering to markdown.

## Features

- Add command to generate a table of contents (TOC)
- Add command to add chapter numbers
- Control each depth independently
- Insert anchor in TOC

## Demo

![demo](images/insert.gif)

### Configuration

| Configuration ID                  | Description                                 | Type   | Default |
| --------------------------------- | ------------------------------------------- | ------ | ------- |
| markdown-toc-num.tocDepthFrom     | TOC depth control, from [1-6]               | number | 2       |
| markdown-toc-num.tocDepthTo       | TOC depth control, to [1-6]                 | number | 3       |
| markdown-toc-num.chapterDepthFrom | Chapter numbering depth control, from [1-6] | number | 1       |
| markdown-toc-num.chapterDepthTo   | Chapter numbering depth control, to [1-6]   | number | 6       |
| markdown-toc-num.anchorMode       | Anchor style [vscode, gitlab, none]         | string | vscode  |

You can override them inline.

```md
<!-- TOC tocDepth:2..3 chapterDepth:1..6 anchorMode:embed -->

<!-- TOC tocDepthFrom:2 tocDepthTo:3 chapterDepthFrom:1 chapterDepthTo:6 anchorMode:embed -->

<!-- TOC tocDepthFrom:1 tocDepthTo:6 anchorMode:github -->
```

### Omit chapter in TOC

In case you are seeing unexpected TOC recognition, you can add a <!-- omit in toc --> comment above the list.

## Anchor Styles

### VSCode & GitLab style

- 

### GitHub & Azure DevOps style

- With this sytle, the anchor links in TOC do NOT work in VSCode markdown preview.

### Embed style

- 

## Release Notes

- See [changelog](CHANGELOG.md).

## Links

- [Source Code](https://github.com/takumisoft68/vscode-markdown-toc-num)
- [Marketplace](https://marketplace.visualstudio.com/items?itemName=TakumiI.markdown-toc-num)

## License

Apache 2.0, See [LICENSE](LICENSE) for more information.
