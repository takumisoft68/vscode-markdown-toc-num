import * as chapterParser from './markdown-chapter-helpers/chapter-parser';
import {ChapterLevelCounter} from './markdown-chapter-helpers/chapter-level-counter';

export function insertChapterNumber(srcText: string, chapterDepthFrom: number, chapterDepthTo: number): string {
    console.debug('markdown-toc-num.insertChapterNumber');

    // チャプターをパースする
    const chapters = chapterParser.parseChapter(srcText);

    // 置換用のテキストを作成
    let lines = srcText.split(/\n/);

    const levelCounter = new ChapterLevelCounter();

    //エディタのテキストを置換
    chapters.forEach(chapter => {
        if (chapter.level < chapterDepthFrom) {
            // 範囲指定外
            //levelCounter.resetCounter();
            return;
        }
        if (chapter.level > chapterDepthTo) {
            // 範囲指定外
            return;
        }

        // chapterDepthFrom設定の分のオフセットを換算する
        let levelOffseted = chapter.level - chapterDepthFrom + 1;

        levelCounter.pushNextChapter(levelOffseted);
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
