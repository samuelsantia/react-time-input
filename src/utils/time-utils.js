/**
 * Time utils module
 * @module utils/time-utils
 */
const timeStrPattern = /^(\d{2}:){0,2}(\d{2})(\.\d+)?$/;

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

    if ( timeProp
      && (( typeof timeProp === 'string' && !timeStrPattern.test(timeProp) )
      || ( typeof timeProp !== 'string' && !(timeProp instanceof Date) ))
    ) {
      return new Error(`${propName} must be a valid time string or instance of date in component ${componentName}`);
    }
  }
}
