import { oneLine } from 'common-tags';
import isPlainObject from 'lodash/isPlainObject';

/**
 * Time utils module
 * @module utils/time-utils
 */

/** @const {Array<string>} time units */
const timeUnits = ['hours', 'minutes', 'seconds', 'millis'];

 /** @const {RegExp} time format regex: hh:mm | hh:mm:ss | hh:mm:ss.SSS */
const timeStrPattern = /^(([01]\d|2[0-3]):([0-5]\d:)?([0-5]\d)|([01]\d|2[0-3]):([0-5]\d:)([0-5]\d)(\.\d{3})?)$/;

/**
 * @typedef TimeShape
 * @type {Object}
 * @property {number} hours
 * @property {number} minutes
 * @property {number} [seconds]
 * @property {number} [millis]
 */

export default {

  /**
   * validates if prop is valid time
   * used with react propTypes
   *
   * @param {object} props - component props
   * @param {string} propName - name of prop to test
   * @param {string} componentName - React component name
   * @return {Error} if the prop is invalid
   */
  validateTimeProp(props, propName, componentName) {
    const timeProp = props[propName];

    if ( timeProp && !_validateTime(timeProp) ) {
      return new Error(oneLine`${propName} must be a valid time string,
        instance of date or TimeShape in component ${componentName}.
        Valid time string are in format hh:mm or hh:mm:ss or hh:mm:ss.SSS.
        Valid time shape is {{
          hours: number,
          minutes: number,
          [seconds]: number,
          [millis]: number
      }}`);
    }
  },

  /**
   * split passed time in object with hours, minutes, seconds and millisseconds
   *
   * @trhows {TypeError} Argument time is not a TimeShape
   * @param {(Date|string|TimeShape)} [time={ hours: 0, minutes: 0 }] - to split
   * @return {TimeShape}
   */
  splitTime(time = { hours: 0, minutes: 0 }) {
    if ( !_validateTime(time) ) {
      throw new TypeError(oneLine`
      ${time} must be a valid time string, instance of date or TimeShape.
      Valid time string are in format hh:mm or hh:mm:ss or hh:mm:ss.SSS.
      Valid time shape is {{
        hours: number,
        minutes: number,
        [seconds]: number,
        [millis]: number
      }}`);
    }

    if ( typeof time === 'string' ) {
      return time.split(/[\.:]/).map(v => parseInt(v))
        .reduce((shape, value, i) => {
          shape[timeUnits[i]] = value;
          return shape;
        }, {});
    } else if ( time instanceof Date ) {
      return {
        hours: time.getHours(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds(),
        millis: time.getMilliseconds()
      };
    }

    return time;
  }
}

/**
 * validate time prop
 *
 * @private
 * @param {*} time - to test if is valid
 * @return {Boolean} true if time is valid prop
 */
function _validateTime(time) {
  return _validateTimeString(time) ||
         _validateTimeShape(time) ||
         time instanceof Date;
}

/**
 * validate time string format
 *
 * @private
 * @param {*} time - to test if is string in valid format
 * @return {Boolean} true if is valid string format
 */
function _validateTimeString(time) {
  return typeof time === 'string' && timeStrPattern.test(time);
}

/**
 * validates time shape object
 *
 * @private
 * @param {*} time - to test if is time shape object
 * @return {Boolean} true if is valid time shape object
 */
function _validateTimeShape(time) {
  if ( !isPlainObject(time) ) return false;

  const keys = Object.keys(time);

  return keys.indexOf('hours') !== -1 && keys.indexOf('minutes') !== -1 &&
    keys.every(_validateTimeUnit.bind(undefined, time));
}

/**
 * validate unit in time shape
 *
 * @private
 * @param {Object} time - to test unit
 * @param {string} unit - to test
 * @return {Boolean} if time unit is valid
 */
function _validateTimeUnit(time, unit) {
  const value = time[unit];
  if ( typeof value !== 'number' ) return false;

  switch(unit) {
    case 'hours':
      return value >= 0 && value <= 23;
    case 'minutes':
    case 'seconds':
      return value >= 0 && value <= 59;
    case 'millis':
      return value >= 0 && value <= 999;
    default:
      return false;
  }
}
