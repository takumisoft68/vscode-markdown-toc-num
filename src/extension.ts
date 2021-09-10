// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	function registerCommandNice(commandId: string, run: (...args: any[]) => void): void {
        let command = vscode.commands.registerCommand(commandId, run);
        context.subscriptions.push(command);
    }

	registerCommandNice('markdown-toc.insertChapterNumber', () => {
		console.log('markdown-toc.insertChapterNumber');
    });
	registerCommandNice('markdown-toc.deleteChapterNumber', () => {
		console.log('markdown-toc.deleteChapterNumber');
    });
	registerCommandNice('markdown-toc.insertToc', () => {
		console.log('markdown-toc.insertToc');
    });
	registerCommandNice('markdown-toc.deleteToc', () => {
		console.log('markdown-toc.deleteToc');
    });
}

// this method is called when your extension is deactivated
export function deactivate() {}
