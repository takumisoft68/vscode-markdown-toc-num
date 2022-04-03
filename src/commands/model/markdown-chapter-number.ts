import * as chapterParser from './markdown-chapter-helpers/chapter-parser';


export function insertChapterNumber(srcText: string, chapterDepthFrom: number, chapterDepthTo: number): string {
    console.debug('markdown-toc.insertChapterNumber');

    // チャプターをパースする
    const chapters = chapterParser.parseChapter(srcText);

    // 置換用のテキストを作成
    let lines = srcText.split(/\n/);

    //エディタのテキストを置換
    let levelCounts = [0, 0, 0, 0, 0, 0, 0];
    chapters.forEach(chapter => {
        if (chapter.level === 1) {
            if(chapterDepthFrom > 1 || chapterDepthTo < 1) {
                return;
            }
            levelCounts[1]++;
            levelCounts[2] = 0;
            levelCounts[3] = 0;
            levelCounts[4] = 0;
            levelCounts[5] = 0;
            levelCounts[6] = 0;
        }
        if (chapter.level === 2) {
            if(chapterDepthFrom > 2 || chapterDepthTo < 2) {
                return;
            }
            levelCounts[2]++;
            levelCounts[3] = 0;
            levelCounts[4] = 0;
            levelCounts[5] = 0;
            levelCounts[6] = 0;
        }
        if (chapter.level === 3) {
            if(chapterDepthFrom > 3 || chapterDepthTo < 3) {
                return;
            }
            levelCounts[3]++;
            levelCounts[4] = 0;
            levelCounts[5] = 0;
            levelCounts[6] = 0;
        }
        if (chapter.level === 4) {
            if(chapterDepthFrom > 4 || chapterDepthTo < 4) {
                return;
            }
            levelCounts[4]++;
            levelCounts[5] = 0;
            levelCounts[6] = 0;
        }
        if (chapter.level === 5) {
            if(chapterDepthFrom > 5 || chapterDepthTo < 5) {
                return;
            }
            levelCounts[5]++;
            levelCounts[6] = 0;
        }
        if (chapter.level === 6) {
            if(chapterDepthFrom > 6 || chapterDepthTo < 6) {
                return;
            }
            levelCounts[6]++;
        }
        
        const chapterNumText = levelCounts.join('.') + '.';
        const chapterNumTextTrimmed = chapterNumText.replace(/0+\./g, ''); 
        const line = chapter.line;
        lines[line] = '#'.repeat(chapter.level) + ' ' + chapterNumTextTrimmed + ' ' + chapter.text;
    });

    return lines.join('\n');
}

export function removeChapterNumber(srcText: string): string {
    console.debug('markdown-toc.removeChapterNumber');

    // チャプターをパースする
    const chapters = chapterParser.parseChapter(srcText);

    // 置換用のテキストを作成
    let lines = srcText.split(/\n/);

    //エディタのテキストを置換
    chapters.forEach(chapter => {
        const label = chapter.text.replace(/^(\d+\.)+/, '').trimLeft();
        const line = chapter.line;
        lines[line] = '#'.repeat(chapter.level) + ' ' + label;
    });

    return lines.join('\n');
}
