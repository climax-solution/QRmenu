/**
 * Dasboard Routes
 */
 import React from 'react';
 import { Redirect, Route, Switch } from 'react-router-dom';
 
 // async components
 import {
    AsyncCategoryComponent,
    AsyncPackageComponent,
    AsyncQrBuilderComponent
 } from 'Components/AsyncComponent/AsyncComponent';
 
 const Payment = ({ match }) => (
    <div className="dashboard-wrapper">
       <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/category`} />
          <Route path={`${match.url}/category`} component={AsyncCategoryComponent} />
          <Route path={`${match.url}/package`} component={AsyncPackageComponent} />
          <Route path={`${match.url}/qrbuilder`} component={AsyncQrBuilderComponent} />
       </Switch>
    </div>
 );
 
 export default Payment;
 