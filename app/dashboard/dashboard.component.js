'use strict';

angular.
    module('dashboard').
    component('dashboard', {
        templateUrl: 'dashboard/dashboard.template.html',
        controller: ['Expense',
            function DashboardController(Expense) {
                this.expenses = Expense.query();
            }
        ]
    });