import BasePage from './basePage'
import fs from 'fs'
import {
	appLogo,
	shoppingCartLink,
	footerText,
	socialMediaSection,
	twitterLink,
	facebookLink,
	prestaBlogLink
} from '../pageobjects/productsPage'

import {
	title,
	cartQuantityLabel,
	cartDescriptionLabel,
	cartQty,
	cartItemLabel,
	continueShoppingButton,
	removeButton,
	checkoutButton,
	existingAddressPane
} from '../pageobjects/yourCartPage'

const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))

class YourCartPage extends BasePage {
	constructor(page) {
		super(page)
	}

	async verifyLogoVisible() {
		return await this.isElementVisible(appLogo, testData.notVisibleText)
	}

	async shoppingCartLinkVisible() {
		return await this.isElementVisible(
			shoppingCartLink,
			testData.notVisibleText
		)
	}

	async shoppingCartCount() {
		return await this.verifyElementText(
			cartQty,
			testData.cartQty
		)
	}

	async titleVisible() {
		return await this.isElementVisible(title, testData.notVisibleText)
	}

	async quantityAndDescriptionLabelVisible() {
		await this.isElementVisible(cartQuantityLabel, testData.notVisibleText)
		return await this.isElementVisible(
			cartDescriptionLabel,
			testData.notVisibleText
		)
	}

	async cartQuantityVisible() {
		await this.isElementVisible(cartQty, testData.notVisibleText)
		return await this.verifyElementText(cartQty, testData.cartQty)
	}

	async itemNameVisible() {
		return await this.isElementVisible(
			cartItemLabel,
			testData.notVisibleText
		)
	}


	async continueShoppingBtnIsEnabled() {
		return await this.isElementEnabled(
			continueShoppingButton,
			testData.notEnabledText
		)
	}

	async removeBtnIsEnabled() {
		return await this.isElementEnabled(removeButton, testData.notEnabledText)
	}

	async checkoutBtnIsEnabled() {
		return await this.isElementEnabled(checkoutButton, testData.notEnabledText)
	}

	async VerifySocialandFooterLinks() {
		await this.isElementVisible(footerText, testData.notVisibleText)
		await this.isElementVisible(socialMediaSection, testData.notVisibleText)
		await this.isElementVisible(facebookLink, testData.notVisibleText)
		await this.isElementVisible(twitterLink, testData.notVisibleText)
		await this.isElementVisible(prestaBlogLink, testData.notVisibleText)
	}

	async existingAddressPresent() {

		try {
			const isVisible = await this.page.locator(existingAddressPane).isVisible()
			console.log("isVisible:" + isVisible)
			return isVisible
		} catch (error) {
			throw new Error('false')
		}
	}

	async clickContinueShoppingBtn() {
		return await this.waitAndClick(continueShoppingButton)
	}

	async clickCheckoutBtn() {
		return await this.waitAndClick(checkoutButton)
	}

	async clickRemoveBtnForItems() {
		await this.waitAndClick(removeButton)
		return await this.waitAndClick(removeButtonTshirtRed)
	}

	async cartItemAndQuantityLabelNotVisible() {
		await this.isElementNotVisible(cartQuantityLabel, testData.notAvailabletext)
		await this.isElementNotVisible(cartItemLabel, testData.notAvailabletext)
	}
}
export default YourCartPage
