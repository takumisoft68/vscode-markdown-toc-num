import * as vscode from 'vscode';
import * as config from './configuration';

/**
 * Return position of TOC in document by [startLine, endLine] format.
 * @param doc vscode.TextDocument object
 * @returns position of TOC by [startLine, endLine] format. If toc is not exist, return [-1, -1]
 */
export function getTocPosition(doc: vscode.TextDocument): [number, number] {

    let startLine = -1;
    let endLine = -1;

    for (let lineNum = 0; lineNum < doc.lineCount; lineNum++) {
        let lineText = doc.lineAt(lineNum).text;

        if (startLine === -1 && lineText.startsWith('<!-- TOC ')) {
            startLine = lineNum;
        }
        if (endLine === -1 && lineText.startsWith('<!-- /TOC ')) {
            endLine = lineNum;
        }
    }

    endLine = (endLine > startLine) ? endLine : startLine;
    return [startLine, endLine];
}

export function getCurrentConfig(doc: vscode.TextDocument): config.Config {
    const defaultConfig = config.getDefaultConfig();
    let currentConfig = config.getConfig(defaultConfig);

    // decode config in toc anchor line
    const [tocStartLine,] = getTocPosition(doc);
    if (tocStartLine >= 0) {
        let text = doc.lineAt(tocStartLine).text;
        currentConfig = config.parseConfig(text, currentConfig);
    }

    return currentConfig;
}
