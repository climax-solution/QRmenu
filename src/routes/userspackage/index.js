/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import Switch from 'react-toggle-switch';
 import { Helmet } from "react-helmet";
 import { Button } from 'reactstrap';
 // components
 import PricingBlockV3 from 'Components/Pricing/PricingBlockV3';
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
 
 // intl messages
 import IntlMessages from 'Util/IntlMessages';
 
 import { TextField,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, Select, MenuItem, FormControl, Checkbox, FormControlLabel, FormGroup,FormHelperText,Input} from '@material-ui/core';

 export default class UsersPackage extends Component {
    state = {
        monthlyPlan: true,
        premiumPlan: 300,
        enterprisePlan: 590,
        open: false,
        modalTitle: 'Add Package'
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
    handleClickOpen = (arg = false) => {
        let text = arg == true ? 'Add Package' : 'Edit Package';
        this.setState({ open: true, modalTitle: text });
    };
  
    handleClose = () => {
        this.setState({ open: false });
    };
     render() {
         return (
             <div className="pricing-wrapper">
                 <Helmet>
                     <title>Pakcage</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.userpackage" />} match={this.props.match} />
                 <div className="pricing-top mb-50">
                    <div className="row">
                        <div className="col-sm-12 col-md-9 col-lg-7 mx-auto text-center">
                            <h2 className="mb-20">Choose the plan that works for you.</h2>
                            <div>
                                <span>Monthly</span>
                                <Switch onClick={() => this.onPlanChange(this.state.monthlyPlan)} on={this.state.monthlyPlan} />
                                <span>Yearly ( get 2 month extra)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <Button color="success" className='btn-block btn-lg' onClick={()=>this.handleClickOpen(true)}>
                            <IntlMessages id="Add New" />
                        </Button>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <div className="price-list m-10">
                    <div className="row row-eq-height">
                        <PricingBlockV3
                            planType="free"
                            type="widgets.freemember"
                            color="primary"
                            description="Secure file sharing and collaboration. Ideal for small teams."
                            price="widgets.free"
                            users={1}
                            handleClickOpen = {()=>this.handleClickOpen(false)}
                            features={[
                                'Velkommen side',
                                'Meny (50 items)',
                                'Pakker',
                                'Spesialiteter',
                                'QR kode',
                                'Whatsapp bestilling',
                                'Online bestilling (50)',
                                'Reservasjon',
                                'Kontakter',
                                'Digital betaling'
                            ]}
                        />
                        <PricingBlockV3
                            planType="premium"
                            type="widgets.paymentmember"
                            color="primary"
                            description="Secure file sharing and collaboration. Ideal for small teams."
                            price={this.state.premiumPlan}
                            users={1}
                            handleClickOpen = {()=>this.handleClickOpen(false)}
                            features={[
                                'Velkommen side',
                                'Meny (Unlimited items)',
                                'Pakker',
                                'Spesialiteter',
                                'QR kode',
                                'Whatsapp bestilling',
                                'Online bestilling (Unlimited)',
                                'Reservasjon',
                                'Kontakter',
                                'Digital betaling'
                            ]}
                        />
                    </div>
                </div>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
                    <DialogTitle id="form-dialog-title">Package Management</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.modalTitle}
                        </DialogContentText>
                        <div className="row">                        
                            <div className="col-md-6" >
                                <TextField margin="dense" id="name" label="Package name" type="text" fullWidth/>
                                <TextField margin="dense" id="slug" label="Slug" type="text" fullWidth/>
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel htmlFor="packagetype">Package Type</InputLabel>
                                    <Select id="packagetype">
                                        <MenuItem value="">Select</MenuItem>
                                        <MenuItem value="free">free</MenuItem>
                                        <MenuItem value="month">monthly</MenuItem>
                                        <MenuItem value="year">yearly</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl margin="dense"  fullWidth>
                                    <InputLabel htmlFor="orderLimit">Order Limit</InputLabel>
                                    <Select id="orderLimit">
                                        <MenuItem value="">Select Amount</MenuItem>
                                        <MenuItem value="-1">Unlimit</MenuItem>
                                        <MenuItem value="10">10</MenuItem>
                                        <MenuItem value="15">15</MenuItem>
                                        <MenuItem value="20">20</MenuItem>
                                        <MenuItem value="30">30</MenuItem>
                                        <MenuItem value="50">50</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField margin="dense" id="price" label="Price" type="text" fullWidth/>
                                <FormControl margin="dense"  fullWidth>
                                    <InputLabel htmlFor="itemLimit">Item Limit</InputLabel>
                                    <Select id="itemLimit">
                                    <MenuItem value="">Select Amount</MenuItem>
                                    <MenuItem value="-1">Unlimit</MenuItem>
                                    <MenuItem value="10">10</MenuItem>
                                        <MenuItem value="15">15</MenuItem>
                                        <MenuItem value="20">20</MenuItem>
                                        <MenuItem value="30">30</MenuItem>
                                        <MenuItem value="40">40</MenuItem>
                                        <MenuItem value="50">50</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-6">
                                <FormControl component="fieldset" className="pull-right">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox name="velkom" />}
                                            label="Velkommen Side"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox name="meny" />}
                                            label="Meny"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox name="pakker" />}
                                            label="Pakker"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox name="spesial" />}
                                            label="Spesialiteter"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox name="qrcode" />}
                                            label="QRCode"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox name="whatsbest" />}
                                            label="Whatsapp Bestilling"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox name="onlinebest" />}
                                            label="Online Bestilling"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox name="reserve" />}
                                            label="Reservajon"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox name="contacter" />}
                                            label="Contacter"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox name="digitalbetal" />}
                                            label="Digital Betaling"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleClose} color="primary" className="text-white">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={this.handleClose} className="btn-info text-white">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
             </div>
         );
     }
 }
 