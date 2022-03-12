import * as vscode from 'vscode';
import * as toc from './markdown-toc';

/**
 *  My extention config
 */
export type Config = {
    tocDepthFrom: number;
    tocDepthTo: number;
    chapterDepthFrom: number;
    chapterDepthTo: number;
};

/**
 * return Config
 * @param doc vscode.TextDocument object
 * @returns extention config
 */
export function getConfig(doc: vscode.TextDocument): Config {
    const tocDepthFromMin = 1;
    const tocDepthFromMax = 6;
    const tocDepthToMin = 1;
    const tocDepthToMax = 6;
    const chapterDepthFromMin = 1;
    const chapterDepthFromMax = 6;
    const chapterDepthToMin = 1;
    const chapterDepthToMax = 6;

    const tocDepthFromDefault = 1;
    const tocDepthToDefault = 6;
    const chapterDepthFromDefault = 1;
    const chapterDepthToDefault = 6;


    // get configurations
    let tocDepthFrom = <number>vscode.workspace.getConfiguration('"markdown-toc').get('tocDepthFrom');
    let tocDepthTo = <number>vscode.workspace.getConfiguration('"markdown-toc').get('tocDepthTo');
    let chapterDepthFrom = <number>vscode.workspace.getConfiguration('"markdown-toc').get('chapterDepthFrom');
    let chapterDepthTo = <number>vscode.workspace.getConfiguration('"markdown-toc').get('chapterDepthTo');

    /**
     * Fix value in range
     * @param val Value
     * @param min Minimum of value
     * @param max Maximum of value
     * @returns fixed value
     */
    let fixInRange = (val: number, min: number, max: number): number => {
        return (val === undefined) ? min : (val < min) ? min : (val > max) ? max : val;
    };
    
    tocDepthFrom = tocDepthFrom === undefined ? tocDepthFromDefault : fixInRange(tocDepthFrom, tocDepthFromMin, tocDepthFromMax);
    tocDepthTo = tocDepthTo === undefined ? tocDepthToDefault : fixInRange(tocDepthTo, tocDepthToMin, tocDepthToMax);
    chapterDepthFrom = chapterDepthFrom === undefined ? chapterDepthFromDefault : fixInRange(chapterDepthFrom, chapterDepthFromMin, chapterDepthFromMax);
    chapterDepthTo = chapterDepthTo === undefined ? chapterDepthToDefault : fixInRange(chapterDepthTo, chapterDepthToMin, chapterDepthToMax);


    /**
     * Find and decode config value from text
     * @param text Text
     * @param prefix Config text prefix
     * @param min Minimum of config value
     * @param max Maximum of config value
     * @param def Defualt of config value
     * @returns Return decoded value, if found. If not, return default value.
     */
    let decodeConfig = (text: string, prefix: string, min: number, max: number, def: number): number => {
        if (!text.startsWith(prefix)) {
            return def;
        }

        let spec = text.replace(prefix, '');
        let num = parseInt(spec);

        return fixInRange(num, min, max);
    };
    
    // decode config in toc anchor line
    const [tocStartLine,] = toc.getTocPosition(doc);
    if (tocStartLine >= 0) {
        let text = doc.lineAt(tocStartLine).text;
        let words = text.split(' ');
        words.forEach(word => {
            tocDepthFrom = decodeConfig(word, 'tocDepthFrom:', tocDepthFromMin, tocDepthFromMax, tocDepthFrom);
            tocDepthTo = decodeConfig(word, 'tocDepthTo:', tocDepthToMin, tocDepthToMax, tocDepthTo);
            chapterDepthFrom = decodeConfig(word, 'chapterDepthFrom:', chapterDepthFromMin, chapterDepthFromMax, chapterDepthFrom);
            chapterDepthTo = decodeConfig(word, 'chapterDepthTo:', chapterDepthToMin, chapterDepthToMax, chapterDepthTo);
        });
    }

    return {tocDepthFrom, tocDepthTo, chapterDepthFrom, chapterDepthTo};
}
