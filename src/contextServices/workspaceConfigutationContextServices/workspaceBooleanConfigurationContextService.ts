import { ConfigurationChangeEvent, commands, ExtensionContext, workspace} from 'vscode';
import { IWorkspaceConfigutationContextService } from './iWorkspaceConfigutationContextService';

export class WorkspaceBooleanConfigurationContextService implements IWorkspaceConfigutationContextService {
    private readonly contextName: string;
    private readonly configSectionDir: string;
    private readonly configSectionName: string;

    constructor(contextName: string, configSectionDir: string, configSectionName: string) {
        this.contextName = contextName;
        this.configSectionDir = configSectionDir;
        this.configSectionName = configSectionName;
    }

    /**
     * activate context service
     * @param context ExtensionContext
     */
    public onActivate(_context: ExtensionContext) {
        // set initial state of context
        let showMenuInsertToc = <boolean>workspace.getConfiguration(this.configSectionDir).get(this.configSectionName);
        this.setState(showMenuInsertToc);
    }

    public dispose(): void { }

    /**
     * default handler of onDidChangeConfiguration, do nothing.
     * override this method to handle that event to update context state.
     */
    public onDidChangeConfiguration(event: ConfigurationChangeEvent): void {
        if (event.affectsConfiguration(this.configSectionDir + "." + this.configSectionName)) {
            this.updateContextState();
        }
        return;
    }

    private updateContextState() {
        let showMenuInsertToc = <boolean>workspace.getConfiguration(this.configSectionDir).get(this.configSectionName);
        // console.debug("set " + this.contextName + " to " + showMenuInsertToc);
        this.setState(showMenuInsertToc);
    }

    /**
     * set state of context
     */
    protected setState(state: any) {
        commands.executeCommand('setContext', this.contextName, state);
    }
}
