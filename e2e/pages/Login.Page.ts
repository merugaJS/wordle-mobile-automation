import Page from './Page'
import WordGamePage from './WordGame.Page'

class LoginPage extends Page {
    constructor() {
        super({
            IOS: '**/XCUIElementTypeStaticText[`name == "Test App Login"`]',
            ANDROID: ''
        })
    }

    get emailField() {
        return this.getElement({
            IOS: '**/XCUIElementTypeTextField[`value == "Email"`]',
            ANDROID: ''
        })
    }
    get passwordField() {
        return this.getElement({
            IOS: '**/XCUIElementTypeSecureTextField[`value == "Password"`]',
            ANDROID: ''
        })
    }
    get loginButton() {
        return this.getElement({
            IOS: '**/XCUIElementTypeOther[`name == "Login"`]',
            ANDROID: ''
        })
    }

    async login(email: string, password: string) {
        await this.emailField.setValue(email)
        await this.passwordField.setValue(password)
        await browser.hideKeyboard('pressKey', 'return');
        await this.loginButton.click()
        await this.tapNotNowPassword()
        await browser.hideKeyboard('pressKey', 'tapOutside');
        await WordGamePage.waitUntilPageLoads()
        return WordGamePage
    }
}

export default new LoginPage();