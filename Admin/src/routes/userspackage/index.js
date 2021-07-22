/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import Switch from 'react-toggle-switch';
 import { Helmet } from "react-helmet";
 import { Button } from 'reactstrap';
 import { connect } from 'react-redux';
 import Axios from 'axios';
 import PricingBlockV3 from 'Components/Pricing/PricingBlockV3';
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
 import IntlMessages from 'Util/IntlMessages';
 
 import { TextField,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, Select, MenuItem, FormControl, Checkbox, FormControlLabel, FormGroup,FormHelperText,Input} from '@material-ui/core';
import { NotificationManager } from 'react-notifications';

class UsersPackage extends Component {
    state = {
        monthlyPlan: true,
        premiumPlan: 300,
        enterprisePlan: 590,
        open: false,
        modalTitle: 'Add Package',
        packages: [],
        dialog: {
            package_name: '',
            slug: '',
            package_type: '',
            order_limit: '',
            price:'',
            item_limit: '',
            package_ability:[false,false,false,false,false,false,false,false,false,false]
        },
        items: {
            velkom: "Velkommen Side",meny: "Meny",pakker: "Pakker",spesial: "Spesialiteter", qrcode: "QR Code",whatsapp: 'Whatsapp Bestilling',onlinebest: 'Online Bestilling',reserve: 'Reservasion',contacter: 'Contacter', digitalbetal: 'Digtal Betaling'
        },
        isUpdate: false,
        activeId: -1,
	};

    componentDidMount() {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
         }
        Axios.get(REACT_APP_BACKEND_API + 'pkglist',{},{headers: headers}).then(res=>{
            this.setState({
                packages: res.data.data
            })
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
    handleClickOpen = (arg) => {
        let text = arg ? 'Add Package' : 'Edit Package';
        this.setState({ open: true, modalTitle: text });
    };
    
    editPackage = (id) => {
        Axios.post(REACT_APP_BACKEND_API + 'pkgitem',{id: id}).then(res=>{
            const { data } = res;
            const { dialog } = this.state;
            for (let key in data) {
                if (key != 'id') {
                    dialog[key] = data[key];
                }
            }
            this.setState({ dialog: dialog, open: true, isUpdate: true,activeId: data['id'] });
        });
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    CheckItem = (index) => (event, checked) => {
        let { dialog } = this.state;
        dialog.package_ability[index] = checked;
        this.setState({
            dialog: dialog,
        })
    };

    addPkg = () => {
        const { dialog, isUpdate, activeId } = this.state;
        let affix = isUpdate ? 'editpkg' : 'addpkg';
        if ( isUpdate ) dialog['id'] = activeId;
        Axios.post(REACT_APP_BACKEND_API + ''+affix, dialog).then(res=>{
            const { data } = res;
            if (!data.status) {
                NotificationManager.error('Package info is incorrectly!');
            }
            else {
                NotificationManager.success(`Successfully ${isUpdate ? 'Chagned' : 'added New'} Package!`);
                this.setState({
                    open: false,
                    packages: data.data
                })
            }
        })
    }
    deletePackage = (arg) => {
        Axios.delete(`http://localhost:8000/api/deletepkg/${arg}`).then(res=>{
            const { data } = res;
            if (!data.status) {
                NotificationManager.error('Failure!');
            }
            else {
                NotificationManager.success(`Successfully Removed Package!`);
                this.setState({
                    open: false,
                    packages: data.data
                })
            }
        })
    }
     render() {
        //console.log(this.state);
        const { dialog, items, packages } = this.state;
        const CheckItems = this.CheckItem;
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
                        {
                            packages.map(item=>{
                                return <PricingBlockV3
                                    planType="premium"
                                    type="widgets.paymentmember"
                                    color="primary"
                                    description="Secure file sharing and collaboration. Ideal for small teams."
                                    price={item.price}
                                    users={1}
                                    editPackage = {()=>this.editPackage(item.id)}
                                    features={[
                                        'Velkommen side',
                                        `Meny (${item.order_limit < 0 ? 'Unlimited' : item.order_limit} items)`,
                                        'Pakker',
                                        'Spesialiteter',
                                        'QR kode',
                                        'Whatsapp bestilling',
                                        `Online bestilling (${item.order_limit < 0 ? 'Unlimited' : item.order_limit + 'items'})`,
                                        'Reservasjon',
                                        'Kontakter',
                                        'Digital betaling'
                                    ]}
                                    id={item.id}
                                    deletePackage = {() => this.deletePackage(item.id) }
                                    ability={item.package_ability}
                                />
                            })
                        }
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
                                <TextField margin="dense" id="name" label="Package name" type="text" value={ dialog.package_name } onChange={(e)=> this.setState({ dialog: {...dialog, package_name: e.target.value }})}fullWidth/>
                                <TextField margin="dense" id="slug" label="Slug" type="text" fullWidth value={ dialog.slug } onChange={(e)=> this.setState({ dialog: {...dialog, slug: e.target.value }})}/>
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel htmlFor="packagetype">Package Type</InputLabel>
                                    <Select id="packagetype" value={ dialog.package_type } onChange={(e)=> this.setState({ dialog: {...dialog, package_type: e.target.value }})} >
                                        <MenuItem value="">Select</MenuItem>
                                        <MenuItem value="free">free</MenuItem>
                                        <MenuItem value="monthly">monthly</MenuItem>
                                        <MenuItem value="yearly">yearly</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel htmlFor="orderLimit">Order Limit</InputLabel>
                                    <Select id="orderLimit" value={dialog.order_limit}  onChange={(e)=> this.setState({ dialog: {...dialog, order_limit: e.target.value }})}>
                                        <MenuItem value="">Select Amount</MenuItem>
                                        <MenuItem value="-1">Unlimit</MenuItem>
                                        <MenuItem value="10">10</MenuItem>
                                        <MenuItem value="15">15</MenuItem>
                                        <MenuItem value="20">20</MenuItem>
                                        <MenuItem value="30">30</MenuItem>
                                        <MenuItem value="50">50</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField margin="dense" id="price" label="Price" type="text" fullWidth value={dialog.price} onChange={(e)=>this.setState({ dialog: {...dialog, price: e.target.value }})}/>
                                <FormControl margin="dense"  fullWidth>
                                    <InputLabel htmlFor="itemLimit">Item Limit</InputLabel>
                                    <Select id="itemLimit" value={dialog.item_limit} onChange={(e)=> this.setState({ dialog: {...dialog, item_limit: e.target.value }})}>
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
                                        {
                                            Object.keys(items).map(function(key,index) {
                                                return <FormControlLabel control={
                                                    <Checkbox color="primary" onChange={CheckItems(index)} checked={dialog.package_ability[index]} name={key} />
                                                } label={items[key]}
                                                />
                                            })
                                        }
                                        
                                    </FormGroup>
                                </FormControl>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleClose} color="primary" className="text-white">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={this.addPkg} className="btn-info text-white">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
             </div>
         );
     }
 }
 
const mapDispatchToProps = dispatch => {
    return ({
        AddNew: () => {}
    })
 };
export default connect(
     null,
     mapDispatchToProps
)(UsersPackage);