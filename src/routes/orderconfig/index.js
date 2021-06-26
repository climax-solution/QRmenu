import React, { Component } from 'react'
import { Helmet } from "react-helmet";
// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// import * as Switch from 'react-toggle-switch';
import { FormGroup, FormControlLabel, FormControl, TextField, Button,FormLabel, Switch} from '@material-ui/core';
// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import ToggleSwitch from "./switch";

 export default class OrderConfig extends Component {
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
    onNewsletterChange = () => {
        this.setState({
            open: true
        })
      };
     render() {
         return (
             <div className="blank-wrapper">
                <Helmet>
                    <title>Order Configuration</title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.orderconfig" />} match={this.props.match} />
                <div class="row">
                    <div className="col-lg-6 col-sm-12 col-md-12">
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="col-md-12 d-sm-full"
                            heading={<IntlMessages id="sidebar.orderconfig" />}
                            collapsible
                            closeable
                            fullBlock
                        >
                            <FormControl style={{display: 'block',padding: '20px'}}>
                                <FormGroup aria-label="position" style={{display: 'block',padding:'20px'}} row>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel>Kontantbetaling ved levering </FormLabel>
                                            <ToggleSwitch
                                                id="contant-betaling"
                                                checked={this.state.open}
                                                onChange={()=>this.onNewsletterChange}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe73c; Off"
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel>Bestilling</FormLabel>
                                            <ToggleSwitch
                                                id="bestilling"
                                                checked={this.state.open}
                                                onChange={()=>this.onNewsletterChange}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe73c; Off"
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel>Henting</FormLabel>
                                            <ToggleSwitch
                                                id="henting"
                                                checked={this.state.open}
                                                onChange={()=>this.onNewsletterChange}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe73c; Off"
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel> Betal med kontanter </FormLabel>
                                            <ToggleSwitch
                                                id="betal-med"
                                                checked={this.state.open}
                                                onChange={()=>this.onNewsletterChange}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe73c; Off"
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel> Spis i Restaurant </FormLabel>
                                            <ToggleSwitch
                                                id="spis"
                                                checked={this.state.open}
                                                onChange={()=>this.onNewsletterChange}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe73c; Off"
                                            />
                                        </div>
                                    </div>
                                    <TextField margin="dense" id="paypalemail" label="Paypal Email" type="email" fullWidth />
                                    <Button variant="contained" onClick={this.handleClose} color="primary" style={{float:'right'}} className="mt-10 mb-10">
                                        <i class="ti-save"></i>&nbsp;Save Change
                                    </Button>
                                </FormGroup>
                            </FormControl>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="col-md-12 d-sm-full"
                            heading={<IntlMessages id="Paypal Payment Gateway" />}
                            collapsible
                            closeable
                            fullBlock
                        >
                            <FormControl style={{display: 'block',padding: '20px'}}>
                                <FormGroup aria-label="position" style={{display: 'block',padding:'20px'}} row>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormLabel>Paypal Payment</FormLabel>
                                            <ToggleSwitch
                                                id="paypal-payment"
                                                checked={this.state.open}
                                                onChange={()=>this.onNewsletterChange}
                                                dataYes="&#xe64c; Active"
                                                dataNo="&#xe73c; Off"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormLabel>Status</FormLabel>
                                            <ToggleSwitch
                                                id="paypal-status"
                                                checked={this.state.open}
                                                onChange={()=>this.onNewsletterChange}
                                                dataYes="&#xe64c; Active"
                                                dataNo="&#xe73c; Off"
                                            />
                                    </div>
                                    </div>
                                    <TextField margin="dense" id="paypalemail" label="Paypal Email" type="email" fullWidth />
                                    <Button variant="contained" onClick={this.handleClose} color="primary" style={{float:'right'}} className="mt-10 mb-10">
                                        <i class="ti-save"></i>&nbsp;Save Change
                                    </Button>
                                </FormGroup>
                            </FormControl>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="col-md-12 d-sm-full"
                            heading={<IntlMessages id="Bambora Payment Gateway" />}
                            collapsible
                            closeable
                            fullBlock
                        >
                            <FormControl style={{display: 'block',padding:'20px'}}>
                                <FormGroup aria-label="position" style={{display: 'block',padding:'20px'}} row>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormLabel>Payment Gateway</FormLabel>
                                            <ToggleSwitch
                                                id="bambora-payment"
                                                checked={this.state.open}
                                                onChange={()=>this.onNewsletterChange}
                                                dataYes="&#xe64c; Active"
                                                dataNo="&#xe73c; Off"
                                            />
                                        </div>
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
                    </div>
                    <div className="col-lg-6 col-sm-12 col-md-12">
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="col-md-12 d-sm-full"
                            heading={<IntlMessages id="Configuration" />}
                            customStyle={{overflow: 'hidden', maxHeight: '400px'}}
                            collapsible
                            closeable
                            fullBlock
                        >
                            <FormControl style={{display: 'block',padding: '20px'}}>
                                <FormGroup aria-label="position" style={{display: 'block',padding:'20px'}} row>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel>Whatsapp Order </FormLabel>
                                            <ToggleSwitch
                                                id="whatsapp-order"
                                                checked={this.state.open}
                                                onChange={()=>this.onNewsletterChange}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe73c; Off"
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel>Stock Status</FormLabel>
                                            <ToggleSwitch
                                                id="stock-status"
                                                checked={this.state.open}
                                                onChange={()=>this.onNewsletterChange}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe73c; Off"
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel>Stock Counter</FormLabel>
                                            <ToggleSwitch
                                                id="stock-counter"
                                                checked={this.state.open}
                                                onChange={()=>this.onNewsletterChange}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe73c; Off"
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel> KDS </FormLabel>
                                            <ToggleSwitch
                                                id="KDS"
                                                checked={this.state.open}
                                                onChange={()=>this.onNewsletterChange}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe73c; Off"
                                            />
                                        </div>
                                    </div>
                                    <TextField margin="dense" id="delivery-charge" label="Delivery charge" type="email" fullWidth />
                                    <Button variant="contained" onClick={this.handleClose} color="primary" style={{float:'right'}} className="mt-10 mb-10">
                                        <i class="ti-save"></i>&nbsp;Save Change
                                    </Button>
                                </FormGroup>
                            </FormControl>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="col-md-12 d-sm-full"
                            heading={<IntlMessages id="Stripe Payment Gateway" />}
                            customStyle={{overflow: 'hidden', maxHeight: '300px'}}
                            collapsible
                            closeable
                            fullBlock
                        >
                            <FormControl style={{display: 'block',padding:'0 20px'}}>
                                <FormGroup aria-label="position" style={{display: 'block',padding:'20px'}} row>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormLabel>Payment Gateway</FormLabel>
                                            <ToggleSwitch
                                                id="stripe-payment"
                                                checked={this.state.open}
                                                onChange={()=>this.onNewsletterChange}
                                                dataYes="&#xe64c; Active"
                                                dataNo="&#xe73c; Off"
                                            />
                                        </div>
                                        <div className="col-md-6 mt-10">
                                            <TextField
                                                margin="dense"
                                                id="paypalemail"
                                                label="Stripe Public Key"
                                                type="text"
                                                fullWidth
                                            />
                                        </div>
                                        <div className="col-md-6 mt-10">
                                            <TextField
                                                margin="dense"
                                                id="paypalemail"
                                                label="Stripe Secret Key"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <Button variant="contained" onClick={this.handleClose} color="primary" style={{float:'right'}} className="mt-20">
                                        <i class="ti-save"></i>&nbsp;Save Change
                                    </Button>
                                </FormGroup>
                            </FormControl>
                        </RctCollapsibleCard>
                    </div>
                </div>
             </div>
         );
     }
 }
 