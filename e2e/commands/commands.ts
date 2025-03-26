import { $ } from '@wdio/globals';

declare global {
    namespace WebdriverIO {
        interface Browser {
            typeWithDelay(element: ReturnType<typeof $>, text: string, delay: number): Promise<void>;
            waitForElement(element: ReturnType<typeof $>, timeout?: number): Promise<boolean>;
        }
    }
}

export function registerCommands() {
    browser.addCommand('typeWithDelay', async function (element: ReturnType<typeof $>, text: string, delay: number) {
        const resolvedElement = await element;
        for (const char of text) {
            await resolvedElement.addValue(char);
            await browser.pause(delay);
        }
    });


    browser.addCommand('waitForElement', async function (element: ReturnType<typeof $>, timeout: number = 10000): Promise<boolean> {
        try {
            await element.waitForDisplayed({ timeout });
            return true;
        } catch (error) {
            return false;
        }
    });
}
