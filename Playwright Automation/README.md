### Playwright Test Runner With JavaScript

An example project demonstrating automation of playwright tests using page object design pattern framework.

#### Application Under Test

We are using https://www.automationpractice.pl/ as the Application Under Test. 

- URL: https://www.automationpractice.pl/ 
- OS : Windows 10 
- IDE : Visual Studio Code
 
#### Scenarios

```bash
Scenario 1: Register New User Test

Scenario Description: User open the App and creates new account with all valid field values.
Validates the successful account creation and then logs out from the application. This is like a Smoke test.

Testname: TC1-RegisterNewUser.js
```
 
```bash
Scenario 2: Login as an existing user to verify the products page and logout from the application

Scenario Description: User logs into the website and verifies all the elements on the products
page and logs out from the application. This is like a Smoke test.

Testname: Testname: TC2-LoginTests.js
```
 
 
```bash
Scenario 3: Login as a standard user to complete the checkout workflow

Scenario Description: User logs into the website and completes the checkout workflow and logs out
from the application. This is a Happy path test scenario.

Testname: TC3-End-To-End-HappyPath.js
```

```bash
Scenario: 4: Verify that Products added to Cart are persisted and can be checkout later on.

Scenario Description: User logs in as a existing user to add a product item in Cart and then logs out.
Logs back in to checkout the previously added Cart items.

Testname: TC4-ValidateCartRetainAfterLogout.js
```

```bash 
Scenario 5: Add products to Cart and Login during the Checkout process

Scenario Description: User adds some products to Cart without logging into an App and starts thecheckout proccess.
User is then prompted to login during the checkout process and checkout process completes after login.

Testname: TC5-End-To-End-SignInBeforeCheckout.js
```


#### Installation

Install the dependencies and devDependencies to run the test.

- Clone (OR) Download this repo as zip folder on to your local machine
- Navigate to project's directory on terminal and run the following commands:

Clone the repository

```bash
git clone <repo_name>
```

Install dependencies

```bash
npm install
npx playwright install
```

#### Run application

Run tests in Parallel chrome

```bash
npm run test:chrome - For tests only on chrome browser
```

Run tests in Parallel firefox

```bash
npm run test:firefox - For tests only on firefox browser
```


Run tests in Parallel edge

```bash
npm run test:edge - For tests only on edge browser
```

Run tests in Parallel on all browsers (chrome, safari, edge and firefox)

```bash
npm run test  - For tests only on all browsers
```

#### Playwright Test Report 

```bash
npx playwright show-report
```

#### Allure Test Report

```bash
Allure-test-report :
1.	npm run allure:clean
2.	npm run test:chrome
3.	npm run allure-generate
3.	npm run allure:report-open
```

#### GitHub

```bash
Repo: https://github.com/KirtiMhaske/Automation-Assignment.git

```
