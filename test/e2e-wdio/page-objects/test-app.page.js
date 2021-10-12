import assert from 'assert';
import { waitForLoad } from '../util/waitUtil';

const { WIDGET_TEST_SERVER } = process.env;

class TestAppPage {
  get widget() { return $('#okta-sign-in'); }
  get configEditor() { return $('#config-editor'); }
  get tokens() { return $('#tokens-container'); }
  get code() { return $('#code-container'); }
  get cspErrors() { return $('#csp-errors-container'); }
  get oidcError() { return $('#oidc-error-container'); }

  // widget general elements
  get widgetTitle() { return $('[data-se="o-form-head"]'); }
  get submit() { return $('[data-type="save"]'); }

  // actions
  get startButton() { return $('button[name="start"]'); }
  get hideButton() { return $('button[name="hide"]'); }
  get showButton() { return $('button[name="show"]'); }
  get removeButton() { return $('button[name="remove"]'); }
  get showSignInAndRedirect() { return $('button[name="showSignInAndRedirect"]'); }
  get showSignInToGetTokens() { return $('button[name="showSignInToGetTokens"]'); }
  get startWithRenderEl() { return $('button[name="renderEl"]'); }
  get triggerCspFail() { return $('button[name="fail-csp"]'); }

  
  async open(path = '') {
    return browser.url(`http://localhost:3000/${path}`);
  }

  async ssoLogout() {
    await browser.url(`${WIDGET_TEST_SERVER}/login/signout`);
  }

  async setConfig(config) {
    await this.configEditor.then(el => el.setValue(JSON.stringify(config)));
  }

  async getCspErrors() {
    return this.cspErrors.then(el => el.getText());
  }

  async getOIDCError() {
    return this.oidcError.then(el => el.getText());
  }

  async assertOIDCError(expectedError) {
    await waitForLoad(this.oidcError);
    await this.oidcError.then(el => el.getText()).then(txt => {
      assert(txt === expectedError);
    });
  }

  async assertIDToken(username) {
    await waitForLoad(this.tokens);
    await this.tokens.then(el => el.getText()).then(txt => {
      assert(txt.includes('idToken'));
      assert(txt.includes(`"name": "${username}"`));
    });
  }

  async assertAccessToken() {
    await waitForLoad(this.tokens);
    await this.tokens.then(el => el.getText()).then(txt => {
      assert(txt.includes('accessToken'));
      assert(txt.includes('"tokenType": "Bearer"'));
    });
  }

  async assertCode() {
    await waitForLoad(this.code);
    await this.code.then(el => el.getText()).then(txt => {
      assert(txt.length > 0);
    });
  }
}

export default new TestAppPage();
