//@ts-check
import BasePage from './basePage'
import fs from 'fs'

import {
    paymentPageHeading,
    continueShopping,
    payByBankWire,
    payByCheck,
    productName,
    prodQuantity,
    paymentMethodMessage,
    confirmOrderBtn,
    orderSuccessMessage,
    orderHistoryLink,
    orderNumberBox
} from '../pageobjects/paymentPage'

const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))

class PaymentPage extends BasePage {
    constructor(page) {
        super(page)
    }

    async paymentPageHeadingVisible() {
        return await this.isElementVisible(paymentPageHeading, testData.notVisibleText)
    }

    async continueShoppingBtnPresent() {
        return await this.isElementVisible(continueShopping, testData.notVisibleText)
    }

    async payByBankWireVisible() {
        return await this.isElementVisible(payByBankWire, testData.notVisibleText)
    }

    async payByCheckVisible() {
        return await this.isElementVisible(payByCheck, testData.notVisibleText)
    }

    async verifyProductName() {
        return await this.verifyElementText(productName, testData.itemName)
    }

    async verifyProductQuantity() {
        return await this.verifyElementText(prodQuantity, testData.shoppingCartCount)
    }

    async selectPayByWire() {
        return await this.waitAndClick(payByBankWire);
    }

    async selectPayByCheck() {
        return await this.waitAndClick(payByCheck);
    }

    async verifyPaymentMessageWire() {
        return await this.verifyElementText(paymentMethodMessage, testData.paymentMethodMessageWire)
    }

    async verifyPaymentMessageCheck() {
        return await this.verifyElementText(paymentMethodMessage, testData.paymentMethodMessageCheck)
    }

    async confirmOrder() {
        return await this.waitAndClick(confirmOrderBtn);
    }
    async verifyOrderCompletion() {
        return await this.verifyElementContainsText(orderSuccessMessage, testData.orderSuccessMessage)
    }

    async orderHistoryLinkVisible() {
        return await this.isElementVisible(orderHistoryLink, testData.notVisibleText)
    }

    async checkOrderHistory(orderNumber) {
        await this.waitAndClick(orderHistoryLink)
        return this.page.getByRole("link", { name: orderNumber }).isVisible()
    }
    async fetchOrderNumber() {
        const textValue = await this.page.textContent(orderNumberBox)
        const orderLines = textValue.split("\n")
        const orderNumber = orderLines[6].slice(52, 61);
        return orderNumber
    }


}
export default PaymentPage