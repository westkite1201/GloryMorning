import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../layouts/DashBoard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  loadTextures,
  init,
  changeWeatherToOnClick,
} from '../lib/rain/lib/src/main.js';
class App extends Component {
  state = {};
  componentDidMount() {
    //loadTextures();
    //    window.RainyDay({ image: 'background', gravityAngleVariance: 0,fps: 100, gravityThreshold: 2});
  }

  render() {
    // const script = document.createElement("script");
    // script.src = "./rainyday.js";
    // script.async = true;
    // document.body.appendChild(script);

    return (
      <div style={{ height: '100%' }}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        {/*<div id ='background'>dsdsad</div>*/}
        {/*<Route exact path="/login" component={Login}/>*/}
        {/*<Route path="/board" component={SideNav}/>*/}
        <Route path="/" component={Dashboard} />
      </div>
    );
  }
}

export default App;
