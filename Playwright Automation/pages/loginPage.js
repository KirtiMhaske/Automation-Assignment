import BasePage from './basePage'
import { baseUrl } from '../config'
import fs from 'fs'

import {
	loginPageLogo,
	username,
	password,
	loginButton,
	signIn,
	RegistrationHeading,
	AlreadyRegistered,
	forgotPassword
} from '../pageobjects/loginPage'


const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))

class LoginPage extends BasePage {
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

	async RegistrationHeadingFieldVisible() {
		return await this.isElementVisible(RegistrationHeading, testData.notVisibleText)
	}

	async AlreadyRegisteredFieldVisible() {
		return await this.isElementVisible(AlreadyRegistered, testData.notVisibleText)
	}

	async usernameFieldVisible() {
		return await this.isElementVisible(username, testData.notVisibleText)
	}

	async passwordFieldVisible() {
		return await this.isElementVisible(password, testData.notVisibleText)
	}

	async loginButtonIsEnabled() {
		return await this.isElementEnabled(loginButton, testData.notEnabledText)
	}

	async forgotPasswordVisible() {
		return await this.isElementVisible(forgotPassword, testData.notVisibleText)
	}


	async loginAsStandardUser() {
		await this.waitAndFill(username, testData.standard_user)
		await this.waitAndFill(password, testData.password)
		await this.waitAndClick(loginButton)
	}

	async verifyErrorMessage() {
		return await this.isElementVisible(errorMessage, testData.notVisibleText)
	}


}
export default LoginPage
