import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from "../layouts/DashBoard";

class App extends Component {
    state ={
        
    }
    componentDidMount(){
//    window.RainyDay({ image: 'background', gravityAngleVariance: 0,fps: 100, gravityThreshold: 2});
    
    }
    

    render() {
        const script = document.createElement("script");
        script.src = "./rainyday.js";
        script.async = true;
        document.body.appendChild(script);
       
        return (
            <div>
                {/*<div id ='background'>dsdsad</div>*/}
                {/*<Route exact path="/login" component={Login}/>*/}
                {/*<Route path="/board" component={SideNav}/>*/}
                <Route path="/" component ={Dashboard}/>
            </div>
        );  
    }
}

export default App;