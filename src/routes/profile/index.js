/**
 * Dasboard Routes
 */
 import React from 'react';
 import { Redirect, Route, Switch } from 'react-router-dom';
 
 // async components
 import {
    AsyncProfileComponent,
    AsyncAvaibleComponent,
 } from 'Components/AsyncComponent/AsyncComponent';
 
 const Profile = ({ match }) => (
    <div className="dashboard-wrapper">
       <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/profile`} />
          <Route path={`${match.url}/profile`} component={AsyncProfileComponent} />
          <Route path={`${match.url}/avaible`} component={AsyncAvaibleComponent} />
       </Switch>
    </div>
 );
 
 export default Profile;
 