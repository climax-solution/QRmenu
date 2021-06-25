/**
 * Horizontal App
 */
 import React, { Component } from 'react';
 import { Route, withRouter, Redirect } from 'react-router-dom';
 
 // router service
 import routerService from "../services/_routerService";
 
 class LoginLayout extends Component {
     render() {
         const { match, location } = this.props;
        console.log(routerService);
         return (
            <Route path='/login' component={routerService[0].component} />
         );
     }
 }
 
 export default withRouter(LoginLayout);
 