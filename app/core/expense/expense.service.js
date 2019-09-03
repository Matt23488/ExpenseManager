'use strict';

angular.
    module('core.expense').
    service('Expense', ['LocalStorage',
        function (LocalStorage) {
            LocalStorage.setPrefix('core.expense$expenses.')

            this.queryAll = function () {
                return LocalStorage.read('') || [];
            };

            this.saveAll = function (expenses) {
                LocalStorage.write('', expenses);
            };

            this.query = function (expenseId) {
                return LocalStorage.read(expenseId);
            };

            this.save = function (expenseId, expense) {
                LocalStorage.write(expenseId, expense);
            };

            this.delete = function (expenseId) {
                LocalStorage.delete(expenseId);
            };

            this.exists = function (expenseId) {
                return LocalStorage.containsKey(expenseId);
            };
        }
    ]);