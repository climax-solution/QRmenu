/**
 * Dasboard Routes
 */
 import React from 'react';
 import { Redirect, Route, Switch } from 'react-router-dom';
 
 // async components
 import {
    AsyncComponentAddNewRestaurantComponent,
    AsyncComponentRestaurantListComponent
 } from 'Components/AsyncComponent/AsyncComponent';
 
 const UsersManagement = ({ match }) => (
    <div className="dashboard-wrapper">
       <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/addnew`} />
          <Route path={`${match.url}/addnew`} component={AsyncComponentAddNewRestaurantComponent} />
          <Route path={`${match.url}/restaurantlist`} component={AsyncComponentRestaurantListComponent} />
       </Switch>
    </div>
 );
 
 export default UsersManagement;
 