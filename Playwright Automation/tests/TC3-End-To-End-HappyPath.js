/*
Scenario : End-To-End Test - Login as an existing user to complete the checkout workflow 

Scenario Description :
1.	Launch browser
2.	Navigate to url ' http://www.automationpractice.pl/index.php'
3.	Verify that home page is visible successfully
4.	Click on 'Women' category 
5.	Verify user is navigated to ALL PRODUCTS page successfully
6.	Enter product name in search input and click search button
7.	Verify 'SEARCHED PRODUCTS' is visible
8.	Verify all the products related to search are visible
9.	Add those products to cart
10.	Click 'Proceed to checkout’
11.	Enter New address details and click Checkout
12.	Verify that 2 Payment modes are displayed – Bank Wire and Cheque
13.	Select one of the2 modes and proceed to checkout
14.	Confirm the order
15.	Verify that the order is placed successfully
16. Also verify the Order Hitory table fornewly created order
17. Click Sign out to log out
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
            await loginPage.clickcSignIn()
            await loginPage.loginPageLogo()
            expect(await loginPage.getTitle()).toBe(title)
            expect(await loginPage.getUrl()).toContain(baseUrl)
        })

        await test.step(`Login as an existing user`, async () => {
            await loginPage.loginAsStandardUser()
        })

        await test.step(`Verify Products landing page Message + title + url visible`, async () => {
            await productsPage.validateLoginMessage()
            expect.soft(await productsPage.getTitle()).toBe(ProductPageTitle)
            expect(await productsPage.getUrl()).toContain(productUrl)
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
            }
        )


        await test.step(
            `Check if address already present. If not, Enter your address, valid field values only (Happy Path scenario)`,
            async () => {
                const addressPresent = await yourCartPage.existingAddressPresent()
                await yourCartPage.clickCheckoutBtn()
                if (addressPresent == 'false') {
                    await myAddressPage.verifyLogoVisible()
                    await myAddressPage.addressTitleVisible()
                    await myAddressPage.verifyInlineInfoNotes()
                    await myAddressPage.enterFirstNameLastName(testData.firstName, testData.lastName)
                    await myAddressPage.enterAddress1(testData.address1)
                    await myAddressPage.enterCity(testData.city)
                    await myAddressPage.selectCountry(testData.country)
                    await myAddressPage.selectState(testData.state)
                    await myAddressPage.enterPostalCode(testData.zipCode)
                    await myAddressPage.enterHomePhone(testData.homePhone)
                    await myAddressPage.enterMobilePhone(testData.mobilePhone)
                    await myAddressPage.clickSaveAddress()
                    await myAddressPage.validateSuccessfulAddressEntry()
                }

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