import Page from './Page'
import WordGamePage from './WordGame.Page'

class LoginPage extends Page {
    constructor() {
        super({
            IOS: '**/XCUIElementTypeStaticText[`name == "Test App Login"`]',
            ANDROID: 'text=Test App Login'
        })
    }

    get continueButton() {
        return this.getElement({
            IOS: '',
            ANDROID: 'text=Continue'
        })
    }

    get closeButton() {
        return this.getElement({
            IOS: '',
            ANDROID: 'new UiSelector().className("com.horcrux.svg.SvgView").instance(0)'
        })
    }

    get emailField() {
        return this.getElement({
            IOS: '**/XCUIElementTypeTextField[`value == "Email"`]',
            ANDROID: 'text=Email'
        })
    }
    get passwordField() {
        return this.getElement({
            IOS: '**/XCUIElementTypeSecureTextField[`value == "Password"`]',
            ANDROID: 'text=Password'
        })
    }
    get loginButton() {
        return this.getElement({
            IOS: '**/XCUIElementTypeOther[`name == "Login"`]',
            ANDROID: 'desc=Login'
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

class AndroidLoginPage extends LoginPage {
    async login(email: string, password: string) {
        await this.emailField.setValue(email)
        await this.passwordField.setValue(password)
        if (await this.continueButton.isDisplayed()) {
            await this.continueButton.click()
            await this.closeButton.click()
        }
        await this.loginButton.click()
        await WordGamePage.waitUntilPageLoads()
        return WordGamePage
    }
}

export default browser.isIOS ? new LoginPage() : new AndroidLoginPage();