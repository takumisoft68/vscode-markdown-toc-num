// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as toc from './markdown-toc';
import * as sec from './markdown-section-number';
import * as ext_helper from './extension-helper';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	/**
	 * extension utility : register command
	 */
	function registerCommandNice(commandId: string, run: (...args: any[]) => void): void {
		let command = vscode.commands.registerCommand(commandId, run);
		context.subscriptions.push(command);
	}

	registerCommandNice('markdown-toc.insertToc', () => {
		const doc = (vscode.window.activeTextEditor as vscode.TextEditor).document;
		const current = ext_helper.getCurrentConfig(doc);
		console.info(current);

		toc.insertToc(current.tocDepthFrom, current.tocDepthTo);
	});
	registerCommandNice('markdown-toc.deleteToc', () => {
		const doc = (vscode.window.activeTextEditor as vscode.TextEditor).document;
		const current = ext_helper.getCurrentConfig(doc);
		console.info(current);

		toc.deleteToc(current.tocDepthFrom, current.tocDepthTo);
	});

	registerCommandNice('markdown-toc.insertChapterNumber', () => {
		const doc = (vscode.window.activeTextEditor as vscode.TextEditor).document;
		const current = ext_helper.getCurrentConfig(doc);
		console.info(current);

		sec.insertChapterNumber(current.chapterDepthFrom, current.chapterDepthTo);
	});
	registerCommandNice('markdown-toc.deleteChapterNumber', () => {
		const doc = (vscode.window.activeTextEditor as vscode.TextEditor).document;
		const current = ext_helper.getCurrentConfig(doc);
		console.info(current);

		sec.deleteChapterNumber(current.chapterDepthFrom, current.chapterDepthTo);
	});
}

// this method is called when your extension is deactivated
export function deactivate() { }
