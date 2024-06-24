
import BasePage from './basePage'
import fs from 'fs'
import {
    appLogo
} from '../pageobjects/productsPage'

import {
    addressInfoTitle,
    firstName,
    lastName,
    address1,
    city,
    state,
    zipCode,
    country,
    homePhone,
    mobilePhone,
    saveButton,
    phoneMandateNote,
    requiredFieldsNote,
    deliveryAddressPane,
    billingAddressPane,
    termsConditions
} from '../pageobjects/myAddressPage'

const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))

class MyAddressPage extends BasePage {
    constructor(page) {
        super(page)
    }

    async verifyLogoVisible() {
        return await this.isElementVisible(appLogo, testData.notVisibleText)
    }

    async addressTitleVisible() {
        return await this.isElementVisible(addressInfoTitle, testData.notVisibleText)
    }

    async verifyInlineInfoNotes() {
        await this.verifyElementText(requiredFieldsNote, testData.requiredFieldsNote)
        return await this.verifyElementText(phoneMandateNote, testData.phoneMandateNote)
    }

    async enterFirstNameLastName(value1, value2) {
        await this.waitAndFill(firstName, value1)
        await this.waitAndFill(lastName, value2)
    }

    async enterAddress1(value) {
        await this.waitAndFill(address1, value)
    }

    async enterCity(value) {
        await this.waitAndFill(city, value)
    }
    async selectState(value) {
        await this.selectValueFromDropdown(state, value);
        await this.page.waitForTimeout(3000)
    }

    async selectCountry(value) {
        await this.selectValueFromDropdown(country, value);
    }

    async enterPostalCode(value) {
        await this.waitAndFill(zipCode, value)
    }

    async enterHomePhone(value) {
        await this.waitAndFill(homePhone, value)
    }

    async enterMobilePhone(value) {
        await this.waitAndFill(mobilePhone, value)
    }

    async clickSaveAddress() {
        await this.waitAndClick(saveButton);
    }

    async validateSuccessfulAddressEntry() {
        await this.isElementVisible(deliveryAddressPane, testData.notVisibleText)
        return await this.isElementVisible(billingAddressPane, testData.notVisibleText)
    }

    async clickCheckoutConfirm() {
        return await this.waitAndClick1()
    }

    async checkTermsConditions() {
        return await this.checkCheckbox(termsConditions)
    }

}
export default MyAddressPage