// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { start } from 'repl';
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	/**
	 * extension utility : register command
	 */
	function registerCommandNice(commandId: string, run: (...args: any[]) => void): void {
		let command = vscode.commands.registerCommand(commandId, run);
		context.subscriptions.push(command);
	}

	/**
	 *  My extention config
	 */
	type Config = {
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
	function getConfig(doc: vscode.TextDocument): Config {
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
		let tocDepthFrom = <number>vscode.workspace.getConfiguration('"markdown-toc').get('tocDepthFrom');
		let tocDepthTo = <number>vscode.workspace.getConfiguration('"markdown-toc').get('tocDepthTo');
		let chapterDepthFrom = <number>vscode.workspace.getConfiguration('"markdown-toc').get('chapterDepthFrom');
		let chapterDepthTo = <number>vscode.workspace.getConfiguration('"markdown-toc').get('chapterDepthTo');

		tocDepthFrom = tocDepthFrom === undefined ? tocDepthFromDefault : fixInRange(tocDepthFrom, tocDepthFromMin, tocDepthFromMax);
		tocDepthTo = tocDepthTo === undefined ? tocDepthToDefault : fixInRange(tocDepthTo, tocDepthToMin, tocDepthToMax);
		chapterDepthFrom = chapterDepthFrom === undefined ? chapterDepthFromDefault : fixInRange(chapterDepthFrom, chapterDepthFromMin, chapterDepthFromMax);
		chapterDepthTo = chapterDepthTo === undefined ? chapterDepthToDefault : fixInRange(chapterDepthTo, chapterDepthToMin, chapterDepthToMax);

		// decode config in toc anchor line
		const [tocStartLine,] = getTocPosition(doc);
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


	/**
	 * Return position of TOC in document by [startLine, endLine] format.
	 * @param doc vscode.TextDocument object
	 * @returns position of TOC by [startLine, endLine] format. If toc is not exist, return [-1, -1]
	 */
	function getTocPosition(doc: vscode.TextDocument): [number, number] {

		let startLine = -1;
		let endLine = -1;

		for (let lineNum = 0; lineNum < doc.lineCount; lineNum++) {
			let lineText = doc.lineAt(lineNum).text;

			if (startLine === -1 && lineText.startsWith('<!-- TOC ')) {
				startLine = lineNum;
			}
			if (endLine === -1 && lineText.startsWith('<!-- /TOC ')) {
				endLine = lineNum;
			}
		}

		endLine = (endLine > startLine) ? endLine : startLine;
		return [startLine, endLine];
	}


	registerCommandNice('markdown-toc.insertChapterNumber', () => {
		console.info('markdown-toc.insertChapterNumber');
		const doc = (vscode.window.activeTextEditor as vscode.TextEditor).document;

		let config = getConfig(doc);
		console.info(config);
	});
	registerCommandNice('markdown-toc.deleteChapterNumber', () => {
		console.log('markdown-toc.deleteChapterNumber');
		const doc = (vscode.window.activeTextEditor as vscode.TextEditor).document;

		let config = getConfig(doc);
		console.info(config);
	});
	registerCommandNice('markdown-toc.insertToc', () => {
		console.log('markdown-toc.insertToc');
		const doc = (vscode.window.activeTextEditor as vscode.TextEditor).document;

		let config = getConfig(doc);
		console.info(config);
	});
	registerCommandNice('markdown-toc.deleteToc', () => {
		console.log('markdown-toc.deleteToc');
		const doc = (vscode.window.activeTextEditor as vscode.TextEditor).document;

		let config = getConfig(doc);
		console.info(config);
	});
}

// this method is called when your extension is deactivated
export function deactivate() { }
