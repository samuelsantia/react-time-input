import expect from 'expect';
import utils from '../../src/utils/utils';

describe('utils', function () {

  describe('#noop', function () {

    it('should do nothing', function () {
      expect(utils.noop()).toBe(undefined);
    });
  });

  describe('#omit', function() {

    it('should return empty object if null passed', function () {
      expect(utils.omit()).toEqual({});
    });

    it('should return new coloned object if no omit keys passed', function () {
      const obj = { a: 'a' };
      const result = utils.omit(obj);

      expect(result).toNotBe(obj);
      expect(Object.keys(result)).toInclude('a');
      expect(result.a).toBe(obj.a);
    });

    it('should omit keys passed', function () {
      const obj = { a: 'a', b: 'b' };
      const result = utils.omit(obj, ['a']);

      expect(Object.keys(result)).toNotInclude('a');
      expect(Object.keys(result)).toInclude('b');
      expect(result.b).toBe(obj.b);
    });
  });
});
