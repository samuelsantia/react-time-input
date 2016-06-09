import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import utils from './utils/utils';
import timeUtils from './utils/time-utils';

const propTypes = {
  /** @prop {(Date|string)} [value] - input value */
  value: timeUtils.validateTimeProp,
  /** @prop {(Date|string)} [defaultValue] - input initial value */
  defaultValue: timeUtils.validateTimeProp,
  /** @prop {number} [step=60] - increment/decrement seconds amount */
  step: PropTypes.number.isRequired,
  /** @prop {(Date|string)} [min] - the min value for the input */
  min: timeUtils.validateTimeProp,
  /** @prop {(Date|string)} [max] - the max value for the input */
  max: timeUtils.validateTimeProp,
  /** @prop {function} [onChange=noop] - called when value change */
  onChange: PropTypes.func.isRequired,
  /** @prop {string} [className] - css component class */
  className: PropTypes.string
};

const defaultProps = {
  step: 60, // 1 minute
  onChange: utils.noop
};

/**
 * TimeInput component
 * @extends React.Component
 */
class TimeInput extends Component {

  /**
   * get input props
   * @return {Object} the renderer input props
   */
  get inputProps() {
    return utils.omit(this.props, Object.keys(propTypes));
  }

  render() {
    const { className } = this.props;
    const inputClassName = cx('time-input', className);

    return (
      <input
        type='text'
        className={inputClassName}
        {...this.inputProps}
      />
    );
  }
}

// STATIC members
/**
 * Component props validations
 * @member {Object} propTypes
 * @static
 */
TimeInput.propTypes = propTypes;

/**
 * Component default props
 * @member {Object} defaultProps
 * @static
 */
TimeInput.defaultProps = defaultProps;

export default TimeInput;
