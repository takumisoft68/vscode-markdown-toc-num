/**
 *  Chapter node
 */
export type ChapterNode = {
    text: string;
    level: number;
    line: number;
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

    lines.forEach(line => {
        linenum += 1;
        if (line.trimEnd().endsWith('<!-- omit in toc -->')) {
            return;
        }
        if (line.startsWith('# ')) {
            let node: ChapterNode = {
                level: 1, text: line.replace(/^# /, '').trim(), line: linenum
            };
            chapters.push(node);
        }
        else if (line.startsWith('## ')) {
            let node: ChapterNode = {
                level: 2, text: line.replace(/^## /, '').trim(), line: linenum
            };
            chapters.push(node);
        }
        else if (line.startsWith('### ')) {
            let node: ChapterNode = {
                level: 3, text: line.replace(/^### /, '').trim(), line: linenum
            };
            chapters.push(node);
        }
        else if (line.startsWith('#### ')) {
            let node: ChapterNode = {
                level: 4, text: line.replace(/^#### /, '').trim(), line: linenum
            };
            chapters.push(node);
        }
        else if (line.startsWith('##### ')) {
            let node: ChapterNode = {
                level: 5, text: line.replace(/^##### /, '').trim(), line: linenum
            };
            chapters.push(node);
        }
        else if (line.startsWith('###### ')) {
            let node: ChapterNode = {
                level: 6, text: line.replace(/^###### /, '').trim(), line: linenum
            };
            chapters.push(node);
        }
    });

    return chapters;
}
