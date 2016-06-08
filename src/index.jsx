import React, { Component, PropTypes } from 'react';

import utils from './utils/utils';
import timeUtils from './utils/time-utils';

/**
 * TimeInput component
 * @extends React.Component
 */
class TimeInput extends Component {

  render() {
    return <div>DurationInput</div>;
  }
}

// STATIC members
/**
 * Component props validations
 * @member {Object} propTypes
 * @static
 */
TimeInput.propTypes = {
  /** @prop {(Date|string)} value - input value */
  value: timeUtils.validateTimeProp,
  /** @prop {(Date|string)} defaultValue - input initial value */
  defaultValue: timeUtils.validateTimeProp,
  /** @prop {number} [step=60] - increment/decrement seconds amount */
  step: PropTypes.number.isRequired,
  /** @prop {(Date|string)} min - the min value for the input */
  min: timeUtils.validateTimeProp,
  /** @prop {(Date|string)} max - the max value for the input */
  max: timeUtils.validateTimeProp,
  /** @prop {function} [onChange=noop] - called when value change */
  onChange: PropTypes.func.isRequired
};

/**
 * Component default props
 * @member {Object} defaultProps
 * @static
 */
TimeInput.defaultProps = {
  step: 60,
  onChange: utils.noop
};

export default TimeInput;
