// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as config from './configuration';

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

	registerCommandNice('markdown-toc.insertChapterNumber', () => {
		console.info('markdown-toc.insertChapterNumber');
		const doc = (vscode.window.activeTextEditor as vscode.TextEditor).document;

		const current = config.getConfig(doc);
		console.info(current);
	});
	registerCommandNice('markdown-toc.deleteChapterNumber', () => {
		console.log('markdown-toc.deleteChapterNumber');
		const doc = (vscode.window.activeTextEditor as vscode.TextEditor).document;

		const current = config.getConfig(doc);
		console.info(current);
	});
	registerCommandNice('markdown-toc.insertToc', () => {
		console.log('markdown-toc.insertToc');
		const doc = (vscode.window.activeTextEditor as vscode.TextEditor).document;

		const current = config.getConfig(doc);
		console.info(current);
	});
	registerCommandNice('markdown-toc.deleteToc', () => {
		console.log('markdown-toc.deleteToc');
		const doc = (vscode.window.activeTextEditor as vscode.TextEditor).document;

		const current = config.getConfig(doc);
		console.info(current);
	});
}

// this method is called when your extension is deactivated
export function deactivate() { }
