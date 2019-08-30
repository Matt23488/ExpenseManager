'use strict';

angular.
    module('expenseDetail').
    component('expenseDetail', {
        templateUrl: 'expense-detail/expense-detail.template.html',
        controller: ['$routeParams', 'Expense',
            function ExpenseDetailController($routeParams, Expense) {
                var self = this;

                if ($routeParams.expenseId === 'new') self.expense = {};
                else self.expense = Expense.query($routeParams.expenseId);

                // Methods
                self.save = function () {
                    // TODO validation

                    var newExpenseId = self.getExpenseIdForName(self.expense.name);
                    var hasNewName = newExpenseId !== $routeParams.expenseId && $routeParams.expenseId !== 'new';
                    var isNewButSharesName = $routeParams.expenseId === 'new' && Expense.exists(newExpenseId);
                    if (hasNewName || isNewButSharesName) {
                        var prefix = newExpenseId;
                        var suffix = 2;
                        do {
                            newExpenseId = prefix + '-' + suffix;
                            suffix++;
                        } while (Expense.exists(newExpenseId));
                    }

                    Expense.save(newExpenseId, self.expense);

                    if ($routeParams.expenseId !== 'new') {
                        Expense.delete($routeParams.expenseId);
                    }
                };

                self.getExpenseIdForName = function (expenseName) {
                    return expenseName.toLowerCase().replace(/ /g, '-');
                };
            }
        ]
    });