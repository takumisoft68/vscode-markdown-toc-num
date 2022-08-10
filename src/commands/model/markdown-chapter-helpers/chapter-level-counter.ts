
export class ChapterLevelCounter {
    levelCounts = [0, 0, 0, 0, 0, 0, 0];
    chapterDepthFrom : number;
    chapterDepthTo: number;

    constructor(chapterDepthFrom: number, chapterDepthTo: number) {
        this.chapterDepthFrom = chapterDepthFrom;
        this.chapterDepthTo = chapterDepthTo;
    }

    pushNextChapter(level: number) {
        if (level === 1) {
            if(this.chapterDepthFrom > 1 || this.chapterDepthTo < 1) {
                this.levelCounts[1] = 0;
                this.levelCounts[2] = 0;
                this.levelCounts[3] = 0;
                this.levelCounts[4] = 0;
                this.levelCounts[5] = 0;
                this.levelCounts[6] = 0;
                return;
            }
            this.levelCounts[1]++;
            this.levelCounts[2] = 0;
            this.levelCounts[3] = 0;
            this.levelCounts[4] = 0;
            this.levelCounts[5] = 0;
            this.levelCounts[6] = 0;
        }
        if (level === 2) {
            if(this.chapterDepthFrom > 2 || this.chapterDepthTo < 2) {
                this.levelCounts[2] = 0;
                this.levelCounts[3] = 0;
                this.levelCounts[4] = 0;
                this.levelCounts[5] = 0;
                this.levelCounts[6] = 0;    
                return;
            }
            this.levelCounts[2]++;
            this.levelCounts[3] = 0;
            this.levelCounts[4] = 0;
            this.levelCounts[5] = 0;
            this.levelCounts[6] = 0;
        }
        if (level === 3) {
            if(this.chapterDepthFrom > 3 || this.chapterDepthTo < 3) {
                this.levelCounts[3] = 0;
                this.levelCounts[4] = 0;
                this.levelCounts[5] = 0;
                this.levelCounts[6] = 0;
                return;
            }
            this.levelCounts[3]++;
            this.levelCounts[4] = 0;
            this.levelCounts[5] = 0;
            this.levelCounts[6] = 0;
        }
        if (level === 4) {
            if(this.chapterDepthFrom > 4 || this.chapterDepthTo < 4) {
                this.levelCounts[4] = 0;
                this.levelCounts[5] = 0;
                this.levelCounts[6] = 0;
                return;
            }
            this.levelCounts[4]++;
            this.levelCounts[5] = 0;
            this.levelCounts[6] = 0;
        }
        if (level === 5) {
            if(this.chapterDepthFrom > 5 || this.chapterDepthTo < 5) {
                this.levelCounts[5] = 0;
                this.levelCounts[6] = 0;
                return;
            }
            this.levelCounts[5]++;
            this.levelCounts[6] = 0;
        }
        if (level === 6) {
            if(this.chapterDepthFrom > 6 || this.chapterDepthTo < 6) {
                this.levelCounts[6] = 0;
                return;
            }
            this.levelCounts[6]++;
        }
    }

    getLevelText(): string {
        const levelText = this.levelCounts.join('.') + '.';
        return levelText;
    }

    getLevelTextTrimmed(): string {
        const levelText = this.levelCounts.join('.') + '.';
        let levelTextTrimmed = levelText;
        while(levelTextTrimmed.startsWith('0.')) {
            levelTextTrimmed = levelTextTrimmed.replace('0.', '');
        }
        while(~levelTextTrimmed.indexOf('.0.')) {
            levelTextTrimmed = levelTextTrimmed.replace('.0.', '.');
        }
        return levelTextTrimmed;
    }
}