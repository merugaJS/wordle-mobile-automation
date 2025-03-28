import Page from "./Page";
import LoginPage from "./Login.Page";

class ExpoPage extends Page {
    constructor() {
        super({
            IOS: '**/XCUIElementTypeStaticText[`name == "Expo Go"`][1]',
            ANDROID: 'text=Expo Go'
        })
    }

    get dropDownUrlButton() {
        return this.getElement({
            IOS: '**/XCUIElementTypeOther[`name == "Enter URL manually"`][2]',
            ANDROID: 'new UiSelector().className("android.widget.ImageView").instance(2)'
        })
    }

    get urlField() {
        return this.getElement({
            IOS: '**/XCUIElementTypeTextField',
            ANDROID: '//android.widget.EditText'
        })
    }

    get connectButton() {
        return this.getElement({
            IOS: '**/XCUIElementTypeOther[`name == "Connect"`][2]',
            ANDROID: 'text=Connect'
        })
    }

    async enterUrlManually(): Promise<typeof LoginPage> {
        await this.dropDownUrlButton.click();
        await browser.typeWithDelay(await this.urlField, 'exp://localhost:8081', 5);
        await this.connectButton.click()
        await LoginPage.waitUntilPageLoads()
        return LoginPage;
    }
}

class AndroidExpoPage extends ExpoPage {
    async enterUrlManually(): Promise<typeof LoginPage> {
        await this.dropDownUrlButton.click();
        await this.urlField.setValue('exp://localhost:8081')
        await this.connectButton.click()
        await LoginPage.waitUntilPageLoads()
        return LoginPage;
    }
}

export default browser.isIOS ? new ExpoPage() : new AndroidExpoPage(); 