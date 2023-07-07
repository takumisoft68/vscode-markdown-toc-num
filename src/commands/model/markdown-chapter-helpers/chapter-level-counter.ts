
export class ChapterLevelCounter {
    levelCounts = [0, 0, 0, 0, 0, 0, 0];

    constructor() {
    }

    pushNextChapter(level: number) {
        if (level === 1) {
            this.levelCounts[1]++;
            this.levelCounts[2] = 0;
            this.levelCounts[3] = 0;
            this.levelCounts[4] = 0;
            this.levelCounts[5] = 0;
            this.levelCounts[6] = 0;
        }
        if (level === 2) {
            this.levelCounts[2]++;
            this.levelCounts[3] = 0;
            this.levelCounts[4] = 0;
            this.levelCounts[5] = 0;
            this.levelCounts[6] = 0;
        }
        if (level === 3) {
            this.levelCounts[3]++;
            this.levelCounts[4] = 0;
            this.levelCounts[5] = 0;
            this.levelCounts[6] = 0;
        }
        if (level === 4) {
            this.levelCounts[4]++;
            this.levelCounts[5] = 0;
            this.levelCounts[6] = 0;
        }
        if (level === 5) {
            this.levelCounts[5]++;
            this.levelCounts[6] = 0;
        }
        if (level === 6) {
            this.levelCounts[6]++;
        }
    }

    resetCounter() {
        this.levelCounts[1] = 0;
        this.levelCounts[2] = 0;
        this.levelCounts[3] = 0;
        this.levelCounts[4] = 0;
        this.levelCounts[5] = 0;
        this.levelCounts[6] = 0;
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