/**
 *  Chapter node
 */
export type ChapterNode = {
    rowString: string;
    caption: string;


    parent: ChapterNode;
    children: ChapterNode[];
};
