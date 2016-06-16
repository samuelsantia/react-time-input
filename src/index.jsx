import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import omit from 'lodash/omit';
import noop from 'lodash/noop';
import timeUtils from './utils/time-utils';

/** @const {Object} propTypes validations */
const propTypes = {
  /** @prop {(Date|string|TimeShape)} [value] - input value */
  value: timeUtils.validateTimeProp,
  /** @prop {(Date|string|TimeShape)} [defaultValue] - input initial value */
  defaultValue: timeUtils.validateTimeProp,
  /** @prop {number} [step=60] - increment/decrement seconds amount */
  step: PropTypes.number.isRequired,
  /** @prop {(Date|string|TimeShape)} [min] - the min value for the input */
  min: timeUtils.validateTimeProp,
  /** @prop {(Date|string|TimeShape)} [max] - the max value for the input */
  max: timeUtils.validateTimeProp,
  /** @prop {function} [onChange=noop] - called when value change */
  onChange: PropTypes.func.isRequired,
  /** @prop {string} [className] - css component class */
  className: PropTypes.string
};

/** @const {Object} defaultProps */
const defaultProps = {
  step: 60, // 1 minute
  onChange: noop
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
    return omit(this.props, Object.keys(propTypes));
  }

  /** render component */
  render() {
    const { className } = this.props;
    const inputClassName = cx('time-input', className);

    return (
      <input
        {...this.inputProps}
        type='text'
        className={inputClassName}
      />
    );
  }
}

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
