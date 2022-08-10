import * as chapterParser from './markdown-chapter-helpers/chapter-parser';
import {ChapterLevelCounter} from './markdown-chapter-helpers/chapter-level-counter';

export function insertChapterNumber(srcText: string, chapterDepthFrom: number, chapterDepthTo: number): string {
    console.debug('markdown-toc-num.insertChapterNumber');

    // チャプターをパースする
    const chapters = chapterParser.parseChapter(srcText);

    // 置換用のテキストを作成
    let lines = srcText.split(/\n/);

    const levelCounter = new ChapterLevelCounter(chapterDepthFrom, chapterDepthTo);

    //エディタのテキストを置換
    chapters.forEach(chapter => {
        levelCounter.pushNextChapter(chapter.level);
        const chapterNumText = levelCounter.getLevelTextTrimmed();
        const line = chapter.line;
        if(chapterNumText === "") {
            lines[line] = '#'.repeat(chapter.level) + ' ' + chapter.text;
        }
        else {
            lines[line] = '#'.repeat(chapter.level) + ' ' + chapterNumText + ' ' + chapter.text;
        }
    });

    return lines.join('\n');
}

export function removeChapterNumber(srcText: string): string {
    console.debug('markdown-toc-num.removeChapterNumber');

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
