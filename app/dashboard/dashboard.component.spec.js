'use strict';

describe('dashboard', function () {

    beforeEach(module('dashboard'));

    describe('DashboardController', function () {
        var $httpBackend, ctrl;

        beforeEach(inject(function($componentController, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('expenses/expenses.json')
                        .respond([{ name: 'Electric Bill', id: 'electric-bill' }]);

            ctrl = $componentController('dashboard');
        }));

        it('should create an `expenses` property with 1 expense fetched with `$http`', function () {
            jasmine.addCustomEqualityTester(angular.equals);

            expect(ctrl.expenses).toEqual([]);

            $httpBackend.flush();
            expect(ctrl.expenses).toEqual([{ name: 'Electric Bill', id: 'electric-bill' }]);
        });
    });

});