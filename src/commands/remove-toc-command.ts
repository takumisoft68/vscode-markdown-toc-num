import * as vscode from 'vscode';
import * as config from './model/configuration';
import * as tocFinder from './model/markdown-toc-helpers/toc-position-finder';
import * as toc from './model/markdown-toc';

export function removeTocCommand(): void {
    console.debug('removeTocCommand');
    const editor = vscode.window.activeTextEditor as vscode.TextEditor;
    const doc = editor.document;

    // 元のテキストを取得する
    const srcText = doc.getText();
    // 設定値を取得する
    const current = config.getCurrentConfig(srcText);
    console.debug(current);

    // TOCのマークアップ位置を取得する
    const [tocMarkLineStart, tocMarkLineEnd, ] = tocFinder.getTocPosition(srcText);
    if (tocMarkLineStart === -1 || tocMarkLineEnd === -1) {
        return;
    }

    // TOCのマークアップの内側を削除範囲に設定する
    const tocStartLine = tocMarkLineStart;
    const tocEndLine = tocMarkLineEnd;

    const tocStartLineText = tocMarkLineStart !== -1 ? doc.lineAt(tocMarkLineStart).text : '';
    const tocEndLineText = tocMarkLineEnd !== -1 ? doc.lineAt(tocMarkLineEnd).text : '';

    let newLines: string[] = [];
    const srcLines = srcText.split(/\r\n|\n|\r/);
    for(let i = 0; i < srcLines.length; i++)
    {
        if (i > tocStartLine && i < tocEndLine) {
            // tocは新しいテキストにコピーしない
            continue;
        }
        else {
            // toc以外はコピーする
            newLines.push(srcLines[i]);
            continue;
        }
    }

    const newTexts = newLines.join('\n');

    // 埋め込みアンカーも削除する
    let anchorEmbeddedText = newTexts;
    anchorEmbeddedText = toc.removeEmbeddedAnchor(anchorEmbeddedText);

    //エディタ選択範囲にテキストを反映
    const allDocSelection = new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(doc.lineCount - 1, 10000));
    editor.edit(edit => {
        edit.replace(allDocSelection, anchorEmbeddedText);
    });
}