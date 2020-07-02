import React, { Component } from 'react';
import EditView from './components/EditView';
import EditComponentList from './components/Edit/EditComponentList';
//import DevTools from 'mobx-react-devtools';
import dotenv from 'dotenv';
import ReactHighcharts from 'react-highcharts';
import 'bootstrap/dist/css/bootstrap.min.css';
dotenv.config();
ReactHighcharts.Highcharts.setOptions({
  time: {
    useUTC: false,
  },
});
class App extends Component {
  componentWillUnmount() {
    alert('APP UNMOUNT');
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <EditComponentList />
        <EditView />
        {/*process.env.NODE_ENV === 'development' && <DevTools />*/}
      </div>
    );
  }
}

export default App;
