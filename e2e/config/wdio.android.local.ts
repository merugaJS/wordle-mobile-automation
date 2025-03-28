import { config as mainConfig } from "./wdio.conf";

export const config = {
    ...mainConfig,
    capabilities: [{
        'appium:platformName': 'Android',
        'appium:appPackage': 'host.exp.exponent',
        'appium:appActivity': 'host.exp.exponent.experience.HomeActivity',
        'appium:automationName': 'UiAutomator2',
        // Enable this if debugging
        // 'appium:newCommandTimeout': 300
    }],
}