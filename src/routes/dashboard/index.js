/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
 
 // intl messages
 import IntlMessages from 'Util/IntlMessages';
 
 import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

 import {
	VisitorAreaChartWidget,
	SalesAreaChartWidget,
	OrdersAreaChartWidget,
    OverallTrafficStatusWidget,
    RecentOrdersWidget,
} from "Components/Widgets";

 import {
	visitorsData,
	salesData,
	ordersData,
    trafficStatus
 } from './data';

 export default class Dashboard extends Component {
     render() {
         const { match } = this.props;
         return (
             <div className="dashboard-wrapper">
                <Helmet>
                    <title>Package</title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.dashboard" />} match={match} />
                <div className="row">
                    <div className="col-sm-6 col-md-4 w-xs-half-block">
                        <VisitorAreaChartWidget
                            data={visitorsData}
                        />
                    </div>
                    <div className="col-sm-12 col-md-4 w-xs-half-block">
                        <OrdersAreaChartWidget
                            data={ordersData}
                        />
                    </div>
                    <div className="col-sm-6 col-md-4 w-xs-full">
                        <SalesAreaChartWidget
                            data={salesData}
                        />
                    </div>
				</div>
                <div className="row">
                    <RctCollapsibleCard
                        customClasses="trafic-bar-chart"
                        colClasses="col-sm-12 col-md-12 col-lg-5 d-sm-full"
                        heading={<IntlMessages id="widgets.overallTrafficStatus" />}
                        collapsible
                        reloadable
                        closeable
                        fullBlock
                    >
                        <OverallTrafficStatusWidget
                            chartData={trafficStatus}
                        />
                    </RctCollapsibleCard>
                    <div className="col-sm-12 col-md-12 col-lg-7 d-sm-full">
                        <div className="row">
                            <RctCollapsibleCard
                                colClasses="col-sm-12 col-md-12 col-lg-12 w-xs-full"
                                heading={<IntlMessages id="widgets.RecentOrders" />}
                                collapsible
                                reloadable
                                closeable
                                fullBlock
                            >
                                <RecentOrdersWidget />
                            </RctCollapsibleCard>
                        </div>
                    </div>
                </div>
             </div>
         );
     }
 }
 