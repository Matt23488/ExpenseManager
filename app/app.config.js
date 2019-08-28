'use strict';

angular.
    module('expenseManager').
    config(['$routeProvider',
        function config($routeProvider) {
            $routeProvider.
                when('/expenses', {
                    template: '<dashboard></dashboard>'
                }).
                when('/expenses/:expenseId', {
                    template: '<expense-detail></expense-detail>'
                }).
                otherwise('/expenses');
        }
    ]);