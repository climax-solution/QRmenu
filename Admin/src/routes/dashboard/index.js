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

import { connect } from 'react-redux';
import moment from 'moment';
import { Line } from "react-chartjs-2";
import { getDashboardData } from '../../actions/AuthActions';

const textEffect = {
    textShadow:'0 1px 0 hsl(174,5%,80%),0 2px 0 hsl(174,5%,75%),0 3px 0 hsl(174,5%,70%), 0 4px 0 hsl(174,5%,66%),0 5px 0 hsl(174,5%,64%),0 6px 0 hsl(174,5%,62%),0 7px 0 hsl(174,5%,61%), 0 8px 0 hsl(174,5%,60%), 0 0 5px rgba(0,0,0,.05), 0 1px 3px rgba(0,0,0,.2), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.2),  0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.3)',
    color: 'white',
    textAlign: 'center',
    wordWrap: 'break-word' 
 };
const rem6 = { fontSize: '6rem'};
const rem3 = { fontSize: '2rem' };


class Dashboard extends Component {
     state = {
        permission_status: window.location.pathname.indexOf('admin') > 0 ? 'admin': 'vendor',
        dashboard: {},
        chartDataList: ''
     }

     componentDidMount() {
         this.props.getDashboardData();
     }

     componentDidUpdate(preprops) {
         if (preprops !== this.props) {
             this.setState({
                 dashboard: this.props.dashboard
             })
         }
     }
     render() {

         const { match } = this.props;
         const { dashboard } = this.state;
         let earning = '';
         if (dashboard) earning = dashboard.earning;
         const chartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: '#',
                data: !earning ? [0,0,0,0,0,0,0,0,0,0,0,0] : earning.split(','),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
              },
            ],
          };
          
          const Options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };
         return (
             <div className="dashboard-wrapper">
                <Helmet>
                    <title>Dashboard</title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.dashboard" />} match={match} />
                <RctCollapsibleCard
                    customClasses="trafic-bar-chart"
                    colClasses="col-sm-12"
                    heading={<IntlMessages id="widgets.earningchart" />}
                    collapsible
                    reloadable
                    closeable
                    fullBlock
                >
                    <Line ref="chart" data={chartData} options={Options} className="mb-10" />
                </RctCollapsibleCard>
                {
                this.state.permission_status == 'vendor' ?
                    <div className="row">
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="col-sm-12 col-md-6 col-lg-6"
                            heading={<IntlMessages id="widgets.itemnumber" />}
                            collapsible
                            reloadable
                            closeable
                            fullBlock
                        >
                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <h2 className="text-center">Menu</h2>
                                    <h3 style={{...textEffect, ...rem6}}>{dashboard.menu}</h3>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <h2 className="text-center">Special</h2>
                                    <h3 style={{...textEffect, ...rem6}}>{dashboard.special}</h3>
                                </div>
                            </div>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="col-sm-12 col-md-6 col-lg-6"
                            heading={<IntlMessages id="widgets.morestatus" />}
                            collapsible
                            reloadable
                            closeable
                            fullBlock
                        >
                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <h2 className="text-center">Package Name</h2>
                                    <h3 style={{...textEffect, ...rem3}}>{dashboard.activepkg}</h3>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <h2 className="text-center">Member Date</h2>
                                    <h3 style={{...textEffect, ...rem3}}>{moment(dashboard.join_date).format('Y-MM-DD')}</h3>
                                </div>
                            </div>
                        </RctCollapsibleCard>
                    </div>
                    : <div className="row">
                    <RctCollapsibleCard
                        customClasses="trafic-bar-chart"
                        colClasses="col-xs-12 col-sm-6 col-md-6 col-lg-3"
                        heading={<IntlMessages id="widgets.totaluser" />}
                        collapsible
                        fullBlock
                    >
                        <h3 style={{...textEffect, ...rem6}}>{dashboard.total_user}</h3>
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
                        customClasses="trafic-bar-chart"
                        colClasses="col-xs-12 col-sm-6 col-md-6 col-lg-3"
                        heading={<IntlMessages id="widgets.blockeduser" />}
                        collapsible
                        fullBlock
                    >
                        <h3 style={{...textEffect, ...rem6}}>{dashboard.blocked_user}</h3>
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
                        customClasses="trafic-bar-chart"
                        colClasses="col-xs-12 col-sm-6 col-md-6 col-lg-3"
                        heading={<IntlMessages id="widgets.totalpackage" />}
                        collapsible
                        fullBlock
                    >
                        <h3 style={{...textEffect, ...rem6}}>{dashboard.total_pkg}</h3>
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
                        customClasses="trafic-bar-chart"
                        colClasses="col-xs-12 col-sm-6 col-md-6 col-lg-3"
                        heading={<IntlMessages id="widgets.newuser" />}
                        collapsible
                        fullBlock
                    >
                        <h3 style={{...textEffect, ...rem6}}>{dashboard.new_user}</h3>
                    </RctCollapsibleCard>
                    
                </div>
                }
             </div>
         );
     }
 }
 const mapStateToProps = ({ authUser }) =>({
     dashboard: authUser.dashboarddata
 })
 const maptoStateDispatch = dispatch => ({
     getDashboardData: () => dispatch(getDashboardData())
 })
 export default connect(mapStateToProps, maptoStateDispatch)(Dashboard);