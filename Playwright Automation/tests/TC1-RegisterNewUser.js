/*
Scenario 1: 
Register new user account.

Scenario Description: 
This is a basic requirement for any ECommerce website/app that any new user should be able to create his account.
User will not be able to place an order without creating an account.

1. Launch browser
2. Navigate to url 'http://www.automationpractice.pl/index.php'
3. Verify that home page is visible successfully
4. Click on 'Signup' button
5. Verify 'Create an Account' is visible
6. Enter valid email address
7. Click 'Create an Account' button
8. Verify that 'Your Personal Information' section is visible
9. Fill Valid user details: Title, First Name, Last Name, Email, Password, Date of birth
10. Select checkbox 'Sign up for our newsletter!'
11. Click 'Register' button
12. Verify that ' Your account has been created' Message is displayed
13. Verify that you are now logged in as a newly registered user and you are landed on a My Accounts page
14. Verify that you are able to access the project listing as a new user
15.	Click ‘Sign Out’ button
16.	Verify that you are logged out

*/


import test from '../testFixtures/fixture'
import { expect } from '@playwright/test'
import fs from 'fs'
const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))

import {
    baseUrl,
    productUrl,
    title,
    ProductPageTitle,
    cartPageTitle,
    yourCartUrl
} from '../config'


test.describe('@smoke: Register New User Test', () => {
    test('Registration', async ({
        registerUserPage
    }) => {
        await test.step(`Open the APP and check logo`, async () => {
            await registerUserPage.openApp()
            await registerUserPage.clickcSignIn()
            await registerUserPage.loginPageLogo()
            expect(await registerUserPage.getTitle()).toBe(title)
            expect(await registerUserPage.getUrl()).toContain(baseUrl)
        })

        await test.step(`Register New User with all valid field values`, async () => {
            await registerUserPage.registrationHeadingFieldVisible()
            await registerUserPage.emailFieldVisible()
            //Generate random new emailid
        
            await registerUserPage.enterEmailId(testData.validEmailId)
            //await registerUserPage.validateNoError()
            await registerUserPage.createUserIsEnabled()
            await registerUserPage.clickCreateAccount()
            await registerUserPage.enterFirstLastName(testData.firstName, testData.lastName)
            await registerUserPage.enterPassword(testData.validPassword)
            await registerUserPage.selectBirthDate('18', '3', '1988')
            await registerUserPage.clickRegister()

        })
        await test.step(`Verify that account is created successfully and logout `, async () => {
            await registerUserPage.verifyAccountCreationSuccess()
            await registerUserPage.signedInUserName()
            await registerUserPage.signOut()

        })
    })
})

