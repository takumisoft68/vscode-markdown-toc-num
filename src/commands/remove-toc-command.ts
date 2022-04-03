import * as vscode from 'vscode';
import * as config from './model/configuration';
import * as tocFinder from './model/markdown-toc-helpers/toc-position-finder';

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

    const tocText = '\n';

    //エディタ選択範囲にテキストを反映
    const tocStartPosition = new vscode.Position(tocStartLine, doc.lineAt(tocStartLine).text.length);
    const tocEndPosition = new vscode.Position(tocEndLine, 0);
    const tocSelection = new vscode.Selection(tocStartPosition, tocEndPosition);
    editor.edit(edit => {
        edit.replace(tocSelection, tocText);
    });
}