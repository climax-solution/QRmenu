/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
 
 // intl messages
 import IntlMessages from 'Util/IntlMessages';
 
 export default class Reversation extends Component {
     render() {
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Back Up Database</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.backupdb" />} match={this.props.match} />
             </div>
         );
     }
 }
 