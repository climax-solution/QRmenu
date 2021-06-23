import React, { Component } from 'react'
import { Helmet } from "react-helmet";
// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// import * as Switch from 'react-toggle-switch';
import Switch from '@material-ui/core/Switch';
import { FormGroup, FormControlLabel, FormControl, TextField} from '@material-ui/core';
// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import {
	visitorsData,
	salesData,
	ordersData,
    trafficStatus
 } from './data';
 export default class PaymentSetting extends Component {
    state = {
		monthlyPlan: true,
		premiumPlan: 300,
		enterprisePlan: 590,
        open: false
	}

	// on plan change
	onPlanChange(isMonthly) {
		this.setState({ monthlyPlan: !isMonthly });
		if (!isMonthly) {
			this.setState({ businessPlan: 300, enterprisePlan: 590 });
		} else {
			this.setState({ businessPlan: 350, enterprisePlan: 700 });
		}
	}
    handleClickOpen = () => {
        this.setState({ open: true });
    };
  
    handleClose = () => {
        this.setState({ open: false });
    };
     render() {
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Payment Setting</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.paymentsetting" />} match={this.props.match} />
                <div class="row">
                    <RctCollapsibleCard
						customClasses="trafic-bar-chart"
						colClasses="col-sm-12 col-md-12 col-lg-6 d-sm-full"
						heading={<IntlMessages id="Paypal Payment Gateway" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
                    <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                value="top"
                                control={<Switch color="primary" size="normal"/>}
                                label="Paypal Payment"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value="top"
                                control={<Switch color="primary" size="normal"/>}
                                label="Status   "
                                labelPlacement="top"
                                // className="pull-right"
                            />
                            <TextField />
                        </FormGroup>
                    </FormControl>
                    </RctCollapsibleCard>
                </div>
             </div>
         );
     }
 }
 