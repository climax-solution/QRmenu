/**
 * Dasboard Routes
 */
 import React from 'react';
 import { Redirect, Route, Switch } from 'react-router-dom';
 
 // async components
 import {
    AsyncSiteSettingComponent,
    AsyncEmainSettingComponent
 } from 'Components/AsyncComponent/AsyncComponent';
 const Setting = ({ match }) => {
     return (
        <div className="dashboard-wrapper">
            <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}site-setting`} />
            <Route path={`${match.url}/site-setting`} component={AsyncSiteSettingComponent} />
            <Route path={`${match.url}/email-setting`} component={AsyncEmainSettingComponent} />
            </Switch>
        </div>
     )
 }
 
 export default Setting;
 