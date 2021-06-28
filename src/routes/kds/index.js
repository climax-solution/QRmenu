/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
 
 // intl messages
 import IntlMessages from 'Util/IntlMessages';
 
 export default class KDS extends Component {
     render() {
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>KDS</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.kds" />} match={this.props.match} />
                 <div className="row">
                    <RctCollapsibleCard
                        heading="New Order"
                        colClasses="col-lg-3 col-md-6 col-sm-12 d-sm-full"
                        collapsible
                        closeable
                        fullBlock
                    >
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
                        heading="Accepted"
                        colClasses="col-lg-3 col-md-6 col-sm-12 d-sm-full"
                        collapsible
                        closeable
                        fullBlock
                    >
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
                        heading="Completed"
                        colClasses="col-lg-3 col-md-6 col-sm-12 d-sm-full"
                        collapsible
                        closeable
                        fullBlock
                    >
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
                        heading="Served"
                        colClasses="col-lg-3 col-md-6 col-sm-12 d-sm-full"
                        collapsible
                        closeable
                        fullBlock
                    >
                    </RctCollapsibleCard>
                 </div>
             </div>
         );
     }
 }
 