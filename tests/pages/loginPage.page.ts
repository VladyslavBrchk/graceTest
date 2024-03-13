import { Locator } from '@playwright/test';
import { Page } from './page';

const loginInput: string = '#login_email'
const passwordInput: string = '#login_password'
const loginButton: string = 'button[type="submit"]'

class LoginPage extends Page {
    constructor(page: import('@playwright/test').Page) {
        super(page);
    }

    async getEmailInput(): Promise<Locator> {
        return await super.getElement(loginInput);
    }

    async getPasswordInput(): Promise<Locator> {
        return await super.getElement(passwordInput);
    }

    async getLoginButton(): Promise<Locator> {
        return await super.getElement(loginButton);
    }

    async enterLogin(text: string): Promise<void> {
        const element = await this.getEmailInput();
        await super.enterText(element, text);
    }    

    async enterPassword(text: string): Promise<void> {
        const element = await this.getPasswordInput();
        await super.enterText(element, text);
    }

    async clickLoginButton(): Promise<void> {
        const element = await this.getLoginButton();
        await super.clickLocator(element);
    }

    async loginWithValidCreds(): Promise<void> {
        await this.enterLogin("qa@grace-technology.io");
        await this.enterPassword("123456");
        await this.clickLoginButton()
    }
}

export { LoginPage };