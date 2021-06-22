/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
 
 // intl messages
 import IntlMessages from 'Util/IntlMessages';
 
 export default class AdminSetting extends Component {
     render() {
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Admin Setting</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.adminsetting" />} match={this.props.match} />
             </div>
         );
     }
 }
 