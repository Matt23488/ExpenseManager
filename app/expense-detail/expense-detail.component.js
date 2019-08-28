'use strict';

angular.
    module('expenseDetail').
    component('expenseDetail', {
        templateUrl: 'expense-detail/expense-detail.template.html',
        controller: ['$routeParams', 'Expense',
            function ExpenseDetailController($routeParams, Expense) {
                var self = this;
                self.expense = Expense.get({ expenseId: $routeParams.expenseId });
            }
        ]
    });