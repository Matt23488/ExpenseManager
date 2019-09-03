'use strict';

describe('Expense', function () {
    var Expense, mockLocalStorage;
    var testExpenseDataArr = [
        { name: 'electric', cost: '200' },
        { name: 'cellphone', cost: '190' },
        { name: 'car', cost: '400.07' }
    ];

    beforeEach(module('core.expense'));

    // Set up mock LocalStorage service before injecting the Expense service,
    // as there is state in LocalStorage that Expense manipulates. We need
    // to set up LocalStorage spies before the Expense constructor runs.
    beforeEach(inject(function (LocalStorage) {
        var localStoragePrefix = '';

        spyOn(LocalStorage, 'read').and.callFake(function (key) {
            return mockLocalStorage[localStoragePrefix + key];
        });
        
        spyOn(LocalStorage, 'write').and.callFake(function (key, value) {
            mockLocalStorage[localStoragePrefix + key] = value;
        });

        spyOn(LocalStorage, 'delete').and.callFake(function (key) {
            delete mockLocalStorage[localStoragePrefix + key];
        });

        spyOn(LocalStorage, 'containsKey').and.callFake(function (key) {
            return typeof mockLocalStorage[localStoragePrefix + key] !== 'undefined';
        });

        spyOn(LocalStorage, 'getPrefix').and.callFake(function () {
            return localStoragePrefix;
        });

        spyOn(LocalStorage, 'setPrefix').and.callFake(function (newPrefix) {
            localStoragePrefix = newPrefix;
        });
    }));

    beforeEach(inject(function (_Expense_) {
        Expense = _Expense_;

        jasmine.addCustomEqualityTester(angular.equals);

        mockLocalStorage = {
            'core.expense$expenses.': []
        };

    }));

    it('should be able to query all expenses', function () {
        mockLocalStorage['core.expense$expenses.'] = testExpenseDataArr;

        var result = Expense.queryAll();
        expect(result).toEqual(testExpenseDataArr);
    });
    
    it('should be able to save all expenses', function () {
        Expense.saveAll(testExpenseDataArr);
        expect(mockLocalStorage['core.expense$expenses.']).toEqual(testExpenseDataArr);
    });

    it('should be able to retrieve individual expenses', function () {
        mockLocalStorage['core.expense$expenses.electric'] = testExpenseDataArr[0];

        var result = Expense.query('electric');
        expect(result).toEqual(testExpenseDataArr[0]);
    });

    it('should return `undefined` when an `expenseId` is not found', function () {
        var result = Expense.query('test');
        expect(result).toBeUndefined();
    });

    it('should be able to save expense data persistently', function () {
        var testExpense = {
            name: 'TEST',
            cost: 420.69
        };

        expect(mockLocalStorage['core.expense$expenses.test']).toBeUndefined();
        Expense.save('test', testExpense);
        expect(mockLocalStorage['core.expense$expenses.test']).toEqual(testExpense);
    });

    it('should be able to delete expense data from persistent storage', function () {
        var testExpense = {
            name: 'TEST',
            cost: 420.69
        };

        mockLocalStorage['core.expense$expenses.test'] = testExpense;
        Expense.delete('test');
        expect(mockLocalStorage['core.expense$expenses.test']).toBeUndefined();
    });

    it('should be able to determine if a given expenseId is present', function () {
        mockLocalStorage['core.expense$expenses.electric'] = testExpenseDataArr[0];

        expect(Expense.exists('electric')).toBe(true);
        expect(Expense.exists('water')).toBe(false);
    });
});