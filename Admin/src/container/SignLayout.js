/**
 * Horizontal App
 */
 import React, { Component } from 'react';
 import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
 
 // router service
 import routerService from "../services/_routerService";
 
 class SignLayout extends Component {
     render() {
        const { match, location } = this.props;
        console.log(match);
        if (location.pathname === '/signin') {
            return <Redirect to='/signin/signin'/>;
        }
        return (
            <Switch>
                <Route path={`${match.url}/signin`} component={routerService[0].component} />
                <Route path={`${match.url}/signup`} component={routerService[1].component} />
            </Switch>
         );
     }
 }
 
 export default withRouter(SignLayout);
 