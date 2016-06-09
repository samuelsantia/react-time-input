/**
 * general utils
 * @module utils/utils
 */
export default {
  /** empty function */
  noop() {},
  /**
   * returns object without passed keys
   *
   * @param {object} object - The source object
   * @param {string[]} [keys=[]] - the keys to omit
   * @return {Object} the omitted keys object
   */
  omit(object, keys = []) {
    if ( typeof object === 'undefined' || object === null ) return {};

    const obj = {};
    Object.keys(object)
      .filter(key => keys.indexOf(key) === -1 )
      .forEach(key => {
        obj[key] = object[key];
      });

    return obj;
  }
};
