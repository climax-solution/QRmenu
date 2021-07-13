import React, { Component } from 'react'
import { Helmet } from "react-helmet";
// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// import * as Switch from 'react-toggle-switch';
import Switch from '@material-ui/core/Switch';
import { FormGroup, FormControlLabel, FormControl, TextField, Button,FormLabel} from '@material-ui/core';
// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import ToggleSwitch from "./switch";
import Axios from 'axios';

 export default class PaymentSetting extends Component {
    state = {
		monthlyPlan: true,
        open: false,
        paypal:{
            paypal_payment: false,
            paypal_status: true,
            paypal_email: ''
        },
        stripe:{
            stripe_gateway: false,
            stripe_public_key: '',
            stripe_secret_key: ''
        },
        razor: {
            razor_payment: false,
            razor_key: ''
        },
        bambora: {
            bambora_gateway: false,
            bambora_access_key: '',
            bambora_merchant_key: '',
            bambora_secret_key: ''
        }
	}

    componentWillMount() {
        Axios.get(REACT_APP_BACKEND_API + 'paymentsettings').then(res => {
            const { data } = res;
            const { paypal, stripe, razor, bambora } = this.state;
            let paypals =[], stripes =[] ,razors =[], bamboras = [];
            for (let key in data) {
                if (key == 'paypal_payment' || key == 'paypal_status' ||key == 'stripe_gateway'||key == 'razor_payment' || key == 'bambora_gateway') {
                    if (data[key] == '1') data[key] = true;
                    else data[key] = false;
                }

            }
            for (let key in paypal) {
                paypals[key] = data[key];
                console.log(key, typeof data[key]);
            }
            for (let key in stripe) {
                stripes[key] = data[key];
                console.log(key, typeof data[key]);

            }
            for (let key in razor) {
                console.log(key, typeof data[key]);
                razors[key] = data[key];
            }
            for (let key in bambora) {
                console.log(key, typeof data[key]);
                bamboras[key] = data[key];
            }
            this.setState({
                paypal: paypals,
                stripe: stripes,
                razor:razors,
                bambora: bamboras
            })
            console.log(paypal,stripe,razor,bambora);
        })
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
    
    modifycreate = ( arg ) => {
        const { paypal, stripe, razor, bambora } = this.state;

        let sendData;
        switch (arg) {
            case 0:
                sendData = paypal;
                break;
            case 1:
                sendData = stripe;
                break;
            case 2:
                sendData = razor;
                break;
            default:
                sendData = bambora;
                break;
        }
        console.log(sendData);
        Axios.post(REACT_APP_BACKEND_API + 'modifycreate_payment',sendData).then(res => {
            
        })
    }

    onNewsletterChange = () => {
        alert(12312312);
        this.setState({
            open: true
        })
      };
     render() {
         const { paypal, stripe, razor, bambora } = this.state;
        console.log('STate = >', paypal.paypal_payment);

         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Payment Setting</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.paymentsetting" />} match={this.props.match} />
                <div className="row">
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
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormLabel>Paypal Payment</FormLabel>
                                        <ToggleSwitch
                                            id="paypal-payment"
                                            checked={paypal.paypal_payment}
                                            onChange={()=>this.setState({
                                                paypal: {...paypal, paypal_payment: !paypal.paypal_payment}
                                            })} 
                                        
                                            dataYes="&#xe64c; Active"
                                            dataNo="&#xe6ae; Off"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormLabel>Status</FormLabel>
                                        <ToggleSwitch
                                            id="paypal-status"
                                            checked={paypal.paypal_status}
                                            onChange={()=>this.setState({
                                                paypal: {...paypal, paypal_status: !paypal.paypal_status}
                                            })}
                                            dataYes="&#xe64c; Live"
                                            dataNo="&#xe6ae; Sandbox"
                                        />
                                </div>
                                </div>
                                <TextField
                                    margin="dense"
                                    id="paypalemail"
                                    label="Paypal Email"
                                    type="email"
                                    fullWidth
                                    value={paypal.paypal_email}
                                    onChange={(e)=>this.setState({
                                        paypal:{...paypal, paypal_email: e.target.value}
                                    })}
                                />
                                <Button variant="contained" onClick={()=>this.modifycreate(0)} color="primary" style={{float:'right'}} className="mt-10 mb-10">
                                    <i className="ti-save"></i>&nbsp;Save Change
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
                        <FormControl style={{display: 'block',padding:'0 20px'}}>
                            <FormGroup aria-label="position" style={{display: 'block',padding:'20px'}} row>
                                <div className="row">
                                    <div className="col-md-12">
                                        <FormLabel>Payment Gateway</FormLabel>
                                        <ToggleSwitch
                                            id="stripe-payment"
                                            checked={stripe.stripe_gateway}
                                            onChange={()=>this.setState({stripe: {...stripe, stripe_gateway: !stripe.stripe_gateway }})}
                                            dataYes="&#xe64c; Active"
                                            dataNo="&#xe6ae; Off"
                                        />
                                    </div>
                                    <div className="col-md-6 mt-10">
                                        <TextField
                                            margin="dense"
                                            id="paypalemail"
                                            label="Stripe Public Key"
                                            type="text"
                                            fullWidth
                                            value={stripe.stripe_public_key}
                                            onChange={
                                                (e)=>this.setState({
                                                    stripe: {...stripe, stripe_public_key: e.target.value}
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="col-md-6 mt-10">
                                        <TextField
                                            margin="dense"
                                            id="paypalemail"
                                            label="Stripe Secret Key"
                                            type="text"
                                            value={stripe.stripe_secret_key}
                                            onChange={
                                                (e)=>this.setState({
                                                    stripe: {...stripe, stripe_secret_key: e.target.value}
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <Button variant="contained" onClick={()=>this.modifycreate(1)} color="primary" style={{float:'right'}} className="mt-20">
                                    <i className="ti-save"></i>&nbsp;Save Change
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </RctCollapsibleCard>
                </div>
                <div className="row">
                    <RctCollapsibleCard
						customClasses="trafic-bar-chart"
						colClasses="col-sm-12 col-md-12 col-lg-6 d-sm-full"
						heading={<IntlMessages id="Razorpay Payment Gateway" />}
						collapsible
						closeable
						fullBlock
					>
                        <FormControl style={{display: 'block',padding:'0 20px'}}>
                            <FormGroup className="mt-30" aria-label="position" style={{display: 'block',padding:'20px'}} row>
                                <div className="row">
                                    <div className="col-md-12">
                                        <FormLabel>Razorpay Payment</FormLabel>
                                        <ToggleSwitch
                                            id="razor-payment"
                                            checked={razor.razor_payment}
                                            onChange={()=>this.setState({
                                                razor: { ...razor, razor_payment: !razor.razor_payment }
                                            })}
                                            dataYes="&#xe64c; Active"
                                            dataNo="&#xe6ae; Off"
                                        />
                                    </div>
                                    <div className="col-md-12 mt-50">
                                        <TextField
                                            margin="dense"
                                            id="razorpaykey"
                                            label="Razorpay Key"
                                            type="text"
                                            fullWidth
                                            value={razor.razor_key}
                                            onChange={(e)=>this.setState({ razor: {...razor,razor_key: e.target.value }})}
                                        />
                                    </div>
                                </div>
                                <Button variant="contained" onClick={()=>this.modifycreate(2)} color="primary" className="mt-10" style={{float:'right'}}>
                                    <i className="ti-save"></i>&nbsp;Save Change
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
                                <div className="row">
                                    <div className="col-md-12">
                                        <FormLabel>Payment Gateway</FormLabel>
                                        <ToggleSwitch
                                            id="bambora-payment"
                                            checked={bambora.bambora_gateway}
                                            onChange={()=>this.setState({
                                                bambora: { ...bambora, bambora_gateway: !bambora.bambora_gateway }
                                            })}
                                            dataYes="&#xe64c; Active"
                                            dataNo="&#xe6ae; Off"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField
                                            margin="dense"
                                            id="paypalemail"
                                            label="Bambora Access Key"
                                            type="text"
                                            fullWidth
                                            value={bambora.bambora_access_key}
                                            onChange={(e)=>this.setState({
                                                bambora: { ...bambora, bambora_access_key: e.target.value }
                                            })}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField
                                            margin="dense"
                                            id="paypalemail"
                                            label="Bambora Merchant Number"
                                            type="text"
                                            fullWidth
                                            value={bambora.bambora_merchant_key}
                                            onChange={(e)=>this.setState({
                                                bambora: { ...bambora, bambora_merchant_key: e.target.value }
                                            })}
                                        />
                                    </div>
                                </div>
                                <TextField
                                    margin="dense"
                                    id="paypalemail"
                                    label="Bambora Secret Key"
                                    type="text"
                                    fullWidth
                                    value={bambora.bambora_secret_key}
                                    onChange={(e)=>this.setState({
                                        bambora: { ...bambora, bambora_secret_key: e.target.value }
                                    })}
                                />
                                <Button variant="contained" onClick={()=>this.modifycreate(3)} color="primary" className="mt-10 mb-10" style={{float:'right'}}>
                                    <i className="ti-save"></i>&nbsp;Save Change
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </RctCollapsibleCard>
                </div>
             </div>
         );
     }
 }
 