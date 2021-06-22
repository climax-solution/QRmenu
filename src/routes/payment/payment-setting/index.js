/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
 
 // intl messages
 import IntlMessages from 'Util/IntlMessages';
 
 export default class PaymentSetting extends Component {
     render() {
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Payment Setting</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.paymentsetting" />} match={this.props.match} />
             </div>
         );
     }
 }
 