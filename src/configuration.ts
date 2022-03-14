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
const chapterDepthFromDefault = 2;
const chapterDepthToDefault = 6;

/**
 * Fix value in range
 * @param val Value
 * @param min Minimum of value
 * @param max Maximum of value
 * @returns fixed value
 */
function fixInRange(val: number, min: number, max: number): number {
    return (val === undefined) ? min : (val < min) ? min : (val > max) ? max : val;
};

/**
 * return default Config
 * @returns extention config default
 */
export function getDefaultConfig(): Config {
    return {
        tocDepthFrom: tocDepthFromDefault,
        tocDepthTo: tocDepthToDefault,
        chapterDepthFrom: chapterDepthFromDefault,
        chapterDepthTo: chapterDepthToDefault
    };
}

/**
 * return Config
 * @param doc vscode.TextDocument object
 * @returns extention config
 */
export function getConfig(defaultConfig: Config): Config {
    // get configurations
    let tocDepthFrom = <number>vscode.workspace.getConfiguration('"markdown-toc').get('tocDepthFrom');
    let tocDepthTo = <number>vscode.workspace.getConfiguration('"markdown-toc').get('tocDepthTo');
    let chapterDepthFrom = <number>vscode.workspace.getConfiguration('"markdown-toc').get('chapterDepthFrom');
    let chapterDepthTo = <number>vscode.workspace.getConfiguration('"markdown-toc').get('chapterDepthTo');

    
    tocDepthFrom = tocDepthFrom === undefined ? defaultConfig.tocDepthFrom : fixInRange(tocDepthFrom, tocDepthFromMin, tocDepthFromMax);
    tocDepthTo = tocDepthTo === undefined ? defaultConfig.tocDepthTo : fixInRange(tocDepthTo, tocDepthToMin, tocDepthToMax);
    chapterDepthFrom = chapterDepthFrom === undefined ? defaultConfig.chapterDepthFrom : fixInRange(chapterDepthFrom, chapterDepthFromMin, chapterDepthFromMax);
    chapterDepthTo = chapterDepthTo === undefined ? defaultConfig.chapterDepthTo : fixInRange(chapterDepthTo, chapterDepthToMin, chapterDepthToMax);

    return {tocDepthFrom, tocDepthTo, chapterDepthFrom, chapterDepthTo};
}

/**
 * parce text to Config
 * @param tocHeader 
 * @param defaultConfig 
 * @returns 
 */
export function parseConfig(tocHeader: string, defaultConfig: Config) {
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
        
    // get configurations
    let tocDepthFrom: number = 0;
    let tocDepthTo: number = 0;
    let chapterDepthFrom: number = 0;
    let chapterDepthTo: number = 0;

    let words = tocHeader.split(' ');
    words.forEach(word => {
        tocDepthFrom = decodeConfig(word, 'tocDepthFrom:', tocDepthFromMin, tocDepthFromMax, defaultConfig.tocDepthFrom);
        tocDepthTo = decodeConfig(word, 'tocDepthTo:', tocDepthToMin, tocDepthToMax, defaultConfig.tocDepthTo);
        chapterDepthFrom = decodeConfig(word, 'chapterDepthFrom:', chapterDepthFromMin, chapterDepthFromMax, defaultConfig.chapterDepthFrom);
        chapterDepthTo = decodeConfig(word, 'chapterDepthTo:', chapterDepthToMin, chapterDepthToMax, defaultConfig.chapterDepthTo);
    });

    return {tocDepthFrom, tocDepthTo, chapterDepthFrom, chapterDepthTo};
}