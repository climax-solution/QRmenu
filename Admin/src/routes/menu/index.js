/**
 * Dasboard Routes
 */
 import React from 'react';
 import { Redirect, Route, Switch } from 'react-router-dom';
 
 // async components
 import {
    AsyncCategoryComponent,
    AsyncPackageComponent,
    AsyncItemComponent,
    AsyncQrBuilderComponent,
    AsyncSpecialitesComponent,
    AsyncAllergensComponent
 } from 'Components/AsyncComponent/AsyncComponent';
 
 const Menu = ({ match }) => (
    <div className="dashboard-wrapper">
       <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/category`} />
          <Route path={`${match.url}/category`} component={AsyncCategoryComponent} />
          <Route path={`${match.url}/item`} component={AsyncItemComponent} />
          <Route path={`${match.url}/package`} component={AsyncPackageComponent} />
          <Route path={`${match.url}/specialities`} component={AsyncSpecialitesComponent} />
          <Route path={`${match.url}/qrbuilder`} component={AsyncQrBuilderComponent} />
          <Route path={`${match.url}/allergens`} component={AsyncAllergensComponent} />
       </Switch>
    </div>
 );
 
 export default Menu;
 