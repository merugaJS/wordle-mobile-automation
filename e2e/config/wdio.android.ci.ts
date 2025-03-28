import { config as mainConfig } from "./wdio.conf";

export const config = {
    ...mainConfig,
    capabilities: [{
        'appium:platformName': 'Android',
        'appium:appPackage': 'com.testengtakehome.app',
        'appium:appActivity': 'com.testengtakehome.app.MainActivity',
        'appium:automationName': 'UiAutomator2',
        'appium:app': `${process.cwd()}/android/app/build/outputs/apk/release/app-release.apk`,
        'appium:newCommandTimeout': 300
    }],
}