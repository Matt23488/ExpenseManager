'use strict';

describe('dashboard', function () {

    beforeEach(module('dashboard'));

    describe('DashboardController', function () {
        var $httpBackend, ctrl;
        var baseDateTime = new Date(1989, 7, 18);
        var mockExpenseData = [
            { "id": "coming-up-test",  "name": "Coming Up Test",  "day": 23, "cost": 100.01 },
            { "id": "today-test",      "name": "Today Test",      "day": 18, "cost": 20.2   },
            { "id": "next-month-test", "name": "Next Month Test", "day": 5,  "cost": 3      }
        ];

        beforeEach(inject(function($componentController, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('expenses/expenses.json')
                        .respond(mockExpenseData);

            ctrl = $componentController('dashboard');

            jasmine.clock().install();
            jasmine.clock().mockDate(baseDateTime);
        }));

        afterEach(inject(function () {
            jasmine.clock().uninstall();
        }));

        it('should create an `expenses` property with 1 expense fetched with `$http`', function () {
            jasmine.addCustomEqualityTester(angular.equals);

            expect(ctrl.expenses).toEqual([]);

            $httpBackend.flush();
            expect(ctrl.expenses).toEqual(mockExpenseData);
        });

        it('should create a `getDaysLeft` method that returns a string explaining the next bill due date', function () {
            expect(ctrl.getDaysLeft).toBeDefined();
            expect(typeof ctrl.getDaysLeft).toBe('function');

            $httpBackend.flush();
            expect(ctrl.getDaysLeft(mockExpenseData[0].day)).toBe('due in 5 days');
            expect(ctrl.getDaysLeft(mockExpenseData[1].day)).toBe('due today');
            expect(ctrl.getDaysLeft(mockExpenseData[2].day)).toBe('due in 18 days');
        });

        it('should create a `totalExpenses` method that returns the sum of the `cost` field from each member of the `expenses` array', function () {
            expect(ctrl.totalExpenses).toBeDefined();
            expect(typeof ctrl.totalExpenses).toBe('function');

            $httpBackend.flush();
            expect(ctrl.totalExpenses()).toBeCloseTo(123.21, 2);
        });
    });

});