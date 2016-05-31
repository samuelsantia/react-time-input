import React from 'react';
import ReactDOM from 'react-dom';

import DurationInput from '../src';

class Example extends React.Component{

  render() {
    return <DurationInput />;
  }
};

ReactDOM.render(<Example />, document.getElementById('container'));

