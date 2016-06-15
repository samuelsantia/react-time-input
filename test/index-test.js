import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

import shallowRender from './test-helpers/shallow-render-helper';
import propsTesters from './test-helpers/props-testers';

import TimeInput from '../src/index.jsx';
import utils from '../src/utils/utils';
import timeUtils from '../src/utils/time-utils';

const { generatePropTypeTest, generateDefaultPropTest } = propsTesters;

describe('TimeInput', function() {

  describe('propTypes', function () {

    it('should have static member propTypes', function () {
      expect(TimeInput.propTypes).toBeA('object');
    });

    generatePropTypeTest(
      TimeInput,
      'value',
      'InvalidFormat',
      timeUtils.validateTimeProp,
      'Warning: Failed propType: value must be a valid time string or instance of date in component TimeInput. Valid time string are in format hh:mm or hh:mm:ss or hh:mm:ss.SSS'
    );
    generatePropTypeTest(
      TimeInput,
      'defaultValue',
      'InvalidFormat',
      timeUtils.validateTimeProp,
      'Warning: Failed propType: defaultValue must be a valid time string or instance of date in component TimeInput. Valid time string are in format hh:mm or hh:mm:ss or hh:mm:ss.SSS'
    );
    generatePropTypeTest(
      TimeInput,
      'min',
      'InvalidFormat',
      timeUtils.validateTimeProp,
      'Warning: Failed propType: min must be a valid time string or instance of date in component TimeInput. Valid time string are in format hh:mm or hh:mm:ss or hh:mm:ss.SSS'
    );
    generatePropTypeTest(
      TimeInput,
      'max',
      'InvalidFormat',
      timeUtils.validateTimeProp,
      'Warning: Failed propType: max must be a valid time string or instance of date in component TimeInput. Valid time string are in format hh:mm or hh:mm:ss or hh:mm:ss.SSS'
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
    generatePropTypeTest(
      TimeInput,
      'className',
      0,
      React.PropTypes.string
    );
  });

  describe('defaultProps', function () {

    it('should have static member defaultProps', function() {
      expect(TimeInput.defaultProps).toBeA('object');
    });

    generateDefaultPropTest(TimeInput, 'step', 60);
    generateDefaultPropTest(TimeInput, 'onChange', utils.noop);
  });

  describe('render component', function () {

    it('render without problems', function () {
      const node = TestUtils.renderIntoDocument(<TimeInput />);
      expect(node).toExist();
    });

    it('should render input type text', function () {
      const component = shallowRender(TimeInput);

      expect(component.type).toBe('input');
      expect(component.props.type).toBe('text');
    });

    it('should has the correct className', function () {
      const component = shallowRender(TimeInput);

      expect(component.props.className).toInclude('time-input');
    });

    it('should has custom className when is passed', function () {
      const customClass = 'custom';
      const component = shallowRender(TimeInput, { className: customClass })

      expect(component.props.className).toInclude(customClass);
    });

    it('should has rest of props passed', function () {
      const otherProps = { name: 'name', id: 'id' };
      const component  = shallowRender(TimeInput, otherProps);

      Object.keys(otherProps).forEach(function (key) {
        expect(component.props[key]).toBe(otherProps[key]);
      });
    });

    it('should not have PropTypes props except className', function () {
      const propTypes = TimeInput.propTypes;
      const props = {
        value: '12:23:00',
        defaultValue: '12:23:00',
        min: '00:00:00',
        max: '23:59:59',
        className: 'other'
      };
      const component = shallowRender(TimeInput, props);

      Object.keys(propTypes).forEach(function (key) {
        if ( key !== 'className' )
          expect(component.props[key]).toNotExist(`PropType ${key} exist in renderer component`);
      });
    });
  });
})
