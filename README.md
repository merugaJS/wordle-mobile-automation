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

## Implementation Decisions & Future Improvements

### Current Implementation Decisions

When I started working on this test automation project, I went with WebdriverIO and Appium as my main testing framework. I've worked with these tools before and they're solid choices for mobile testing - they handle both iOS and Android really well, work great with TypeScript, and have a strong community behind them. What really sold me on this combo was how they handle timing issues, which is always tricky with mobile apps.

I structured the tests using the Page Object Model pattern, which I've found really helpful in past projects. It keeps things organized and makes the tests easier to maintain. Basically, each page gets its own class that handles all the elements and actions for that page. This way, if something changes in the UI, you only need to update it in one place. What's really cool about this setup is that you can write platform-specific implementations (one for Android, one for iOS) in the same page class, and the framework will automatically pick the right one at runtime. This came in handy when dealing with platform-specific behaviors, like different keyboard handling or UI element hierarchies.

For finding elements on the screen, I decided to use platform-specific locators instead of trying to make one locator work for both platforms. iOS and Android handle their UI elements quite differently - iOS uses XCUITest's class chain and predicate locators, while Android works better with UiSelector-based locators. Using platform-specific locators means more reliable tests and easier debugging when something goes wrong.

The trickiest part was figuring out how to test the word game's color feedback. I ended up using RGB analysis instead of comparing screenshots. This turned out to be a good call because it's faster, more reliable, and doesn't get thrown off by different screen resolutions. Plus, it's pretty straightforward to adjust the color thresholds if needed.

### Future Improvements

1. **Test Coverage Enhancement**
   - Add negative test scenarios:
     - Invalid login attempts
     - Network error handling
     - Wrong Guess words
   - Implement edge cases:
     - Long words
     - Special characters
   - Add performance testing:
     - App launch time
     - Memory usage monitoring

2. **Framework Optimization**
   - Implement parallel test execution:
     - Reduce overall test execution time
     - Better resource utilization
   - Add test data management:
     - External test data files
     - Data cleanup between tests
     - Dynamic test data generation (if needed)
   - Implement visual regression testing:
     - UI consistency across platforms
     - Accessibility compliance

3. **CI/CD Integration**
   - Set up GitHub Actions:
     - Automated smoke test runs on PRs
     - Scheduled regression test runs
   - Add test result reporting:
     - Test coverage reports (Automated / Total tests)
     - Performance metrics
   - Implement test environment management:
     - Dynamic environment configuration via CI/CD

4. **Quality Assurance**
   - Add code quality checks:
     - Linting rules
     - Type checking
   - Implement test documentation (confluence docs):
     - Test case documentation
     - Setup instructions
     - Troubleshooting guides
   - Add monitoring and analytics(using previous test runs) :
     - Test execution metrics
     - Failure patterns analysis

