/**
 * Time utils module
 * @module utils/time-utils
 */

 /** @const {RegExp} time format regex: hh:mm | hh:mm:ss | hh:mm:ss.SSS */
const timeStrPattern = /^(([01]\d|2[0-3]):([0-5]\d:)?([0-5]\d)|([01]\d|2[0-3]):([0-5]\d:)([0-5]\d)(\.\d{3})?)$/;

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
      return new Error(`${propName} must be a valid time string or instance of date in component ${componentName}. Valid time string are in format hh:mm or hh:mm:ss or hh:mm:ss.SSS`);
    }
  },

  /**
   * @typedef SplittedTime
   * @type {Object}
   * @property {number} hours
   * @property {number} minutes
   * @property {number} seconds
   * @property {number} millis
   */
  /**
   * split passed time in object with hours, minutes, seconds and millisseconds
   *
   * @param {?(Date|string)} time to split
   * @return {SplittedTime}
   */
  splitTime(time) {
    if ( typeof time === 'undefined' || time === null ) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        millis: 0
      };
    }
    if ( !_validateTime(time) ) {
      throw new TypeError(`${time} must be a valid time string or instance of date. Valid time string are in format hh:mm or hh:mm:ss or hh:mm:ss.SSS`);
    }

    if ( typeof time === 'string' ) {
      const [
        hours = 0,
        minutes = 0,
        seconds = 0,
        millis = 0
      ] = time.split(/[\.:]/).map(v => parseInt(v));
      return { hours, minutes, seconds, millis };
    } else if ( time instanceof Date ) {
      return {
        hours: time.getHours(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds(),
        millis: time.getMilliseconds()
      };
    }
  }
}

/**
 * validate time format
 *
 * @private
 * @param {(Date|string)} time to test is valid
 * @return {Boolean} true if time has valid format
 */
function _validateTime(time) {
  return (typeof time === 'string' && timeStrPattern.test(time)) || time instanceof Date;
}
