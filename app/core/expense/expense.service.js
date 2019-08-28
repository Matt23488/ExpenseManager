'use strict';

angular.
    module('core.expense').
    factory('Expense', ['$resource',
        function ($resource) {
            return $resource('expenses/:expenseId.json', {}, {
                query: {
                    method: 'GET',
                    params: { expenseId: 'expenses' },
                    isArray: true
                }
            });
        }
    ]);