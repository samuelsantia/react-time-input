import expect from 'expect';
import timeUtils from '../../src/utils/time-utils';

import * as fixtures from '../fixtures/utils/time-utils-fixtures';

describe('timeUtils', function () {

  describe('#validateTimeProp method', function () {

    it('should have validateTimeProp method', function () {
      expect(typeof timeUtils.validateTimeProp).toBe('function');
    });

    fixtures.validTimePropsArgs.forEach(function (args) {

      it('should pass with valid arguments', function () {
        const result = timeUtils.validateTimeProp.apply(undefined, args);
        expect(result).toBeA('undefined');
      });
    });

    fixtures.invalidTimePropsArgs.forEach(function (args) {
      let result;

      beforeEach(function () {
        result = timeUtils.validateTimeProp.apply(undefined, args);
      });

      it(`should return Error when pass ${args[2]}`, function() {
        expect(result).toBeA(Error);
      });

      it(`error message should have name prop and component name`, function () {
        expect(result.message).toInclude(args[1]).toInclude(args[2]);
      });
    });
  });
});
