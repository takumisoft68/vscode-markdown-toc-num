import * as chapterParser from './markdown-chapter-helpers/chapter-parser';

export const enum AnchorMode {
    gitlab,
    vscode,
    none
};

export function makeTocText(srcText: string, depthFrom: number, depthTo: number, indentSize: number, anchorMode: AnchorMode): string {
    console.debug('markdown-toc-num.makeTocText');

    // チャプターをパースする
    const chapters = chapterParser.parseChapter(srcText);
    
    let lines: string[] = [];
    chapters.forEach(chapter => {
        const level = chapter.level;
        if (level < depthFrom || level > depthTo) {
            return;
        }
        const indent = level - depthFrom;
        let line = '';
        line += ' '.repeat(indentSize).repeat(indent);
        if (anchorMode === AnchorMode.gitlab) {
            line += `- [${chapter.text}]`;
            const anchor = makeAnchorGitLab(chapter.text);
            line += `(${anchor})`;
        }
        else if (anchorMode === AnchorMode.vscode) {
            line += `- [${chapter.text}]`;
            const anchor = makeAnchorVSCode(chapter.text);
            line += `(${anchor})`;
        }
        else {
            line += `- ${chapter.text}`;
        }
        lines.push(line);
    });
    const tocText = lines.join('\n');
    
    return tocText;
}

function makeAnchorGitLab(text: string): string {
    // アンカー作成スキーム
    // 1. アルファベットは小文字に変換
    // 1. !@#$%^&*()_+={}][|\"':;?/>.<,`~ の文字は削除
    // 1. スペースの連続はスペース1つに変換
    // 1. スペースは - に変換
    // 1. 日本語などアルファベット以外の文字はそのまま
    let anchor = '#' + text;

    anchor = anchor.toLowerCase();
    anchor = anchor.split('　').join(' ');

    const removeList = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "=", "{", "}", "]", "[", "|", "\\", "\"", "'", ":", ";", "?", "/", ">", ".", "<", ",", "`", "~"];
    removeList.forEach(v => {
        anchor = anchor.split(v).join('');
    });

    while(~anchor.indexOf('  ')) {
        anchor = anchor.split('  ').join(' ');
    }
    anchor = anchor.split(' ').join('-');

    return '#' + anchor;
}

function makeAnchorVSCode(text: string): string {
    // アンカー作成スキーム
    // 1. アルファベットは小文字に変換
    // 1. !@#$%^&*()_+={}][|\"':;?/>.<,`~ の文字は削除
    // 1. スペースの連続はスペース1つに変換
    // 1. スペースは - に変換
    // 1. 日本語などアルファベット以外の文字はそのまま
    let anchor = '#' + text;

    anchor = anchor.toLowerCase();
    anchor = anchor.split('　').join(' ');

    const removeList = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "=", "{", "}", "]", "[", "|", "\\", "\"", "'", ":", ";", "?", "/", ">", ".", "<", ",", "`", "~"];
    removeList.forEach(v => {
        anchor = anchor.split(v).join('');
    });

    while(~anchor.indexOf('  ')) {
        anchor = anchor.split('  ').join(' ');
    }
    anchor = anchor.split(' ').join('-');

    return '#' + anchor;
}
