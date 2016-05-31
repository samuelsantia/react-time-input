import React from 'react';
import expect from 'expect';
import Utils from 'react-addons-test-utils';

import DurationInput from '../src/index.jsx';

describe('DurationInput', function() {

  it('render without problems', function () {
    const node = Utils.renderIntoDocument(<DurationInput />);
    expect(node).toExist();
  });
})
