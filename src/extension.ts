// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as insertTocCommand from './commands/insert-toc-command';
import * as removeTocCommand from './commands/remove-toc-command';
import * as insertChapterNumberCommand from './commands/insert-chapter-number-command';
import * as removeChapterNumberCommand from './commands/remove-chapter-number-command';

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

	registerCommandNice('markdown-toc.insertToc', insertTocCommand.insertTocCommand);
	registerCommandNice('markdown-toc.removeToc', removeTocCommand.removeTocCommand);
	registerCommandNice('markdown-toc.insertChapterNumber', insertChapterNumberCommand.insertChapterNumberCommand);
	registerCommandNice('markdown-toc.removeChapterNumber', removeChapterNumberCommand.removeChapterNumberCommand);
}

// this method is called when your extension is deactivated
export function deactivate() { }
