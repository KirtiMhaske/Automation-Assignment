
import BasePage from './basePage'
import fs from 'fs'
import {
    appLogo,
    loginMessage,
    landingPageImage,
    contactUsLink,
    signOutLink,
    shoppingCartLink,
    shoppingCartEmpty,
    footerText,
    socialMediaSection,
    twitterLink,
    facebookLink,
    prestaBlogLink,
    womenCatalogLink,
    listOfElements,
    item1AddToCart,
    availabilityMsg,
    sizes,
    proceedToCheckout,
    cartQuantity,
    searchBox,
    searchSubmitBtn,
    searchProduct
} from '../pageobjects/productsPage'

const testData = JSON.parse(fs.readFileSync(`./data/users.json`, `utf-8`))

class ProductsPage extends BasePage {
    constructor(page) {
        super(page)
    }

    async verifyProductsPageLogoVisible() {
        return await this.isElementVisible(appLogo, testData.notVisibleText)
    }

    async verifyPeekImage() {
        return await this.isElementVisible(
            landingPageImage,
            testData.notVisibleText
        )
    }

    async contactUsLink() {
        return await this.isElementVisible(
            contactUsLink,
            testData.notVisibleText
        )
    }

    async signOutLink() {
        await this.isElementVisible(signOutLink, testData.notVisibleText)
        return await this.waitForPageLoad()
    }

    async clickSignOutLink() {
        return await this.waitAndClick(signOutLink)
    }

    async validateLoginMessage() {
        await this.verifyElementText(loginMessage, testData.loginSuccessMessage)
        return await this.waitForPageLoad()
    }

    async shoppingCartLink() {
        return await this.isElementVisible(
            shoppingCartLink,
            testData.notVisibleText
        )
    }
    async isCartEmpty() {
        const isVisible = await this.page.locator(shoppingCartEmpty).isVisible()
        return isVisible
    }

    async shoppingCartCount() {
        return await this.verifyElementText(
            cartQuantity,
            testData.shoppingCartCount
        )
    }
    async shoppingCartCountAsEmpty() {
        return await this.verifyElementText(
            shoppingCartLink,
            testData.cartCountEmpty
        )
    }

    async footerTextVisible() {
        return await this.isElementVisible(footerText, testData.notVisibleText)
    }

    async VerifySocialandFooterLinks() {
        await this.isElementVisible(footerText, testData.notVisibleText)
        await this.isElementVisible(socialMediaSection, testData.notVisibleText)
        await this.isElementVisible(facebookLink, testData.notVisibleText)
        await this.isElementVisible(twitterLink, testData.notVisibleText)
        await this.isElementVisible(prestaBlogLink, testData.notVisibleText)
    }

    async clickShoppingCartLink() {
        return await this.waitAndClick(shoppingCartLink)
    }

    async verifyWomenCatalogLink() {
        return await this.isElementVisible(
            womenCatalogLink,
            testData.notVisibleText
        )
    }

    async clickWomenCatalogLink() {
        return await this.waitAndClick(womenCatalogLink)
    }
    async selectItemFromTheList() {
        return await this.getSpecifiedElementFromTheList(listOfElements, testData.itemName)
    }
    async clickselectedItem(value) {
        return await this.page.getByText("Blouse", { exact: true }).click()

    }
    async clickselectedItem1() {
        return await this.waitAndHardClick(searchProduct)

    }

    async searchProduct() {
        await this.waitAndFill(searchBox, testData.searchProduct)
        return await this.waitAndHardClick(searchSubmitBtn)
    }

    async getFirstItemFromInventory(value) {
        const firstItem = await this.getFirstElementFromTheList(listOfElements, value)
        return firstItem
    }

    async verifyAddToCartNotEnabled() {
        return await this.isElementNotVisible(item1AddToCart)
    }
    async verifyAddToCartEnabled() {
        return await this.isElementVisible(item1AddToCart, testData.notVisibleText)
    }
    async checkAvailabilityAndAddToCart() {
        const element = await this.page.locator(availabilityMsg)
        const msg = await element.textContent()

        switch (msg) {
            case testData.inStockMsg:
                console.log("In stock");
                await this.page.waitAndClick(item1AddToCart);
                break;
            case testData.outOfStockMsg:
                console.log("Product is Out of stock");
                break;
            case testData.differentAttributeMsg:
                console.log("differentOttribute");
                await this.page.waitForTimeout(3000);
                await this.selectValueFromDropdown(sizes, testData.Medium);
                await this.waitAndClick(item1AddToCart);
                await this.waitAndClick(proceedToCheckout);
                break;
        }
    }
}
export default ProductsPage