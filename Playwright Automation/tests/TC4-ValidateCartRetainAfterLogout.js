
/*Scenario 1: 
Products added into cart should be persisted so that user can checkout later 

Scenario Description: 
This is a basic requirement for any ECommerce website/app that it should persist the cart items 
even if user logs out or the browser is restarted before checkout

Steps:
1. Launch browser
2. Navigate to url ' http://www.automationpractice.pl/index.php'
3. Verify that home page is visible successfully
4. Click on 'Women' category 
5. Verify user is navigated to ALL PRODUCTS page successfully
6. Enter product name in search input and click search button
7. Verify 'SEARCHED PRODUCTS' is visible
8.  Add some products to cart
10. Click 'Cart' button and verify that products are visible in cart
11. Click Sign Out’ button OR close the browser
12. Open the browser and log in again with same email id 
13.	Again, go to Cart page
14.	Verify that the cart still has all the products added in last session"
15. Click Sign out to log out
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

test.describe('End-To-End Test - Login as an existing user to complete the checkout workflow', () => {
    test('Login to App as an existing user', async ({
        loginPage,
        productsPage
    }) => {
        await test.step(`Open the APP and check logo`, async () => {
            await loginPage.openApp()
            await loginPage.clickcSignIn()
            expect(await loginPage.getTitle()).toBe(title)
            expect(await loginPage.getUrl()).toContain(baseUrl)
        })

        await test.step(`Login as an existing user`, async () => {
            await loginPage.loginAsStandardUser()
        })

        await test.step(
            `Search for a product and add it to cart`,
            async () => {
                await productsPage.verifyWomenCatalogLink()
                await productsPage.clickWomenCatalogLink()
                await productsPage.clickselectedItem()
                
            }
        )

        await test.step(
            `Check availability and choose different size/colour which is in stock and add to cart`,
            async () => {
                await productsPage.verifyAddToCartNotEnabled()
                await productsPage.checkAvailabilityAndAddToCart()
                await productsPage.shoppingCartLink()
                const cartCount = await productsPage.shoppingCartCount()

            })

        await test.step(
            `Log Out from an app and log back in. Check if cart items are preserved`,
            async () => {
                await productsPage.clickSignOutLink()
                await loginPage.clickcSignIn()
                await loginPage.loginAsStandardUser()

                const count = await productsPage.isCartEmpty()
                expect(await productsPage.isCartEmpty()).toBeFalsy()
            })


    })

})