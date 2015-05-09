// spec.js
describe('angularjs homepage', function() {
  it('should have a title', function() {
    browser.get('http://localhost/admin/#/login');

    element(by.model('login.username')).sendKeys('tst');
    element(by.model('login.password')).sendKeys('crow12');

    element(by.id('doLogin')).click();
    expect(browser.getTitle()).toEqual('Admin');
  });
});