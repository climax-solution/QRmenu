/**
 * Dasboard Routes
 */
 import React from 'react';
 import { Redirect, Route, Switch } from 'react-router-dom';
 
 // async components
 import {
    AsyncOfflinePaymentComponent,
    AsyncPaymentSettingComponent,
    AsyncTransactionHistoryComponent
 } from 'Components/AsyncComponent/AsyncComponent';
 
 const Payment = ({ match }) => (
    <div className="dashboard-wrapper">
       <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/transaction-history`} />
          <Route path={`${match.url}/transaction-history`} component={AsyncTransactionHistoryComponent
} />
          <Route path={`${match.url}/offline-payment`} component={AsyncOfflinePaymentComponent} />
          <Route path={`${match.url}/payment-setting`} component={AsyncPaymentSettingComponent} />
       </Switch>
    </div>
 );
 
 export default Payment;
 