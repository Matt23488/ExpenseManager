'use strict';

describe('orZero', function () {

    beforeEach(module('core'));

    it('should convert falsy values to the number `0`',
        inject(function (orZeroFilter) {
            expect(orZeroFilter()).toBe(0);
            expect(orZeroFilter('testValue')).toBe('testValue');
            expect(orZeroFilter(true)).toBe(true);
            expect(orZeroFilter({})).toEqual({});
            expect(orZeroFilter(false)).toBe(0);
            expect(orZeroFilter(-1)).toBe(-1);
        })
    );

});