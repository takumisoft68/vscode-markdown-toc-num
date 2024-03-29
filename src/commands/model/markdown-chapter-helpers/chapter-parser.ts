/**
 *  Chapter node
 */
export type ChapterNode = {
    text: string;
    level: number;
    line: number;
    omitInToc: boolean;
    omitFromNum: boolean;
};

/**
 * 
 * @param text 
 * @returns 
 */
export function parseChapter(text: string): ChapterNode[] {
    let chapters = [] as ChapterNode[];
    const lines = text.split(/\r\n|\n|\r/);
    let linenum = -1;

    let inCodeBlock = false;

    lines.forEach(line => {
        linenum += 1;

        // コードブロック内は無視する
        if (line.trimStart().startsWith("```")) {
            inCodeBlock = !inCodeBlock;
        }
        if (inCodeBlock) {
            return;
        }

        const isOmitInToc = line.toLowerCase().includes('<!-- omit in toc -->');
        const isOmitFromNum = line.toLowerCase().includes('<!-- omit from numbering -->');

        if (line.startsWith('# ')) {
            let node: ChapterNode = {
                level: 1, text: line.replace(/^# /, '').trim(), line: linenum, omitInToc: isOmitInToc, omitFromNum: isOmitFromNum
            };
            chapters.push(node);
        }
        else if (line.startsWith('## ')) {
            let node: ChapterNode = {
                level: 2, text: line.replace(/^## /, '').trim(), line: linenum, omitInToc: isOmitInToc, omitFromNum: isOmitFromNum
            };
            chapters.push(node);
        }
        else if (line.startsWith('### ')) {
            let node: ChapterNode = {
                level: 3, text: line.replace(/^### /, '').trim(), line: linenum, omitInToc: isOmitInToc, omitFromNum: isOmitFromNum
            };
            chapters.push(node);
        }
        else if (line.startsWith('#### ')) {
            let node: ChapterNode = {
                level: 4, text: line.replace(/^#### /, '').trim(), line: linenum, omitInToc: isOmitInToc, omitFromNum: isOmitFromNum
            };
            chapters.push(node);
        }
        else if (line.startsWith('##### ')) {
            let node: ChapterNode = {
                level: 5, text: line.replace(/^##### /, '').trim(), line: linenum, omitInToc: isOmitInToc, omitFromNum: isOmitFromNum
            };
            chapters.push(node);
        }
        else if (line.startsWith('###### ')) {
            let node: ChapterNode = {
                level: 6, text: line.replace(/^###### /, '').trim(), line: linenum, omitInToc: isOmitInToc, omitFromNum: isOmitFromNum
            };
            chapters.push(node);
        }
    });

    return chapters;
}
