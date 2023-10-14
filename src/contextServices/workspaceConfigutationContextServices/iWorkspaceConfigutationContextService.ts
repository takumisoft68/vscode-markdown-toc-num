import { Disposable, ExtensionContext, ConfigurationChangeEvent } from 'vscode';

export interface IWorkspaceConfigutationContextService extends Disposable {
    onActivate(context: ExtensionContext): void;

    /**
     * An event that is emitted when the {@link WorkspaceConfiguration configuration} changed.
     */
    onDidChangeConfiguration(event: ConfigurationChangeEvent): void;
}