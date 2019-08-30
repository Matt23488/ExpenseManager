'use strict';

angular.
    module('core.expense').
    factory('Expense', ['LocalStorage',
        function (LocalStorage) {
            return {
                queryAll: function () {
                    return LocalStorage.read('core.expense$expenses') || [];
                },
                saveAll: function (expenses) {
                    LocalStorage.write('core.expense$expenses', expenses);
                },
                query: function (expenseId) {
                    return LocalStorage.read('core.expense$expenses.' + expenseId);
                },
                save: function (expenseId, expense) {
                    // TODO
                },
                delete: function (expenseId) {
                    // TODO
                },
                exists: function (expenseId) {
                    return LocalStorage.containsKey('core.expense$expenses.' + expenseId);
                }
            };
        }
    ]);