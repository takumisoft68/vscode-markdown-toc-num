import { ExtensionContext, Disposable, workspace } from 'vscode';
import { IWorkspaceConfigutationContextService } from './workspaceConfigutationContextServices/iWorkspaceConfigutationContextService';
import { WorkspaceBooleanConfigurationContextService } from "./workspaceConfigutationContextServices/workspaceBooleanConfigurationContextService";

export class WorkspaceConfigutationContextManager implements Disposable {
    private readonly contextServices: Array<IWorkspaceConfigutationContextService> = [];

    public constructor() {
        // push context services
        this.contextServices.push(new WorkspaceBooleanConfigurationContextService("markdown-toc-num.context.showMenuInsertToc", 'markdown-toc-num', 'showMenuInsertToc'));
        this.contextServices.push(new WorkspaceBooleanConfigurationContextService("markdown-toc-num.context.showMenuRemoveToc", 'markdown-toc-num', 'showMenuRemoveToc'));
        this.contextServices.push(new WorkspaceBooleanConfigurationContextService("markdown-toc-num.context.showMenuInsertChapterNumber", 'markdown-toc-num', 'showMenuInsertChapterNumber'));
        this.contextServices.push(new WorkspaceBooleanConfigurationContextService("markdown-toc-num.context.showMenuRemoveChapterNumber", 'markdown-toc-num', 'showMenuRemoveChapterNumber'));
    }

    public activate(context: ExtensionContext) {
        for (const service of this.contextServices) {
            service.onActivate(context);
        }
        // subscribe update handler for context
        context.subscriptions.push(
            workspace.onDidChangeConfiguration((e) => {
                for (const service of this.contextServices) {
                    service.onDidChangeConfiguration(e);
                }
            })
        );
    }

    public dispose(): void {
        while (this.contextServices.length > 0) {
            const service = this.contextServices.pop();
            service!.dispose();
        }
    }
}

// export const contextServiceManager = new TextEditorContextServiceManager();
