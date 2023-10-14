// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, ExtensionContext } from 'vscode';
import * as insertTocCommand from './commands/insert-toc-command';
import * as removeTocCommand from './commands/remove-toc-command';
import * as insertChapterNumberCommand from './commands/insert-chapter-number-command';
import * as removeChapterNumberCommand from './commands/remove-chapter-number-command';
import { TextEditorContextServiceManager } from "./contextServices/textEditorContextServiceManager";
import { WorkspaceConfigutationContextManager } from './contextServices/workspaceConfigutationContextServiceManager';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    const textEditorContextServiceManager = new TextEditorContextServiceManager();
    const workspaceConfigContextServiceManager = new WorkspaceConfigutationContextManager();
    // disposeリストにサービスを登録
    context.subscriptions.push(
        textEditorContextServiceManager,
        workspaceConfigContextServiceManager
    );

    // サービスを開始
    textEditorContextServiceManager.activate(context);
    workspaceConfigContextServiceManager.activate(context);

    // コマンドを登録（ついでに disposeeリストにコマンドを登録）
    context.subscriptions.push(
        commands.registerCommand('markdown-toc-num.insertToc', insertTocCommand.insertTocCommand),
        commands.registerCommand('markdown-toc-num.removeToc', removeTocCommand.removeTocCommand),
        commands.registerCommand('markdown-toc-num.insertChapterNumber', insertChapterNumberCommand.insertChapterNumberCommand),
        commands.registerCommand('markdown-toc-num.removeChapterNumber', removeChapterNumberCommand.removeChapterNumberCommand)
    );
}

// this method is called when your extension is deactivated
export function deactivate() { }
