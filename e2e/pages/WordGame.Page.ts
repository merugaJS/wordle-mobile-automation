import Page from "./Page";
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

class WordGamePage extends Page {
    constructor() {
        super({
            IOS: '**/XCUIElementTypeStaticText[`name == "Word Game"`][3]',
            ANDROID: '(//android.widget.TextView[@text="Word Game"])[1]'
        })
    }

    get submitButton() {
        return this.getElement({
            IOS: '**/XCUIElementTypeOther[`name == "⏎ Submit"`]',
            ANDROID: 'text=⏎ Submit'
        })
    }

    get youWinText() {
        return this.getElement({
            IOS: '**/XCUIElementTypeStaticText[`name == "You Win!"`][2]',
            ANDROID: 'text=You Win!'
        })
    }

    get correctWordText() {
        return this.getElement({
            IOS: '**/XCUIElementTypeStaticText[`name CONTAINS "The word was"`][2]',
            ANDROID: '//android.widget.TextView[contains(@text,"The word was")]'
        })
    }

    get planAgainButton() {
        return this.getElement({
            IOS: '**/XCUIElementTypeOther[`name == "Play Again"`]',
            ANDROID: 'desc=Play Again'
        })
    }

    keyButton(key: string) {
        return this.getElement({
            IOS: `**/XCUIElementTypeOther[\`name == "${key}"\`]`,
            ANDROID: `//android.view.ViewGroup[@content-desc="${key}"]/android.widget.TextView`
        })
    }


    async enterWord(word: string) {
        for (const char of word) {
            await this.keyButton(char).click()
        }
    }

    async clickSubmitButton() {
        await this.submitButton.click()
    }

    async getLettersColor(word: string): Promise<string[]> {
        let colors = [];
        const screenshotDir = path.join(process.cwd(), 'screenshots');
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }

        for (const letter of word) {
            const element = await this.keyButton(letter);
            const screenshotPath = path.join(screenshotDir, `letter_${letter}.png`);
            await element.saveScreenshot(screenshotPath);

            const stats = await sharp(screenshotPath).stats();
            const { r, g, b } = stats.dominant;
            const brightness = (r + g + b) / 3;

            const isGreen = (
                g > r + 30 && // Green should be significantly higher than red
                g > b + 30 && // Green should be significantly higher than blue
                g > 140      // Green should be reasonably high
            );
            if (brightness <= 120) {
                colors.push('grey')
            } else if (isGreen) {
                colors.push('green')
            } else {
                colors.push('yellow')
            }
        }
        return colors;
    }

    async enterCorrectGuessWord(words: string[]): Promise<string> {
        let possibleWords = words;
        const maxAttempts = 6;
        let guess = '';

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            guess = possibleWords[0];
            await this.enterWord(guess);
            if (!await this.submitButton.isExisting()) {
                return guess;
            }
            await this.clickSubmitButton()
            const colors = await this.getLettersColor(guess);

            possibleWords = this.filterWords(guess, colors, possibleWords);
        }
        return guess;
    }

    filterWords(guess: string, colors: string[], words: string[]): string[] {
        return words.filter(word => {
            let isValid = true;

            for (let i = 0; i < guess.length; i++) {
                const letter = guess[i];
                const color = colors[i];

                if (color === "green") {
                    if (word[i] !== letter) {
                        isValid = false;
                        break;
                    }
                } else if (color === "yellow") {
                    if (!word.includes(letter) || word[i] === letter) {
                        isValid = false;
                        break;
                    }
                } else if (color === "grey") {
                    if (word.includes(letter)) {
                        isValid = false;
                        break;
                    }
                }
            }

            return isValid;
        });
    }
}

export default new WordGamePage()