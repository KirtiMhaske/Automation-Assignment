/*
Scenario : Successful Login for existing user.
This is a basic requirement for any ECommerce website/app that user should be able to login to an app.
User will not be able to place an order without logging into an app.

Steps - 
1. Launch browser
2. Navigate to url 'http://www.automationpractice.pl/index.php'
3. Verify that home page is visible successfully
4. Click on 'Signup' button
5. Verify ‘Already Registered’ section is visible
6. Enter valid email address
7. Enter correct email address and password
8. Click ‘Sign In’ button
9. Verify that 'Logged in as username' is visible
10. Verify the Username in top right Menu bar
11. Click Sign out to log out
*/


import test from '../testFixtures/fixture'
import { expect } from '@playwright/test'
import fs from 'fs'


const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))

import {
    baseUrl,
    productUrl,
    title,
    ProductPageTitle
} from '../config'

test.describe.serial(
    '@smoke: Login as a standard user to verify the products page and logout from the application',
    () => {
        test('Login to App as a standard user and logout', async ({
            loginPage,
            productsPage }) => {

            await test.step(`Open the APP and check logo`, async () => {
                await loginPage.openApp()
                await loginPage.clickcSignIn()
                await loginPage.loginPageLogo()
                expect.soft(await loginPage.getTitle()).toBe(title)
                expect(await loginPage.getUrl()).toContain(baseUrl)
            })

            await test.step(
                `Verify username and password fields are visible on login page`,
                async () => {
                    await loginPage.usernameFieldVisible()
                    await loginPage.passwordFieldVisible()
                })

            await test.step(
                `Verify Login button is enabled and bot image is visible`,
                async () => {
                    await loginPage.loginButtonIsEnabled()
                })

            await test.step(`Login with an existing user`, async () => {
                await loginPage.loginAsStandardUser()
            })

            await test.step(
                `Verify Successful Login Message`,
                async () => {
                    await productsPage.validateLoginMessage()
                    expect(await productsPage.getUrl()).toContain(productUrl)
                    }
            )
            await test.step(
                `Logout from the application`,
                async () => {
                     await  productsPage.clickSignOutLink()
                })

            await test.step(`Verify that you landed back on Login page`, async () => {
                    expect.soft(await loginPage.getTitle()).toBe(title)
                    expect(await loginPage.getUrl()).toContain(baseUrl)
                })
            })

        test('Login to App as an existing user and validate the products landing page', async ({
            loginPage,
            productsPage }) => {

            await test.step(`Open the APP and validate the login page`, async () => {
                await loginPage.openApp()
                await loginPage.clickcSignIn()
                await loginPage.loginPageLogo()
                expect.soft(await loginPage.getTitle()).toBe(title)
                expect(await loginPage.getUrl()).toContain(baseUrl)
            })
            await test.step(`Login with an existing user`, async () => {
                await loginPage.loginAsStandardUser()
            })

            await test.step(
                `Verify the products landing page`,
                async () => {
                    expect.soft(await productsPage.getTitle()).toBe(ProductPageTitle)
                    expect(await productsPage.getUrl()).toContain(productUrl)
                    await productsPage.verifyProductsPageLogoVisible()
                    await productsPage.verifyPeekImage()
                    await productsPage.contactUsLink()
                    await productsPage.signOutLink()
                    await productsPage.shoppingCartLink()
                }
            )

            await test.step(
                `Verify the footer and social channel links are visible`,
                async () => {
                    await productsPage.footerTextVisible()
                    await productsPage.VerifySocialandFooterLinks()
                }
            )
        })
    })
