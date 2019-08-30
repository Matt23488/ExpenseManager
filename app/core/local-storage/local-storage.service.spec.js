'use strict';

describe('LocalStorage', function () {
    var LocalStorage, mockStore;

    beforeEach(function () {
        jasmine.addCustomEqualityTester(angular.equals);

        mockStore = {};
        spyOn(localStorage, 'getItem').and.callFake(function (key) {
            return mockStore[key];
        });

        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            mockStore[key] = value + '';
        });

        spyOn(localStorage, 'removeItem').and.callFake(function (key) {
            delete mockStore[key];
        });
    });

    beforeEach(module('core.localStorage'));

    beforeEach(inject(function (_LocalStorage_) {
        LocalStorage = _LocalStorage_;
    }));

    it('should be able to save items to localStorage', function () {
        LocalStorage.write('testString', 'testValue');
        expect(mockStore).toEqual({ testString: '"testValue"' });

        mockStore = {};
        LocalStorage.write('testObj', { someProp: 3 });
        expect(mockStore).toEqual({ testObj: '{"someProp":3}' });

        mockStore = {};
        LocalStorage.write('testFunc', function () { alert('test'); });
        expect(mockStore).toEqual({ testFunc: 'undefined' });

        mockStore = {};
        LocalStorage.write('testArr', [1, 2, '3']);
        expect(mockStore).toEqual({ testArr: '[1,2,"3"]'});
    });

    it('should be able to read items from localStorage', function () {
        mockStore = {
            testString: '"testValue"',
            testObj: '{"someProp":3}',
            testArr: '[1,2,"3"]'
        };

        var result;

        result = LocalStorage.read('testString');
        expect(result).toBe('testValue');

        result = LocalStorage.read('testObj');
        expect(result).toEqual({ someProp: 3 });

        result = LocalStorage.read('testArr');
        expect(result).toEqual([1, 2, '3']);
    });

    it('should be able to remove items from localStorage', function () {
        mockStore = {
            testString: '"testValue"',
            testObj: '{"someProp":3}',
            testArr: '[1,2,"3"]'
        };

        LocalStorage.delete('testString');
        expect(mockStore.testString).toBeUndefined();
        expect(mockStore.testObj).toBe('{"someProp":3}');
        expect(mockStore.testArr).toEqual('[1,2,"3"]');

        LocalStorage.delete('testObj');
        expect(mockStore.testString).toBeUndefined();
        expect(mockStore.testObj).toBeUndefined();
        expect(mockStore.testArr).toEqual('[1,2,"3"]');

        LocalStorage.delete('testArr');
        expect(mockStore.testString).toBeUndefined();
        expect(mockStore.testObj).toBeUndefined();
        expect(mockStore.testArr).toBeUndefined();
    });

    it('should be able to test if a given key is present', function () {
        mockStore = {
            testString: '"testValue"'
        };

        expect(LocalStorage.containsKey('testString')).toBe(true);
        expect(LocalStorage.containsKey('testObj')).toBe(false);
    });
});