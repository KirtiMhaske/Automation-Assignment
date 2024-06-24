import { test as fixture } from '@playwright/test'
import LoginPage from '../pages/loginPage'
import ProductsPage from '../pages/productsPage'
import YourCartPage from '../pages/yourCartPage'
import MyAddressPage from '../pages/myAddressPage'
import PaymentPage from '../pages/paymentPage'
import RegisterUserPage from '../pages/registerUserPage'

const test = fixture.extend({
	registerUserPage: async ({ page }, use) => {
		await use(new RegisterUserPage(page))
	},
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page))
	},
	productsPage: async ({ page }, use) => {
		await use(new ProductsPage(page))
	},
	yourCartPage: async ({page}, use) => {
		await use(new YourCartPage(page))
	},
	myAddressPage: async ({page}, use) => {
		await use(new MyAddressPage(page))
	},
	paymentPage: async ({page}, use) => {
		await use(new PaymentPage(page))
	}
})
export default test