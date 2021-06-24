import React, { Component } from 'react'
import { Helmet } from "react-helmet";
// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// import * as Switch from 'react-toggle-switch';
import Switch from '@material-ui/core/Switch';
import { FormGroup, FormControlLabel, FormControl, TextField, Button} from '@material-ui/core';
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
						closeable
						fullBlock
					>
                        <FormControl style={{display: 'block',padding: '20px'}}>
                            <FormGroup aria-label="position" style={{display: 'block',padding:'20px'}} row>
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
                                <TextField margin="dense" id="paypalemail" label="Paypal Email" type="email" fullWidth />
                                <Button variant="contained" onClick={this.handleClose} color="primary" style={{float:'right'}}>
                                    <i class="ti-save"></i>&nbsp;Save Change
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
						customClasses="trafic-bar-chart"
						colClasses="col-sm-12 col-md-12 col-lg-6 d-sm-full"
						heading={<IntlMessages id="Stripe Payment Gateway" />}
						collapsible
						closeable
						fullBlock
					>
                        <FormControl style={{display: 'block',padding:'20px'}}>
                            <FormGroup aria-label="position" style={{display: 'block',padding:'20px'}} row>
                                <FormControlLabel
                                    value="top"
                                    control={<Switch color="primary" size="normal"/>}
                                    label="Payment Gateway"
                                    labelPlacement="top"
                                />
                                <div className="row">
                                    <div className="col-md-6">
                                        <TextField
                                            margin="dense"
                                            id="paypalemail"
                                            label="Paypal Email"
                                            type="email"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField
                                            margin="dense"
                                            id="paypalemail"
                                            label="Paypal Email"
                                            type="email"
                                        />
                                    </div>
                                </div>
                                <Button variant="contained" onClick={this.handleClose} color="primary" style={{float:'right'}}>
                                    <i class="ti-save"></i>&nbsp;Save Change
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </RctCollapsibleCard>
                </div>
                <di class="row">
                <RctCollapsibleCard
						customClasses="trafic-bar-chart"
						colClasses="col-sm-12 col-md-12 col-lg-6 d-sm-full"
						heading={<IntlMessages id="Razorpay Payment Gateway" />}
						collapsible
						closeable
						fullBlock
					>
                        <FormControl style={{display: 'block',padding:'20px'}}>
                            <FormGroup className="mt-30" aria-label="position" style={{display: 'block',padding:'20px'}} row>
                                <FormControlLabel
                                    value="top"
                                    control={<Switch color="primary" size="normal"/>}
                                    label="Razorpay Payment"
                                    labelPlacement="top"
                                    className="mt-30"
                                />
                                <div className="row">
                                    <div className="col-md-6">
                                        <TextField
                                            margin="dense"
                                            id="razorpaykey"
                                            label="Razorpay Key"
                                            type="email"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField
                                            margin="dense"
                                            id="paypalemail"
                                            label="Paypal Email"
                                            type="email"
                                        />
                                    </div>
                                </div>
                                <Button variant="contained" onClick={this.handleClose} color="primary" className="mt-10" style={{float:'right'}}>
                                    <i class="ti-save"></i>&nbsp;Save Change
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
						customClasses="trafic-bar-chart"
						colClasses="col-sm-12 col-md-12 col-lg-6 d-sm-full"
						heading={<IntlMessages id="Bambora Payment Gateway" />}
						collapsible
						closeable
						fullBlock
					>
                        <FormControl style={{display: 'block',padding:'20px'}}>
                            <FormGroup aria-label="position" style={{display: 'block',padding:'20px'}} row>
                                <FormControlLabel
                                    value="top"
                                    control={<Switch color="primary" size="normal"/>}
                                    label="Payment Gateway"
                                    labelPlacement="top"
                                />
                                <div className="row">
                                    <div className="col-md-6">
                                        <TextField
                                            margin="dense"
                                            id="paypalemail"
                                            label="Bambora Access Key"
                                            type="text"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField
                                            margin="dense"
                                            id="paypalemail"
                                            label="Bambora Merchant Number"
                                            type="text"
                                            fullWidth
                                        />
                                    </div>
                                </div>
                                <TextField
                                    margin="dense"
                                    id="paypalemail"
                                    label="Bambora Secret Key"
                                    type="text"
                                    fullWidth
                                />
                                <Button variant="contained" onClick={this.handleClose} color="primary" className="mt-10 mb-10" style={{float:'right'}}>
                                    <i class="ti-save"></i>&nbsp;Save Change
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </RctCollapsibleCard>
                </di>
             </div>
         );
     }
 }
 