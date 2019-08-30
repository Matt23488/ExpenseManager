'use strict';

angular.
    module('core.localStorage').
    factory('LocalStorage', function () {
        return {
            isSupported: function () {
                return window.localStorage; // TODO: Probably need a more robust check
            },
            write: function (key, value) {
                window.localStorage.setItem(key, JSON.stringify(value));
            },
            read: function (key) {
                return JSON.parse(window.localStorage.getItem(key));
            },
            delete: function (key) {
                window.localStorage.removeItem(key);
            },
            containsKey: function (key) {
                return typeof window.localStorage.getItem(key) !== 'undefined';
            }
        };
    });