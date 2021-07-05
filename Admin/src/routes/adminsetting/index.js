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
// import Switch from '@material-ui/core/Switch';
import Switch from 'react-toggle-switch';
import { FormGroup, FormControlLabel, FormControl, TextField, Button,Radio,Select,InputLabel,MenuItem,FormLabel} from '@material-ui/core';
import timezones from 'timezone-list';
 export default class AdminSetting extends Component {
    state = {
        selectedValue: 'english',
        currency:'',
        setGe:[true,true,true,true,true,true,true]
    }
    handleChange = (event) => {
        this.setState({
            selectedValue: event.target.value
        })
    };
    currencyChange = (event) => {
        this.setState({
            currency: event.target.value
        })
    }
    settingChang = (index) =>{
        let custom = this.state.setGe;
        custom[index] = custom[index] ? false : true;
        this.setState({
            setGe: custom
        })
    }  
     render() {
         console.log(timezones.getTimezones());
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Admin Setting</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.adminsetting" />} match={this.props.match} />
                 <div className="row">
                     <div className="col-lg-6 col-md-12 col-sm-12">
                        <RctCollapsibleCard
						customClasses="trafic-bar-chart"
						colClasses="d-sm-full"
						heading={<IntlMessages id="Site Settings" />}
						fullBlock
					>
                        <div className="row">
                            <div className="col-md-6 mt-5">
                                <FormControl style={{display: 'block',padding:'10px 20px'}} fullWidth>
                                    <FormGroup aria-label="position" style={{display: 'block'}} row>
                                        <InputLabel htmlFor="currency" className="ml-10">Currency</InputLabel>
                                        <Select value={this.state.currency} onChange={this.currencyChange} inputProps={{ name: 'currency', id: 'currency', }}fullWidth>
                                            <MenuItem value={''}>Select Amount</MenuItem>
                                            <MenuItem value={-1}>Unlimit</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={15}>15</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                            <MenuItem value={30}>30</MenuItem>
                                            <MenuItem value={40}>40</MenuItem>
                                            <MenuItem value={50}>50</MenuItem>
                                        </Select>
                                    </FormGroup>
                                </FormControl>
                            </div>
                            <div className="col-md-6">
                                <FormControl style={{display: 'block',padding:'10px 20px'}} fullWidth>
                                    <FormGroup aria-label="position" style={{display: 'block'}} row>
                                    <TextField
                                        margin="dense"
                                        id="timezone"
                                        label="Time Zone"
                                        type="text"
                                        fullWidth
                                    />
                                    </FormGroup>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row mt-10">
                            <div className="col-md-6">
                                <FormControl style={{display: 'block',padding:'10px 20px'}} fullWidth>
                                    <FormGroup aria-label="position" style={{display: 'block'}} row>
                                    <TextField
                                        margin="dense"
                                        id="sitename"
                                        label="Site Name"
                                        type="text"
                                        fullWidth
                                    />
                                    </FormGroup>
                                </FormControl>
                            </div>
                            <div className="col-md-6">
                                <FormControl style={{display: 'block',padding:'10px 20px'}} fullWidth>
                                    <FormGroup aria-label="position" style={{display: 'block'}} row>
                                    <TextField
                                        margin="dense"
                                        id="copyright"
                                        label="Copyright"
                                        type="text"
                                        fullWidth
                                    />
                                    </FormGroup>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <FormControl style={{display: 'block',padding:'10px 20px'}} fullWidth>
                                    <FormGroup aria-label="position" style={{display: 'block'}} row>
                                        <TextField id="description" fullWidth label="Description" multiline rows="4" className="mt-10" />
                                        <TextField id="google-analytics" fullWidth label="Google Analytics" multiline rows="4" className="mt-10" />
                                        <Button variant="contained" onClick={this.handleClose} color="primary" className="mt-60 mb-30" style={{float:'right'}}>
                                            <i className="ti-save"></i>&nbsp;Save Change
                                        </Button>
                                    </FormGroup>
                                </FormControl>
                            </div>
                        </div>
                    </RctCollapsibleCard>
                     </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="d-sm-full"
                            heading={<IntlMessages id="Settings" />}
                            collapsible
                            closeable
                            fullBlock
                        >
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 ">
                                    <FormControl style={{padding: '0 20px'}} fullWidth>
                                        <FormLabel style={{fontSize:'10px'}}>Registration System <i className=" icon-info"></i> </FormLabel>
                                        <FormGroup aria-label="position" row>
                                            <Switch onClick={()=>this.settingChang(0)} on={this.state.setGe[0]}/>
                                            <i className='material-icons' style={{color: this.state.setGe[0] ? 'green' : 'red' }}>{this.state.setGe[0] ? 'check' : 'do_not_disturb_alt'}</i>
                                        </FormGroup>
                                    </FormControl>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 ">
                                    <FormControl style={{padding: '0 20px'}} fullWidth>
                                        <FormLabel style={{fontSize:'10px'}}>Auto Approval <i className=" icon-info"></i> </FormLabel>
                                        <FormGroup aria-label="position" row>
                                        <Switch onClick={()=>this.settingChang(1)} on={this.state.setGe[1]}/>
                                            <i className='material-icons'style={{color: this.state.setGe[1] ? 'green' : 'red' }}>{this.state.setGe[1] ? 'check' : 'do_not_disturb_alt'}</i>
                                        </FormGroup>
                                    </FormControl>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 ">
                                    <FormControl style={{padding: '0 20px'}} fullWidth>
                                        <FormLabel style={{fontSize:'10px'}}>Email Verification <i className=" icon-info"></i> </FormLabel>
                                        <FormGroup aria-label="position" row>
                                        <Switch onClick={()=>this.settingChang(2)} on={this.state.setGe[2]}/>
                                        <i className='material-icons'style={{color: this.state.setGe[2] ? 'green' : 'red' }}>{this.state.setGe[2] ? 'check' : 'do_not_disturb_alt'}</i>
                                        </FormGroup>
                                    </FormControl>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 mt-30 mb-30">
                                    <FormControl style={{padding: '0 20px'}} fullWidth>
                                        <FormLabel style={{fontSize:'10px'}}>Free Verify  <i className=" icon-info"></i> </FormLabel>
                                        <FormGroup aria-label="position" row>
                                        <Switch onClick={()=>this.settingChang(3)} on={this.state.setGe[3]}/>
                                        <i className='material-icons' style={{color: this.state.setGe[3] ? 'green' : 'red' }}>{this.state.setGe[3] ? 'check' : 'do_not_disturb_alt'}</i><span style={{color: this.state.setGe[3] ? 'green' : 'red' }}> {this.state.setGe[3] ? 'On' : 'off' }</span>
                                        </FormGroup>
                                    </FormControl>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6  mt-30 mb-30">
                                    <FormControl style={{padding: '0 20px'}} fullWidth>
                                        <FormLabel style={{fontSize:'10px'}}>User Invoice <i className=" icon-info"></i> </FormLabel>
                                        <FormGroup aria-label="position" row>
                                        <Switch onClick={()=>this.settingChang(4)} on={this.state.setGe[4]}/>
                                        <i className='material-icons' style={{color: this.state.setGe[4] ? 'green' : 'red' }}>{this.state.setGe[4] ? 'check' : 'do_not_disturb_alt'}</i><span style={{color: this.state.setGe[4] ? 'green' : 'red' }}> {this.state.setGe[4] ? 'On' : 'off' }</span>
                                        </FormGroup>
                                    </FormControl>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 mt-30 mb-30">
                                    <FormControl style={{padding: '0 20px'}} fullWidth>
                                        <FormLabel style={{fontSize:'10px'}}>Rating <i className=" icon-info"></i> </FormLabel>
                                        <FormGroup aria-label="position" row>
                                        <Switch onClick={()=>this.settingChang(5)} on={this.state.setGe[5]}/>
                                        <i className='material-icons' style={{color: this.state.setGe[5] ? 'green' : 'red' }}>{this.state.setGe[5] ? 'check' : 'do_not_disturb_alt'}</i><span style={{color: this.state.setGe[5] ? 'green' : 'red' }}> {this.state.setGe[5] ? 'On' : 'off' }</span>
                                        </FormGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="d-sm-full"
                            heading={<IntlMessages id="Recaptcha" />}
                            collapsible
                            closeable
                            fullBlock
                        >
                            <FormControl style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'14px'}}>Recaptcha</FormLabel>
                                <FormGroup aria-label="position" row>
                                <Switch onClick={()=>this.settingChang(6)} on={this.state.setGe[6]}/>
                                </FormGroup>
                            </FormControl>
                            <FormControl className="mt-20" style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'14px'}}>Recaptcha Site Key</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                            <FormControl className="mt-20" style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'14px'}}>Secret Key</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                            <FormControl style={{padding:'0px 20px'}} fullWidth>
                                <FormGroup aria-label="position" style={{display: 'block'}} row>
                                    <Button variant="contained" onClick={this.handleClose} color="primary" className="mt-10 mb-30" style={{float:'right'}}>
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
 