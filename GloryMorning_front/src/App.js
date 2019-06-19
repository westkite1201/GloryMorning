import React, { Component } from 'react';

import EditView from './components/EditView'
import EditComponentList from './components/Edit/EditComponentList'
import DevTools from 'mobx-react-devtools';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div style ={{height : '100%'}}>
        <EditComponentList/>
        <EditView/>
        {process.env.NODE_ENV === 'development' && <DevTools />}
      </div>
    );
  }
}

export default App;
