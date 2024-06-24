

import BasePage from './basePage'
import { baseUrl } from '../config'
import fs from 'fs'
import {
    loginPageLogo,
    signIn,
    createNewActHeading,
    emailId,
    createUserBtn,
    firstName,
    lastName,
    password,
    email,
    bDate,
    bMonth,
    bYear,
    registerBtn,
    successMsg,
    alreadyExistError
} from '../pageobjects/registerUserPage'

const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))

class RegisterUserPage extends BasePage {
    constructor(page) {
        super(page)
    }

    async openApp() {
        await super.open(baseUrl)
        return await super.waitForPageLoad()
    }

    async clickcSignIn() {
        await super.waitAndClick(signIn)
        return await super.waitForPageLoad()
    }


    async loginPageLogo() {
        return await this.isElementVisible(loginPageLogo, testData.notVisibleText)
    }

    async registrationHeadingFieldVisible() {
        return await this.isElementVisible(createNewActHeading, testData.notVisibleText)
    }

    async emailFieldVisible() {
        return await this.isElementVisible(emailId, testData.notVisibleText)
    }

    async enterEmailId(value) {
        return await this.waitAndFill(emailId, value)
    }
    async createUserIsEnabled() {
        return await this.isElementEnabled(createUserBtn, testData.notEnabledText)
    }

    async clickCreateAccount() {
        return await this.waitAndClick(createUserBtn)
    }

    async enterFirstLastName(value1, value2) {
        await this.waitAndFill(firstName, value1)
        return await this.waitAndFill(lastName, value2)
    }

    async validateEmailId(value) {
        return await this.verifyElementText(email, value)
    }

    async enterPassword(value) {
        return await this.waitAndFill(password, value)
    }

    async selectBirthDate(value1, value2, value3) {
        await this.selectValueFromDropdown(bDate, value1)
        await this.selectValueFromDropdown(bMonth, value2)
        await this.selectValueFromDropdown(bYear, value3)
    }

    async clickRegister() {
        return await this.waitAndClick(registerBtn)
    }

    async verifyAccountCreationSuccess() {
        return await this.isElementVisible(successMsg, testData.notVisibleText)
    }

    async signedInUserName() {
        const UserName = testData.firstName.concat(' ', testData.lastName)
        return UserName
    }

    async validateNoError() {
        return this.verifyElementText(alreadyExistError, testData.accountAlreadyExistError)
    }

    async signOut() {
        return await this.page.getByTitle('Log me out').click()
    }
}
export default RegisterUserPage