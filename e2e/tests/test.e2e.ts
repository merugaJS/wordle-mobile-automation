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
        // Login to app
        await ExpoPage.waitUntilPageLoads()
        let loginPage = await ExpoPage.enterUrlManually()
        let wordGamePage = await loginPage.login('username', 'password')

        // Guess the correct word and submit
        let correctWord = await wordGamePage.enterCorrectGuessWord(WORDS)

        // Verify after correct guess
        await expect(wordGamePage.youWinText).toBeDisplayed()
        await expect(wordGamePage.correctWordText).toHaveText(`The word was ${correctWord}`)
        await expect(wordGamePage.playAgainButton).toBeDisplayed()

        // Tap on settings
        let settingsPage = await wordGamePage.tapSettingsButton()

        // Tap on Logout
        loginPage = await settingsPage.tapLogout()

        // Verify user on login
        await expect(loginPage.emailField).toBeDisplayed()
        await expect(loginPage.passwordField).toBeDisplayed()
        await expect(loginPage.loginButton).toBeDisplayed()
    })
})

