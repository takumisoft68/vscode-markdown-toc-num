import * as vscode from 'vscode';
import * as config from './model/configuration';
import * as toc from './model/markdown-toc';
import * as tocFinder from './model/markdown-toc-helpers/toc-position-finder';


export function insertTocCommand(): void {
    console.debug('insertTocCommand');
    const editor = vscode.window.activeTextEditor as vscode.TextEditor;
    const doc = editor.document;

    // 元のテキストを取得する
    const srcText = doc.getText();
    // 設定値を取得する
    const current = config.getCurrentConfig(srcText);
    console.debug(current);

    // カーソル位置を取得
    const [cursorLine, cursorPos] = [editor.selection.anchor.line, editor.selection.anchor.character];

    // インデントのスペース数を取得
    const indentSize = editor.options.tabSize as number;

    // TOCのマークアップ位置を取得する
    const [tocMarkLineStart, tocMarkLineEnd, ] = tocFinder.getTocPosition(srcText);

    // TOCのマークアップが存在しない場合はカーソル位置をTOC位置とする
    const tocStartLine = tocMarkLineStart !== -1 ? tocMarkLineStart : cursorLine;
    const tocEndLine = tocMarkLineEnd !== -1 ? tocMarkLineEnd : cursorLine;
    const tocStartLineText = tocMarkLineStart !== -1 ? doc.lineAt(tocMarkLineStart).text : '<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->';
    const tocEndLineText = tocMarkLineEnd !== -1 ? doc.lineAt(tocMarkLineEnd).text : '<!-- /TOC -->';

    // TOCを挿入したテキストを生成する
    const tocText =
     tocStartLineText + '\n\n'
     + toc.makeTocText(srcText, current.tocDepthFrom, current.tocDepthTo, indentSize, current.anchorMode) + '\n\n'
     + tocEndLineText;

    //エディタ選択範囲にテキストを反映
    const tocStartPosition = new vscode.Position(tocStartLine, 0);
    const tocEndPosition = new vscode.Position(tocEndLine, doc.lineAt(tocEndLine).text.length);
    const tocSelection = new vscode.Selection(tocStartPosition, tocEndPosition);
    editor.edit(edit => {
        edit.replace(tocSelection, tocText);
    });
}

