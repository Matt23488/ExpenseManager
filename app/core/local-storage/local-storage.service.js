'use strict';

angular.
    module('core.localStorage').
    service('LocalStorage', function () {
        var prefix = '';

        this.isSupported = function () {
            return window.localStorage; // TODO: Probably need a more robust check
        };

        this.write = function (key, value) {
            window.localStorage.setItem(prefix + key, JSON.stringify(value));
        };

        this.read = function (key) {
            return JSON.parse(window.localStorage.getItem(prefix + key));
        };

        this.delete = function (key) {
            window.localStorage.removeItem(prefix + key);
        };

        this.containsKey = function (key) {
            return typeof window.localStorage.getItem(prefix + key) !== 'undefined';
        };

        this.getPrefix = function () {
            return prefix;
        };

        this.setPrefix = function (newPrefix) {
            prefix = newPrefix;
        };
    });