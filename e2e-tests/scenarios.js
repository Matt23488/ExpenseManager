'use strict';

// AngularJS E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Expense Manager', function() {

    it('should redirect `index.html` to `index.html#!/expenses', function () {
        browser.get('index.html');
        expect(browser.getCurrentUrl()).toContain('index.html#!/expenses');
    });

    // Dashboard
    describe('Dashboard', function () {

        beforeEach(function () {
            browser.get('index.html#!/expenses');
        });

        it('should have a link that kicks off a new expense', function () {
            var link = element(by.id('newExpenseLink'));
            link.click();
            expect(browser.getCurrentUrl()).toContain('index.html#!/expenses/new');
        });

    });

});
