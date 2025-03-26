import Page from "./Page";
import LoginPage from "./Login.Page";

class ExpoPage extends Page {
    constructor() {
        super({
            IOS: '**/XCUIElementTypeStaticText[`name == "Expo Go"`][1]',
            ANDROID: ''
        })
    }

    get dropDownUrlButton() {
        return this.getElement({
            IOS: '**/XCUIElementTypeOther[`name == "Enter URL manually"`][2]',
            ANDROID: ''
        })
    }

    get urlField() {
        return this.getElement({
            IOS: '**/XCUIElementTypeTextField',
            ANDROID: ''
        })
    }

    get connectButton() {
        return this.getElement({
            IOS: '**/XCUIElementTypeOther[`name == "Connect"`][2]',
            ANDROID: ''
        })
    }

    async enterUrlManually(): Promise<typeof LoginPage> {
        const dropDownBtn = await this.dropDownUrlButton;
        await dropDownBtn.click();
        await browser.typeWithDelay(await this.urlField, 'exp://localhost:8081', 5);
        const connectBtn = await this.connectButton;
        await connectBtn.click();
        await LoginPage.waitUntilPageLoads()
        return LoginPage;
    }
}

export default new ExpoPage(); 