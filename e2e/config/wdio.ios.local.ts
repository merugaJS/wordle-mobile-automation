import { config as mainConfig } from "./wdio.conf";

export const config = {
    ...mainConfig,
    capabilities: [{
        'appium:platformName': 'iOS',
        'appium:platformVersion': '17.0',
        'appium:deviceName': 'iPhone 15 Pro',
        'appium:automationName': 'XCUITest',
        'appium:bundleId': 'host.exp.Exponent',
        // 'appium:app': `${process.cwd()}/ios/build/Build/Products/Debug-iphonesimulator/mobiletestengtakehome.app`,
        // Enable this if debugging
        // 'appium:newCommandTimeout': 300
    }],
}