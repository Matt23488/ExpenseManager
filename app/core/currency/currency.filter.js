'use strict';

angular.
    module('core').
    filter('currency', function () {
        return function (input) {
            if (input < 0) return '($' + (-input).toFixed(2) + ')';
            else return '$' + input.toFixed(2);
        };
    });