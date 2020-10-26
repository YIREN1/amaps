define(['nmodule/amaps/rc/amaps'], function (amaps) {
  'use strict';

  describe("nmodule/amaps/rc/amaps", function () {
    it("can extol its own virtues", function () {
      expect(amaps.extolVirtues()).toBe('amaps is great!');
    });
  });

});