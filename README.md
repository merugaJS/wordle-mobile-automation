# Test Engineer Take Home Exam

Welcome to the Test Engineer Take Home Exam! Please follow the instructions below to complete the assignment.
Please feel free to ask any questions if you get stuck along the way! This take home exam should take no longer than 1-2 hours (not including the Bonus Section)

## Instructions

1. **Clone the Repository**
    ```bash
    git clone https://github.com/bluevoiceio/mobile-test-eng-take-home.git
    cd mobile-test-eng-take-home
    ```
    - 1a. Install dependencies: `npm install` (Node version 20+)
    - 1b. Run the app: (see `package.json` for all scripts)  
        - `npm run web`  
        - `npm run ios`  
        - `npm run android`  

2. **Create a Test**
    - Create an e2e test of this mobile app using either Maestro, Appium OR any framework capable of testing physical mobile devices. (Tests can be run using emulators, but frameworks such as Playwright are not allowed since Playwright cannot test on real devices.)
        - It must run successfully on both Android and IOS

3. **Run Your Test**
    - Execute your test and record videos of the test run-throughs.
    - Save the videos in a directory named `test-videos`.

4. **Submit Your Work**
    - Commit your code changes and videos.
    - Push your changes to a new branch.

5. **Open a Pull Request**
    - Open a PR OR send us a link of your own version in github.
    - Ensure your PR includes:
      - Notes describing your process
      - Code changes
      - Videos of test run-throughs
      - Explain everything that you have done and what you would do if you had more time: be concise and specific.

## Bonus

- **Create a GitHub Action**
  - Set up a GitHub Action that runs your tests automatically on each push.
  - Include the configuration file in your PR.

Thank you for your effort and good luck!

---
## Screenshots:
![Login Screen](tab0-login_page.png)
![Word_Game](tab1-word_game.png)
![Disclaimer Modal](tab1-disclaimer_modal.png)
![Settings](tab2-settings.png)
Proof that mobile app is buildable using package.json scripts: 
![Proof of Build](screenshot-proof-of-build-success.png)

# Mobile Test Engineering Take Home

This is a React Native application with a Wordle-like game implementation. The project includes end-to-end tests using WebdriverIO and Appium.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Xcode (for iOS testing)
- Android Studio (for Android testing)
- Appium Server
- iOS Simulator or Android Emulator

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## TEST

### iOS Testing

1. Start the app in iOS simulator:
   ```bash
   npm run ios
   ```

2. In a new terminal, run the iOS tests:
   ```bash
   npm run test:ios
   ```

Watch the test run demonstration in `testvideos/ios_test_run`

### Android Testing

1. Start the app in Android emulator:
   ```bash
   npm run android
   ```

2. In a new terminal, run the Android tests:
   ```bash
   npm run test:android
   ```

Watch the test run demonstration in `testvideos/android_test_run`

## Project Structure

- `app/` - Main application code
- `e2e/` - End-to-end test files
  - `config/` - WebdriverIO configuration files
  - `pages/` - Page object models
  - `tests/` - Tests
  - `commands/` - Custom WebdriverIO commands
- `testvideos/` - Test run demonstrations

## Test Reports

After test execution, Allure reports are generated in the `allure-results` directory. To view the reports:

```bash
npx allure open
```
