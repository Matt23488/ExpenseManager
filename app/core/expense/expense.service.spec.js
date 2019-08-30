'use strict';

describe('Expense', function () {
    var Expense, mockLocalStorage;
    var testExpenseDataArr = [
        { name: 'electric', cost: '200' },
        { name: 'cellphone', cost: '190' },
        { name: 'car', cost: '400.07' }
    ];

    beforeEach(module('core.expense'));

    beforeEach(inject(function (_Expense_, LocalStorage) {
        Expense = _Expense_;

        jasmine.addCustomEqualityTester(angular.equals);

        mockLocalStorage = {
            'core.expense$expenses': []
        };
        spyOn(LocalStorage, 'read').and.callFake(function (key) {
            return mockLocalStorage[key];
        });
        
        spyOn(LocalStorage, 'write').and.callFake(function (key, value) {
            mockLocalStorage[key] = value;
        });

        spyOn(LocalStorage, 'delete').and.callFake(function (key) {
            delete mockLocalStorage[key];
        });

        spyOn(LocalStorage, 'containsKey').and.callFake(function (key) {
            return typeof mockLocalStorage[key] !== 'undefined';
        });
    }));

    it('should be able to query all expenses', function () {
        mockLocalStorage['core.expense$expenses'] = testExpenseDataArr;

        var result = Expense.queryAll();
        expect(result).toEqual(testExpenseDataArr);
    });
    
    it('should be able to save all expenses', function () {
        Expense.saveAll(testExpenseDataArr);
        expect(mockLocalStorage['core.expense$expenses']).toEqual(testExpenseDataArr);
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

    // TODO: save()

    // TODO: delete()

    it('should be able to determine if a given expenseId is present', function () {
        mockLocalStorage['core.expense$expenses.electric'] = testExpenseDataArr[0];

        expect(Expense.exists('electric')).toBe(true);
        expect(Expense.exists('water')).toBe(false);
    });
});