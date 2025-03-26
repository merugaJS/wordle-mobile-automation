import { expect } from '@wdio/globals'
import ExpoPage from '../pages/Expo.Page'

describe('Wordle Game', () => {
    it('should successfully guess the word and display win message', async () => {
        const WORDS = [
            "REACT",
            "APPLE",
            "NODES",
            "INPUT",
            "STACK",
            "CRANE",
            "BLAST",
            "ROUTE",
            "TIMER",
            "PLANT",
        ];
        await ExpoPage.waitUntilPageLoads()
        let loginPage = await ExpoPage.enterUrlManually()
        let wordGamePage = await loginPage.login('username', 'password')
        let correctWord = await wordGamePage.enterCorrectGuessWord(WORDS)
        await expect(wordGamePage.youWinText).toBeDisplayed()
        await expect(wordGamePage.correctWordText).toHaveText(`The word was ${correctWord}`)
        await expect(wordGamePage.playAgainButton).toBeDisplayed()
    })
})

