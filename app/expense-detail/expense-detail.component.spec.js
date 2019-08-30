'use strict';

describe('expenseDetail', function () {
    
    beforeEach(module('expenseDetail'));

    describe('ExpenseDetailController', function () {
        var $componentController, $routeParams, mockExpenseStore;

        beforeEach(inject(function (_$componentController_, _$routeParams_, Expense) {
            $componentController = _$componentController_;
            $routeParams = _$routeParams_;

            jasmine.addCustomEqualityTester(angular.equals);

            mockExpenseStore = { electric: { name: 'Electric', cost: 200 } };
            spyOn(Expense, 'query').and.callFake(function (expenseId) {
                var existingData = mockExpenseStore[expenseId];
                var returnedData = {};
                Object.assign(returnedData, existingData);
                return returnedData;
            });

            spyOn(Expense, 'save').and.callFake(function (expenseId, expense) {
                mockExpenseStore[expenseId] = {};
                Object.assign(mockExpenseStore[expenseId], expense);
            });

            spyOn(Expense, 'exists').and.callFake(function (expenseId) {
                return typeof mockExpenseStore[expenseId] !== 'undefined';
            });
        }));

        it('should fetch the expense details', function () {
            $routeParams.expenseId = 'electric';
            var ctrl = $componentController('expenseDetail');

            expect(ctrl.expense).toEqual(mockExpenseStore.electric);
        });

        it('should facilitate creation of new expenses', function () {
            $routeParams.expenseId = 'new';
            var ctrl = $componentController('expenseDetail');

            expect(ctrl.expense).toEqual({});
        });

        it('should be able to save edits to expense data', function () {
            $routeParams.expenseId = 'electric';
            var ctrl = $componentController('expenseDetail');

            expect(ctrl.save).toBeDefined();
            expect(typeof ctrl.save).toBe('function');

            expect(mockExpenseStore.electric.cost).toBe(200);
            ctrl.expense.cost = 300;
            ctrl.save();
            expect(mockExpenseStore.electric.cost).toBe(300);
        });

        it('should be able to save new expenses', function () {
            $routeParams.expenseId = 'new';
            var ctrl = $componentController('expenseDetail');

            ctrl.expense.name = 'Test Expense';
            ctrl.save();
            expect(mockExpenseStore['test-expense']).toBeDefined();
            expect(mockExpenseStore['test-expense'].name).toBe('Test Expense');
        });

        it('should properly handle id collisions for new expenses', function () {
            $routeParams.expenseId = 'new';
            var ctrl = $componentController('expenseDetail');

            ctrl.expense.name = 'Electric';
            ctrl.save();
            expect(mockExpenseStore['electric-2']).toBeDefined();
            expect(mockExpenseStore['electric-2'].name).toBe('Electric');
        });

        it('should properly handle id collisions for existing expenses', function () {

        });

        it('should properly manage `expenseId` values', function () {

        });

        it('should define a function `getExpenseIdForName` that will create an `expenseId` value with well-defined rules', function () {
            $routeParams.expenseId = 'new';
            var ctrl = $componentController('expenseDetail');

            expect(ctrl.getExpenseIdForName).toBeDefined();
            expect(typeof ctrl.getExpenseIdForName).toBe('function');

            var name = 'Electric';
            expect(ctrl.getExpenseIdForName(name)).toBe('electric');

            name = 'Cell Phone';
            expect(ctrl.getExpenseIdForName(name)).toBe('cell-phone');
        });
    });

});