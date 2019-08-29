'use strict';

angular.
    module('dashboard').
    component('dashboard', {
        templateUrl: 'dashboard/dashboard.template.html',
        controller: ['Expense',
            function DashboardController(Expense) {
                var self = this;

                self.expenses = Expense.query();
                self.getDaysLeft = function (day) {
                    var now = new Date();
                    var daysLeft = day - now.getDate();
                    if (daysLeft > 0) {
                        return 'due in ' + daysLeft + ' days';
                    } else if (daysLeft === 0) {
                        return 'due today';
                    } else {
                        // Add a month's worth of days to `now` and then do the calculation again
                        var year = now.getFullYear();
                        var month = now.getMonth() + 1;
                        if (month > 12) {
                            month -= 12;
                            year++;
                        }
                        var nextDueDate = new Date(year, month, day);
                        
                        daysLeft = (nextDueDate - new Date(now.getFullYear(), now.getMonth(), now.getDate()))/(1000*60*60*24);
                        return 'due in ' + daysLeft + ' days';
                    }
                };

                self.totalExpenses = function () {
                    var sum = 0;
                    for (var i = 0; i < self.expenses.length; i++) {
                        sum += self.expenses[i].cost;
                    }
                    return sum;
                };
            }
        ]
    });