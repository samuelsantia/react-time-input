import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

import TimeInput from '../src/index.jsx';

describe('TimeInput', function() {

  it('render without problems', function () {
    const node = TestUtils.renderIntoDocument(<TimeInput />);
    expect(node).toExist();
  });
})
