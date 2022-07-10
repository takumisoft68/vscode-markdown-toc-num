import { TextDecoder } from 'util';
import * as vscode from 'vscode';
import * as tocPositionFinder from './markdown-toc-helpers/toc-position-finder';
import { AnchorMode } from './markdown-toc';

/**
 *  My extention config
 */
export type Config = {
    tocDepthFrom: number;
    tocDepthTo: number;
    chapterDepthFrom: number;
    chapterDepthTo: number;
    anchorMode: AnchorMode;
};

const tocDepthFromMin = 1;
const tocDepthFromMax = 6;
const tocDepthToMin = 1;
const tocDepthToMax = 6;
const chapterDepthFromMin = 1;
const chapterDepthFromMax = 6;
const chapterDepthToMin = 1;
const chapterDepthToMax = 6;

const tocDepthFromDefault = 2;
const tocDepthToDefault = 3;
const chapterDepthFromDefault = 2;
const chapterDepthToDefault = 6;

const anchorModeDefault = AnchorMode.vscode;

export function getCurrentConfig(text: string): Config {
    const defaultConfig = getDefaultConfig();
    let currentConfig = getConfig(defaultConfig);

    // decode config in toc anchor line
    const [,,tocHeadText] = tocPositionFinder.getTocPosition(text);
    if (tocHeadText !== "") {
        currentConfig = parseConfig(tocHeadText, currentConfig);
    }

    return currentConfig;
}

/**
 * return default Config
 * @returns extention config default
 */
export function getDefaultConfig(): Config {
    return {
        tocDepthFrom: tocDepthFromDefault,
        tocDepthTo: tocDepthToDefault,
        chapterDepthFrom: chapterDepthFromDefault,
        chapterDepthTo: chapterDepthToDefault,
        anchorMode: anchorModeDefault
    };
}

/**
 * return Config
 * @param doc vscode.TextDocument object
 * @returns extention config
 */
function getConfig(defaultConfig: Config): Config {
    // get configurations
    let tocDepthFrom = <number>vscode.workspace.getConfiguration('"markdown-toc-num').get('tocDepthFrom');
    let tocDepthTo = <number>vscode.workspace.getConfiguration('"markdown-toc-num').get('tocDepthTo');
    let chapterDepthFrom = <number>vscode.workspace.getConfiguration('"markdown-toc-num').get('chapterDepthFrom');
    let chapterDepthTo = <number>vscode.workspace.getConfiguration('"markdown-toc-num').get('chapterDepthTo');

    tocDepthFrom = tocDepthFrom === undefined ? defaultConfig.tocDepthFrom : fixInRange(tocDepthFrom, tocDepthFromMin, tocDepthFromMax);
    tocDepthTo = tocDepthTo === undefined ? defaultConfig.tocDepthTo : fixInRange(tocDepthTo, tocDepthToMin, tocDepthToMax);
    chapterDepthFrom = chapterDepthFrom === undefined ? defaultConfig.chapterDepthFrom : fixInRange(chapterDepthFrom, chapterDepthFromMin, chapterDepthFromMax);
    chapterDepthTo = chapterDepthTo === undefined ? defaultConfig.chapterDepthTo : fixInRange(chapterDepthTo, chapterDepthToMin, chapterDepthToMax);


    let anchorModeText = <string>vscode.workspace.getConfiguration('"markdown-toc-num').get('anchorMode');
    let anchorMode = defaultConfig.anchorMode;
    if(anchorModeText === 'gitlab') {
        anchorMode = AnchorMode.gitlab;
    }
    if(anchorModeText === 'vscode') {
        anchorMode = AnchorMode.vscode;
    }
    if(anchorModeText === 'none') {
        anchorMode = AnchorMode.none;
    }

    return {tocDepthFrom, tocDepthTo, chapterDepthFrom, chapterDepthTo, anchorMode};
}

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
 * parce Header Markup Text to Config
 * @param tocHeader 
 * @param defaultConfig 
 * @returns 
 */
function parseConfig(tocHeader: string, defaultConfig: Config) {
    /**
     * Find and decode config value from text
     * @param text Text
     * @param prefix Config text prefix
     * @param min Minimum of config value
     * @param max Maximum of config value
     * @param def Defualt of config value
     * @returns Return decoded value, if found. If not, return default value.
     */
    let decodeConfig = (text: string, prefix: string, def: number): number => {
        if (!text.startsWith(prefix)) {
            return def;
        }

        let spec = text.replace(prefix, '');
        let num = parseInt(spec);

        return num;
    };

    let decodeConfigCombined = (text: string, prefix: string, def: [number, number]) => {
        if (!text.startsWith(prefix)) {
            return def;
        }
        if (text.indexOf('..', 0) === -1) {
            return def;
        }

        const spec = text.replace(prefix, '');
        const [from, to] = spec.split('..');
        const fromNum = parseInt(from);
        const toNum = parseInt(to);

        return [fromNum, toNum];
    };
        
    // get configurations
    let tocDepthFrom: number = defaultConfig.tocDepthFrom;
    let tocDepthTo: number = defaultConfig.tocDepthTo;
    let chapterDepthFrom: number = defaultConfig.chapterDepthFrom;
    let chapterDepthTo: number = defaultConfig.chapterDepthTo;
    let anchorMode: AnchorMode = defaultConfig.anchorMode;

    const words = tocHeader.split(' ');
    words.forEach(word => {
        tocDepthFrom = fixInRange(decodeConfig(word, 'tocDepthFrom:', tocDepthFrom), tocDepthFromMin, tocDepthFromMax);
        tocDepthTo = fixInRange(decodeConfig(word, 'tocDepthTo:', tocDepthTo), tocDepthToMin, tocDepthToMax);
        chapterDepthFrom = fixInRange(decodeConfig(word, 'chapterDepthFrom:', chapterDepthFrom), chapterDepthFromMin, chapterDepthFromMax);
        chapterDepthTo = fixInRange(decodeConfig(word, 'chapterDepthTo:', chapterDepthTo), chapterDepthToMin, chapterDepthToMax);
    });
    words.forEach(word => {
        [tocDepthFrom, tocDepthTo] = decodeConfigCombined(word, 'tocDepth:',  [tocDepthFrom, tocDepthTo]);
        tocDepthFrom = fixInRange(tocDepthFrom, tocDepthFromMin, tocDepthFromMax);
        tocDepthTo = fixInRange(tocDepthTo, tocDepthToMin, tocDepthToMax);

        [chapterDepthFrom, chapterDepthTo] = decodeConfigCombined(word, 'chapterDepth:',  [chapterDepthFrom, chapterDepthTo]);
        chapterDepthFrom = fixInRange(chapterDepthFrom, chapterDepthFromMin, chapterDepthFromMax);
        chapterDepthTo = fixInRange(chapterDepthTo, chapterDepthToMin, chapterDepthToMax);
    });

    return {tocDepthFrom, tocDepthTo, chapterDepthFrom, chapterDepthTo, anchorMode};
}