import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

import propsTesters from './test-helpers/props-testers';

import TimeInput from '../src/index.jsx';
import utils from '../src/utils/utils';
import timeUtils from '../src/utils/time-utils';

const { generatePropTypeTest, generateDefaultPropTest } = propsTesters;

describe('TimeInput', function() {

  it('render without problems', function () {
    const node = TestUtils.renderIntoDocument(<TimeInput />);
    expect(node).toExist();
  });

  describe('propTypes', function () {

    it('should have static member propTypes', function () {
      expect(TimeInput.propTypes).toBeA('object');
    });

    generatePropTypeTest(
      TimeInput,
      'value',
      'InvalidFormat',
      timeUtils.validateTimeProp,
      'Warning: Failed propType: value must be a valid time string or instance of date in component TimeInput'
    );
    generatePropTypeTest(
      TimeInput,
      'defaultValue',
      'InvalidFormat',
      timeUtils.validateTimeProp,
      'Warning: Failed propType: defaultValue must be a valid time string or instance of date in component TimeInput'
    );
    generatePropTypeTest(
      TimeInput,
      'min',
      'InvalidFormat',
      timeUtils.validateTimeProp,
      'Warning: Failed propType: min must be a valid time string or instance of date in component TimeInput'
    );
    generatePropTypeTest(
      TimeInput,
      'max',
      'InvalidFormat',
      timeUtils.validateTimeProp,
      'Warning: Failed propType: max must be a valid time string or instance of date in component TimeInput'
    );
    generatePropTypeTest(
      TimeInput,
      'step',
      'InvalidFormat',
      React.PropTypes.number.isRequired
    );
    generatePropTypeTest(
      TimeInput,
      'onChange',
      'InvalidProp',
      React.PropTypes.func.isRequired
    );
  });

  describe('defaultProps', function () {

    it('should have static member defaultProps', function() {
      expect(TimeInput.defaultProps).toBeA('object');
    });

    generateDefaultPropTest(TimeInput, 'step', 60);
    generateDefaultPropTest(TimeInput, 'onChange', utils.noop);
  });
})
