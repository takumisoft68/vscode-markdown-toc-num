import * as chapterParser from './markdown-chapter-helpers/chapter-parser';
import {ChapterLevelCounter} from './markdown-chapter-helpers/chapter-level-counter';


export const enum AnchorMode {
    vscode_gitlab,
    github_azure,
    embed,
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
        if (anchorMode === AnchorMode.vscode_gitlab) {
            line += `- [${chapter.text}]`;
            const anchor = makeAnchorVscodeGitLab(chapter.text);
            line += `(${anchor})`;
        }
        else if (anchorMode === AnchorMode.github_azure) {
            line += `- [${chapter.text}]`;
            const anchor = makeAnchorGithubAzure(chapter.text);
            line += `(${anchor})`;
        }
        else if (anchorMode === AnchorMode.embed) {
            line += `- [${chapter.text}]`;
            const anchor = makeAnchorEmbed(chapter.text);
            line += `(#${anchor})`;
        }
        else {
            line += `- ${chapter.text}`;
        }
        lines.push(line);
    });
    const tocText = lines.join('\n');
    
    return tocText;
}

function makeAnchorVscodeGitLab(text: string): string {
    // アンカー作成スキーム
    // 1. アルファベットは小文字に変換
    // 2. !@#$%^&*()_+={}][|\"':;?/>.<,`~ の文字は削除
    // 3. スペースの連続はスペース1つに変換
    // 4. スペースは - に変換
    // 5. 日本語などアルファベット以外の文字はそのまま
    let anchor = text;

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

function makeAnchorGithubAzure(text: string): string {
    // アンカー作成スキーム
    // 1. アルファベットは小文字に変換
    // 2. !@#$%^&*()_+={}][|\"':;?/>.<,`~ の文字は削除
    // 3. スペースの連続はスペース1つに変換
    // 4. スペースは - に変換
    // 5. 日本語などアルファベット以外の文字はそのまま
    // 6. 先頭に "user-content-" を付与
    let anchor = text;

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

    return '#user-content-' + anchor;
}

function makeAnchorEmbed(text: string): string {
    // アンカー作成スキーム
    // 1. アルファベットは小文字に変換
    // 2. !@#$%^&*()_+={}][|\"':;?/><,`~ の文字は削除
    // 3. スペースの連続はスペース1つに変換
    // 4. スペースは - に変換
    // 5. 日本語などアルファベット以外の文字はそのまま
    // 6. 先頭に "toc-" を付与
    let anchor = text;

    anchor = anchor.toLowerCase();
    anchor = anchor.split('　').join(' ');

    const removeList = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "=", "{", "}", "]", "[", "|", "\\", "\"", "'", ":", ";", "?", "/", ">", "<", ",", "`", "~"];
    removeList.forEach(v => {
        anchor = anchor.split(v).join('');
    });

    while(~anchor.indexOf('  ')) {
        anchor = anchor.split('  ').join(' ');
    }
    anchor = anchor.split(' ').join('-');

    anchor = replaceAll(anchor, '.', '-');

    return 'toc-' + anchor;
}

export function insertEmbeddedAnchor(srcText: string, depthFrom: number, depthTo: number): string {
    console.debug('markdown-toc-num.insertEmbeddedAnchor');

    // チャプターをパースする
    const chapters = chapterParser.parseChapter(srcText);
    if(chapters.length === 0){
        // チャプターが見つからなければそのままのテキストを返す
        return srcText;
    }

    const lines = srcText.split(/\r\n|\n|\r/);

    let newLines: string[] = [];
    let nextChapterNum = 0;


    for(let i = 0; i < lines.length; i++)
    {
        if(nextChapterNum >= chapters.length) {
            // もう後ろにヘッダーは無い
            newLines.push(lines[i]);
            continue;
        }

        let nextChapter = chapters[nextChapterNum];
        while(nextChapter.level < depthFrom || nextChapter.level > depthTo) {
            nextChapterNum = nextChapterNum + 1;
            nextChapter = chapters[nextChapterNum];
        }

        if(i < nextChapter.line) {
            // 次のヘッダーまでのコンテンツ行
            newLines.push(lines[i]);
            continue;
        }

        const anchor = makeAnchorEmbed(nextChapter.text);

        const embeddedAnchorText = '<div id="' + anchor + '" />';
        const embeddedAnchorTextReplaced = replaceAll(embeddedAnchorText, '.', '-');

        newLines.push(embeddedAnchorTextReplaced);
        newLines.push('');
        newLines.push(lines[i]);
        nextChapterNum++;
    }

    return newLines.join('\n');
}

function replaceAll(srcText: string, from: string, to: string) {
    let replaced = srcText;
    while(~replaced.indexOf(from)) {
        replaced = replaced.replace(from, to);
    }
    return replaced;
}

export function removeEmbeddedAnchor(srcText: string): string {
    console.debug('markdown-toc-num.removeEmbeddedAnchor');

    const lines = srcText.split(/\r\n|\n|\r/);

    let newLines: string[] = [];

    let isNextLineOfAnchor = false;
    for(let i = 0; i < lines.length; i++)
    {
        if(isNextLineOfAnchor) {
            isNextLineOfAnchor = false;
            if(lines[i].trim() !== '') {
                newLines.push(lines[i]);
            }
            continue;
        }
        if(lines[i].startsWith('<div id="toc-')){
            isNextLineOfAnchor = true;
            continue;
        }
        newLines.push(lines[i]);
    }

    return newLines.join('\n');
}
