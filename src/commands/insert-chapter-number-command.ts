import * as vscode from 'vscode';
import * as config from './model/configuration';
import * as chapterNumber from './model/markdown-chapter-number';


export function insertChapterNumberCommand(): void {
    console.debug('insertChapterNumberCommand');

    const editor = vscode.window.activeTextEditor as vscode.TextEditor;
    const doc = editor.document;

    const srcText = doc.getText();

    const current = config.getCurrentConfig(srcText);
    console.debug(current);

    const removedText = chapterNumber.removeChapterNumber(srcText);
    const insertedText = chapterNumber.insertChapterNumber(removedText, current.chapterDepthFrom, current.chapterDepthTo);

    const startPosition = new vscode.Position(0, 0);
    const endPosition = new vscode.Position(doc.lineCount-1, doc.lineAt(doc.lineCount-1).text.length);
    const selection = new vscode.Selection(startPosition, endPosition);
    editor.edit(edit => {
        edit.replace(selection, insertedText);
    });
}