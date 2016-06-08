import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

/**
 * React component props testers generator
 * @module test-helpers/props-testers
 */
export default {
  /**
   * generate mocha defaults tests to test React.Component.propTypes
   *
   * @param {React.Component} Component - Component to render for test
   * @param {string} prop - Prop to test
   * @param {*} invalidValue - Invalid prop value to test that throws error
   * @param {function} validator - PropType validator
   * @param {string} [errorMessage] - error message throwed when is invalid
   */
  generatePropTypeTest(Component, prop, invalidValue, validator, errorMessage) {

    describe(`#${prop}`, function () {

      it(`should have ${prop} validator propType`, function () {
        const propType = Component.propTypes[prop];

        expect(propType).toExist();
        expect(propType).toBe(validator);
      });

      it(`throws an error if ${prop} input has invalid format`, function () {
        const spy = expect.spyOn(console, 'error');
        const instance = React.createElement(Component, { [prop]: invalidValue });
        TestUtils.renderIntoDocument(instance);

        expect(spy).toHaveBeenCalled();
        if ( errorMessage ) expect(spy).toHaveBeenCalledWith(errorMessage);
        spy.restore();
      });
    });
  },

  /**
   * generate mocha defaults tests to test React.Component.defaultProps
   *
   * @param {React.Component} Component - Component to render for test
   * @param {string} prop - Prop to test
   * @param {*} defaultValue - value that component should have by default
   */
  generateDefaultPropTest(Component, prop, defaultValue) {

    describe(`#${prop}`, function () {

      it(`should have ${prop} default value`, function () {
        const _prop = Component.defaultProps[prop];
        expect(_prop).toExist();
        expect(_prop).toBe(defaultValue);
      });

      it(`should have default prop on react instance`, function () {
        const instance = React.createElement(Component);

        expect(instance.props[prop]).toBe(defaultValue);
      });
    });
  }
};
