'use strict';

// AngularJS E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Expense Manager', function() {

    it('should redirect `index.html` to `index.html#!/expenses', function () {
        browser.get('index.html');
        expect(browser.getCurrentUrl()).toContain('index.html#!/expenses');
    });

});
