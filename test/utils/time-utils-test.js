import expect from 'expect';
import { oneLine } from 'common-tags';
import isPlainObject from 'lodash/isPlainObject';

import timeUtils from '../../src/utils/time-utils';

import * as fixtures from '../fixtures/utils/time-utils-fixtures';

describe('timeUtils', function () {

  describe('#validateTimeProp method', function () {

    it('should have validateTimeProp method', function () {
      expect(typeof timeUtils.validateTimeProp).toBe('function');
    });

    fixtures.validTimePropsArgs.forEach(function (args) {

      it(`should pass with valid ${args[2]}`, function () {
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

  describe('#splitTime', function () {

    fixtures.invalidTimePropsArgs.forEach(function (args) {
      const time = args[0].value;
      let fn;

      before(function () {
        fn = timeUtils.splitTime.bind(undefined, time);
      });

      it(`should throws a TypeError with invalid time passed: ${time}`, function () {
        expect(fn).toThrow(TypeError);
      });

      it(`exception should have correct message`, function () {
        expect(fn).toThrow(oneLine`
        ${time} must be a valid time string, instance of date or TimeShape.
        Valid time string are in format hh:mm or hh:mm:ss or hh:mm:ss.SSS.
        Valid time shape is {{
          hours: number,
          minutes: number,
          [seconds]: number,
          [millis]: number
        }}`);
      });
    });

    fixtures.validTimePropsArgs.forEach(function (args) {
      const [ {value:time} ] = args;
      let result;
      let expectation;

      before(function() {
        result = timeUtils.splitTime(time);
        if ( typeof time === 'string' ) {
          const timeUnits = ['hours', 'minutes', 'seconds', 'millis'];

          expectation = time.split(/[\.:]/).map(v => parseInt(v) )
            .reduce((shape, value, i) => {
              shape[timeUnits[i]] = value;
              return shape;
            }, {});
        } else if ( time instanceof Date ) {
          expectation = {
            hours: time.getHours(),
            minutes: time.getMinutes(),
            seconds: time.getSeconds(),
            millis: time.getMilliseconds()
          }
        } else if ( isPlainObject(time) ) {
          expectation = time;
        }
      });

      it(`should split time with valid ${time.constructor.name} ${time}`, function () {
        expect(result).toEqual(expectation);
      });
    });

    it('should return 0 values when no time passed', function () {
      const expectation = { hours: 0, minutes: 0 };
      expect(timeUtils.splitTime()).toEqual(expectation);
    });
  });
});
