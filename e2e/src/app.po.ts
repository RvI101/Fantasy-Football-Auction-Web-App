import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  navigateToPath(url) {
    return browser.get(url) as Promise<any>;
  }

  clickElement(id) {
    element(by.id(id)).click();
  }

  enterText(id, text) {
    element(by.id(id)).sendKeys(text);
  }

  async createLeague(name) {
    await this.navigateToPath('/leagues');
    this.clickElement('ngb-tab-1');
    this.enterText()
  }
}
