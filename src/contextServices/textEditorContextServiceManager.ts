import { ExtensionContext, window, Disposable } from 'vscode';
import { ITextEditorContextService } from "./textEditorContextServices/iTextEditorContextService";

export class TextEditorContextServiceManager implements Disposable {
    private readonly contextServices: Array<ITextEditorContextService> = [];

    public constructor() {
        // push context services
    }

    public activate(context: ExtensionContext) {
        for (const service of this.contextServices) {
            service.onActivate(context);
        }
        // subscribe update handler for context
        context.subscriptions.push(
            window.onDidChangeActiveTextEditor(() => this.onDidChangeActiveTextEditor()),
            window.onDidChangeTextEditorSelection(() => this.onDidChangeTextEditorSelection())
        );
    }

    public dispose(): void {
        while (this.contextServices.length > 0) {
            const service = this.contextServices.pop();
            service!.dispose();
        }
    }

    private onDidChangeActiveTextEditor() {
        const editor = window.activeTextEditor;
        if (editor === undefined) {
            return;
        }

        const cursorPos = editor.selection.start;
        const document = editor.document;

        for (const service of this.contextServices) {
            service.onDidChangeActiveTextEditor(document, cursorPos);
        }
    }

    private onDidChangeTextEditorSelection() {
        const editor = window.activeTextEditor;
        if (editor === undefined) {
            return;
        }

        const cursorPos = editor.selection.start;
        const document = editor.document;

        for (const service of this.contextServices) {
            service.onDidChangeTextEditorSelection(document, cursorPos);
        }
    }
}

// export const contextServiceManager = new TextEditorContextServiceManager();
