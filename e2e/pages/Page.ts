import { browser, $ } from '@wdio/globals'
import { Element } from 'webdriverio'

export interface Locator {
    IOS: string;
    ANDROID: string;
}

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    protected locator: Locator;

    constructor(locator: Locator) {
        this.locator = locator;
    }

    get notNowButton() {
        return this.getElement({
            IOS: 'Not Now',
            ANDROID: ''
        })
    }
    protected getElement(locators: Locator): ReturnType<typeof $> {
        let locator: string = '';

        if (browser.isIOS) {
            locator = locators.IOS;
            if (!locator) {
                throw new Error('No valid locator found for the current platform');
            }
            if (locator.startsWith('**/')) {
                locator = `-ios class chain:${locator}`;
            }
            else if (locator.startsWith('predicate=')) {
                locator = `-ios predicate string:${locator.substring(10)}`;
            }
            else if (!locator.includes('//')) {
                locator = `~${locator}`;
            }
        } else if (browser.isAndroid) {
            locator = locators.ANDROID;
            if (!locator) {
                throw new Error('No valid locator found for the current platform');
            }
            if (locator.includes('UiSelector')) {
                locator = `android=${locator}`;
            } else if (locator.startsWith('text=')) {
                locator = `android=new UiSelector().textContains("${locator.substring(5)}")`;
            } else if (locator.startsWith('id=')) {
                locator = `android=new UiSelector().resourceId("${locator.substring(3)}")`;
            } else if (locator.startsWith('desc=')) {
                locator = `android=new UiSelector().description("${locator.substring(5)}")`;
            }
        }
        return $(locator);
    }

    async waitUntilPageLoads(): Promise<void> {
        await this.getElement(this.locator).waitForDisplayed({ timeout: 30000 });
    }

    async tapNotNowPassword() {
        if (await this.notNowButton.isDisplayed()) {
            await this.notNowButton.click()
        }
    }
}
