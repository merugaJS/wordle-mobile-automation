import { $ } from '@wdio/globals';

declare global {
    namespace WebdriverIO {
        interface Browser {
            typeWithDelay(element: ReturnType<typeof $>, text: string, delay: number): Promise<void>;
        }
        interface Element {
            isPresent(): Promise<boolean>;
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

    browser.addCommand('isPresent', async function (this: WebdriverIO.Element): Promise<boolean> {
        try {
            return await this.isExisting();
        } catch (error) {
            return false;
        }
    });
}
