/*
Scenario : Add products to Cart and Login during the Checkout process

Scenario Description :
1.	Launch browser
2.	Navigate to url ' http://www.automationpractice.pl/index.php'
3.	Verify that home page is visible successfully
4.	Click ‘Sign In’ button
5.	Enter correct email id and password
6.	Verify ' Logged in as username' at top
7.	Click on 'Women' button
8.	Verify user is navigated to ALL PRODUCTS page successfully
9.	Add some products to cart
1.	Click 'Cart' button
10.	Verify that cart page is displayed
11.	Click Proceed To Checkout
12.	Verify Address Details and Review Your Order
13.	Enter description in comment text area and click 'Place Order'
14.	Enter payment details: Bank Wire or Cheque option
15.	Click 'Confirm Order' button
16.	Verify success message 'Your order has been placed successfully!'
17.	verify that Order number present in Order History
18.	Click ‘Sign Out’ button
19.	Verify that you are logged out

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
        productsPage,
        yourCartPage,
        myAddressPage,
        paymentPage
    }) => {
        await test.step(`Open the APP and check logo`, async () => {
            await loginPage.openApp()
        })


        await test.step(
            `Open Women Catalog and select one random product`,
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
                await productsPage.shoppingCartCount()
                await productsPage.shoppingCartLink()
                await productsPage.shoppingCartCount()
            }
        )
        await test.step(
            `Click on shopping cart link and verify user is navigated to Your Cart page`,
            async () => {
                await productsPage.clickShoppingCartLink()
                expect(await yourCartPage.getTitle()).toBe(cartPageTitle)
                expect(await yourCartPage.getUrl()).toBe(yourCartUrl)
            }
        )

        await test.step(
            `Verify all the elements on the Your Cart page and click on Checkout button`,
            async () => {
                await yourCartPage.verifyLogoVisible()
                await yourCartPage.shoppingCartLinkVisible()
                await yourCartPage.shoppingCartCount()
                await yourCartPage.titleVisible()
                await yourCartPage.quantityAndDescriptionLabelVisible()
                await yourCartPage.cartQuantityVisible()
                await yourCartPage.itemNameVisible()
                await yourCartPage.continueShoppingBtnIsEnabled()
                await yourCartPage.removeBtnIsEnabled()
                await yourCartPage.checkoutBtnIsEnabled()
                await yourCartPage.VerifySocialandFooterLinks()
                //await yourCartPage.clickCheckoutBtn()
            }
        )


        await test.step(
            `Check if address already present. If not, Enter your address, valid field values only (Happy Path scenario)`,
            async () => {
                await yourCartPage.clickCheckoutBtn()
                await loginPage.loginAsStandardUser()
            }
        )
        await test.step(
            `Confirm address and Carrier. Proceed to Checkout`,
            async () => {
                await myAddressPage.clickCheckoutConfirm()
                await myAddressPage.checkTermsConditions()
                await myAddressPage.clickCheckoutConfirm()
            }
        )

        await test.step(
            `Verify the Payment Methods Page. Select Payment mode and confirm order.`,
            async () => {
                await paymentPage.paymentPageHeadingVisible()
                await paymentPage.continueShoppingBtnPresent()
                await paymentPage.payByBankWireVisible()
                await paymentPage.payByCheckVisible()
                await paymentPage.paymentPageHeadingVisible()
                await paymentPage.verifyProductName()
                await paymentPage.verifyProductQuantity()
                await paymentPage.selectPayByWire()
                await paymentPage.verifyPaymentMessageWire()
                await paymentPage.confirmOrder()

            }
        )

        await test.step(
            `Validate the order in Order History section `,
            async () => {
                await paymentPage.verifyOrderCompletion()
                const orderNumber = await paymentPage.fetchOrderNumber()
                await paymentPage.orderHistoryLinkVisible()
                const orderPresent = await paymentPage.checkOrderHistory(orderNumber)
                if (orderPresent == true) {
                    console.log("Your order has been placed successfully")
                }
            }
        )

    })


})