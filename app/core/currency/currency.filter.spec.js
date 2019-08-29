'use strict';

describe('currency', function () {

    beforeEach(module('core'));

    it('should convert a number to a currency string',
        inject(function (currencyFilter) {
            expect(currencyFilter(12)).toBe('$12.00');
            expect(currencyFilter(-12)).toBe('($12.00)');
        })
    );

});