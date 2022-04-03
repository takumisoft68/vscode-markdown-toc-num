/**
 * Return position of TOC in document by [startLine, endLine] format.
 * @param doc vscode.TextDocument object
 * @returns position of TOC by [startLine, endLine] format. If toc is not exist, return [-1, -1]
 */
export function getTocPosition(text: string): [number, number, string] {
    let startLine = -1;
    let endLine = -1;
    let headText = "";

    const lines = text.split(/\r\n|\n|\r/);

    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
        let lineText = lines[lineNum];

        if (startLine === -1 && lineText.startsWith('<!-- TOC ')) {
            startLine = lineNum;
            headText = lineText;
        }
        if (endLine === -1 && lineText.startsWith('<!-- /TOC ')) {
            endLine = lineNum;
        }
    }

    endLine = (endLine > startLine) ? endLine : startLine;
    return [startLine, endLine, headText];
}
