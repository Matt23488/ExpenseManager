'use strict';

angular.
    module('core').
    filter('orZero', function () {
        return function (value) {
            return value || 0;
        };
    });