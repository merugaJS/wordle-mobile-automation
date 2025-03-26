import Page from "./Page";
import LoginPage from "./Login.Page";

class SettingsPage extends Page {
    constructor() {
        super({
            IOS: '**/XCUIElementTypeStaticText[`name == "Settings"`][4]',
            ANDROID: 'new UiSelector().text("Settings").instance(0)'
        });
    }

    get logoutButton() {
        return this.getElement({
            IOS: 'Logout',
            ANDROID: 'desc=Logout'
        })
    }

    async tapLogout(): Promise<typeof LoginPage> {
        await this.logoutButton.click();
        return LoginPage;
    }
}

export default new SettingsPage();