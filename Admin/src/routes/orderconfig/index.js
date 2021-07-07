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
import Axios from 'axios';

 export default class OrderConfig extends Component {
    state = {
		monthlyPlan: true,
		premiumPlan: 300,
		enterprisePlan: 590,
        open: false,
        first_config:{
            content_betal: false,
            bestilling: false,
            henting: false,
            betal: false,
            spis: false
        },
        config: {
            whatsapp: false,
            stock_status: false,
            stock_counter: false,
            kds: false,
            delivery_charge: ''
        },
        paypal: {
            paypal_payment: false,
            paypal_status: false,
            paypal_email: ''
        },
        bambora: {
            bambora_gateway: false,
            bambora_access_key: '',
            bambora_merchant_key: '',
            bambora_secret_key: '',
        },
        stripe: {
            stripe_gateway: false,
            stripe_public_key: '',
            stripe_secret_key: '',
        },
	}

    componentWillMount() {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        Axios.post('http://localhost:8000/api/configsettings',{},{headers: headers}).then(res=>{
            const { first_config, config, paypal, bambora, stripe } = this.state;
            const { data } = res;
            for (let key in first_config) {
                first_config[key] = !data[key] ? false : true;
            }
            for (let key in config) {
                config[key] = !data[key] ? false : true;
            }
            config['delivery_charge'] = data['delivery_charge'];
            for (let key in paypal) {
                paypal[key] = !data[key] ? false : true;
            }
            paypal['paypal_email'] = data['paypal_email'];
            for (let key in bambora) {
                bambora[key] = data[key];
            }
            bambora['bambora_gateway'] = !data['bambora_gateway'] ? false : true;
            for (let key in stripe) {
                stripe[key] = data[key];
            }
            stripe['stripe_gateway'] = !data['stripe_gateway'] ? false : true;
            this.setState({
                first_config: first_config,
                config: config,
                paypal: paypal,
                bambora: bambora,
                stripe: stripe
            })
        })
    }

    modifyCreate = (arg) => {
        const {first_config, config, paypal, bambora, stripe} = this.state;
        let sendData;
        switch(arg) {
            case 0:
                sendData = first_config;
                break;
            case 1: 
                sendData = paypal;
                break;
            case 2: 
                sendData = bambora;
                break;
            case 3: 
                sendData = config;
                break;
            default: 
                sendData = stripe;
                break;
        }
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
         }
        Axios.post('http://localhost:8000/api/modifyorderconfig',sendData, {headers: headers}).then(res=>{

        })
    }
     render() {
         const { first_config, config, paypal, bambora, stripe } = this.state;
         return (
             <div className="blank-wrapper">
                <Helmet>
                    <title>Order Configuration</title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.orderconfig" />} match={this.props.match} />
                <div className="row">
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
                                                checked={first_config.content_betal}
                                                onChange={()=>this.setState({
                                                    first_config: {...first_config, content_betal: !first_config.content_betal}
                                                })}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe6ae; Off"
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel>Bestilling</FormLabel>
                                            <ToggleSwitch
                                                id="bestilling"
                                                checked={first_config.bestilling}
                                                onChange={()=>this.setState({
                                                    first_config: {...first_config, bestilling: !first_config.bestilling}
                                                })}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe6ae; Off"
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel>Henting</FormLabel>
                                            <ToggleSwitch
                                                id="henting"
                                                checked={first_config.henting}
                                                onChange={()=>this.setState({
                                                    first_config: {...first_config, henting: !first_config.henting}
                                                })}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe6ae; Off"
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel> Betal med kontanter </FormLabel>
                                            <ToggleSwitch
                                                id="betal-med"
                                                checked={first_config.betal}
                                                onChange={()=>this.setState({
                                                    first_config: {...first_config, betal: !first_config.betal}
                                                })}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe6ae; Off"
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel> Spis i Restaurant </FormLabel>
                                            <ToggleSwitch
                                                id="spis"
                                                checked={first_config.spis}
                                                onChange={()=>this.setState({
                                                    first_config: {...first_config, spis: !first_config.spis}
                                                })}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe6ae; Off"
                                            />
                                        </div>
                                    </div>
                                    <Button variant="contained" onClick={()=>this.modifyCreate(0)} color="primary" style={{float:'right'}} className="mt-10 mb-10">
                                        <i className="ti-save"></i>&nbsp;Save Change
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
                                                dataYes="&#xe64c; Active"
                                                dataNo="&#xe6ae; Off"
                                            />
                                    </div>
                                    </div>
                                    <TextField
                                        margin="dense"
                                        id="paypalemail"
                                        label="Paypal Email"
                                        type="email"
                                        value={paypal.paypal_email}
                                        onChange={(e)=>this.setState({
                                            paypal: {...paypal, paypal_email: e.target.value}
                                        })}
                                        fullWidth />
                                    <Button variant="contained" onClick={()=>this.modifyCreate(1)} color="primary" style={{float:'right'}} className="mt-10 mb-10">
                                        <i className="ti-save"></i>&nbsp;Save Change
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
                                                checked={bambora.stripe_gateway}
                                                onChange={(e)=>this.setState({
                                                    bambora: {...bambora, stripe_gateway: !bambora.stripe_gateway}
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
                                                value={bambora.bambora_access_key}
                                                onChange={(e)=>this.setState({
                                                    bambora: {...bambora, bambora_access_key: e.target.value}
                                                })}
                                                fullWidth
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <TextField
                                                margin="dense"
                                                id="paypalemail"
                                                label="Bambora Merchant Number"
                                                type="text"
                                                value={bambora.bambora_merchant_key}
                                                onChange={(e)=>this.setState({
                                                    bambora: {...bambora, bambora_merchant_key: e.target.value}
                                                })}
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                    <TextField
                                        margin="dense"
                                        id="paypalemail"
                                        label="Bambora Secret Key"
                                        type="text"
                                        value={bambora.bambora_secret_key}
                                        onChange={(e)=>this.setState({
                                            bambora: {...bambora, bambora_secret_key: e.target.value}
                                        })}
                                        fullWidth
                                    />
                                    <Button variant="contained" onClick={()=>this.modifyCreate(2)} color="primary" className="mt-10 mb-10" style={{float:'right'}}>
                                        <i className="ti-save"></i>&nbsp;Save Change
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
                                                checked={config.whatsapp}
                                                onChange={(e)=>this.setState({
                                                    config: {...config, whatsapp: !config.whatsapp}
                                                })}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe6ae; Off"
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel>Stock Status</FormLabel>
                                            <ToggleSwitch
                                                id="stock-status"
                                                checked={config.stock_status}
                                                onChange={(e)=>this.setState({
                                                    config: {...config, stock_status: !config.stock_status}
                                                })}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe6ae; Off"
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel>Stock Counter</FormLabel>
                                            <ToggleSwitch
                                                id="stock-counter"
                                                checked={config.stock_counter}
                                                onChange={(e)=>this.setState({
                                                    config: {...config, stock_counter: !config.stock_counter}
                                                })}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe6ae; Off"
                                            />
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-20">
                                            <FormLabel> KDS </FormLabel>
                                            <ToggleSwitch
                                                id="KDS"
                                                checked={config.kds}
                                                onChange={(e)=>this.setState({
                                                    config: {...config, kds: !config.kds}
                                                })}
                                                dataYes="&#xe64c; On"
                                                dataNo="&#xe6ae; Off"
                                            />
                                        </div>
                                    </div>
                                    <TextField
                                        margin="dense"
                                        id="delivery-charge"
                                        label="Delivery charge"
                                        type="email"
                                        checked={config.delivery_charge}
                                        onChange={(e)=>this.setState({
                                            config: {...config, delivery_charge: e.target.value}
                                        })}
                                        fullWidth />
                                    <Button variant="contained" onClick={()=>this.modifyCreate(3)} color="primary" style={{float:'right'}} className="mt-10 mb-10">
                                        <i className="ti-save"></i>&nbsp;Save Change
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
                                                checked={stripe.stripe_gateway}
                                                onChange={(e)=>this.setState({
                                                    stripe: {...stripe, stripe_gateway: !stripe.stripe_gateway}
                                                })}
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
                                                checked={stripe.stripe_public_key}
                                                onChange={(e)=>this.setState({
                                                    stripe: {...stripe, stripe_public_key: e.target.value}
                                                })}
                                                fullWidth
                                            />
                                        </div>
                                        <div className="col-md-6 mt-10">
                                            <TextField
                                                margin="dense"
                                                id="paypalemail"
                                                label="Stripe Secret Key"
                                                checked={stripe.stripe_secret_key}
                                                onChange={(e)=>this.setState({
                                                    stripe: {...stripe, stripe_secret_key: e.target.value}
                                                })}
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <Button variant="contained" onClick={()=>this.modifyCreate(4)} color="primary" style={{float:'right'}} className="mt-20">
                                        <i className="ti-save"></i>&nbsp;Save Change
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
 