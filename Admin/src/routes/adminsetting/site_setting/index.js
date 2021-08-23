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
import { FormGroup, FormControl, TextField, Button,Select,InputLabel,MenuItem,FormLabel} from '@material-ui/core';
import timezones from 'timezone-list';
import { NotificationManager } from 'react-notifications';
import Axios from 'axios';
 export default class SiteSetting extends Component {
    state = {
        selectedValue: 'english',
        site_setting:{
            timezone:  '',
            site_name:  '',
            copyright:  '',
            description: '',
            google_analytics:  '',
        },
        recaptcha:{
            recaptcha: false,
            site_key:  '',
            secret_key:  '',
        },
        setGe:[false,false,false,false,false,false]
    }
    
    componentDidMount() {
        Axios.get(REACT_APP_BACKEND_API + 'settingstatus').then(res => {
            let { site_setting, recaptcha, setGe } = this.state;
            let { data } = res;
            //console.log(res);
            for (let key in site_setting ) {
                site_setting[key] = !data[key] ? '' : data[key];
            }
            for (let key in recaptcha ) {
                recaptcha[key] = !data[key] ? '' : data[key];
            }
            recaptcha['recaptcha'] = recaptcha['recaptcha'] == "0" ? false : true;
            setGe = data.normal_setting ? data.normal_setting : setGe;
            this.setState({
                site_setting: site_setting,
                recaptcha: recaptcha,
                setGe: setGe
            })
        })
    }
    handleChange = (event) => {
        this.setState({
            selectedValue: event.target.value
        })
    };
    settingChang = (index) =>{
        let custom = this.state.setGe;
        custom[index] = custom[index] ? false : true;
        this.setState({
            setGe: custom
        })
    }
    modifySiteSetting( arg = 0) {
        const { site_setting, setGe, recaptcha } = this.state;
        let sendData  = site_setting;
        switch (arg) {
            case 1:
                sendData = {normal_setting: setGe};
                break;
            case 2:
                sendData = recaptcha;
                break;
            default:
                break;
        }
        Axios.post(REACT_APP_BACKEND_API + 'modifycreate', sendData).then(res=>{
            NotificationManager.success('Successfully Changed!');
        })
    }
     render() {
         const timezone = timezones.getTimezones();
         const { site_setting, recaptcha, setGe } = this.state;
         console.log(1231231231);
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Admin Setting</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.site_setting" />} match={this.props.match} />
                 <div className="row">
                     <div className="col-lg-6 col-md-12 col-sm-12">
                        <RctCollapsibleCard
						customClasses="trafic-bar-chart"
						colClasses="d-sm-full"
						heading={<IntlMessages id="widgets.site_settings" />}
						fullBlock
					>
                        <div className="row">
                            <div className="col-md-12">
                                <FormControl style={{display: 'block',padding:'10px 20px'}} fullWidth>
                                    <FormGroup aria-label="position" style={{display: 'block'}} row>
                                    <InputLabel htmlFor="currency" className="ml-10">Time Zone</InputLabel>
                                        <Select value={site_setting.timezone} onChange={(e)=>this.setState({site_setting:{...site_setting, timezone: e.target.value}})} inputProps={{ name: 'timezone', id: 'timezone', }}fullWidth>
                                            {
                                                timezone.map((item,i)=>{
                                                    return <MenuItem value={item} key={i}>{item}</MenuItem>
                                                })
                                            }
                                        </Select>
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
                                        value={site_setting.site_name}
                                        onChange={(e)=>this.setState({site_setting:{...site_setting, site_name: e.target.value}})}
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
                                        value={site_setting.copyright}
                                        onChange={(e)=>this.setState({site_setting:{...site_setting, copyright: e.target.value}})}
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
                                        <TextField
                                            id="description"
                                            fullWidth
                                            label="Description"
                                            multiline rows="4"
                                            className="mt-10"
                                            value={site_setting.description}
                                            onChange={(e)=>this.setState({site_setting:{...site_setting, description: e.target.value}})}
                                        />
                                        <TextField
                                            id="google-analytics"
                                            fullWidth
                                            label="Google Analytics"
                                            multiline
                                            rows="4"
                                            value={site_setting.google_analytics}
                                            onChange={(e)=>this.setState({site_setting:{...site_setting, google_analytics: e.target.value}})}
                                            className="mt-10"
                                        />
                                        <Button variant="contained" onClick={()=>this.modifySiteSetting()} color="primary" className="mt-60 mb-30" style={{float:'right'}}>
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
                            heading={<IntlMessages id="widgets.settings" />}
                            collapsible
                            closeable
                            fullBlock
                        >
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 ">
                                    <FormControl style={{padding: '0 20px'}} fullWidth>
                                        <FormLabel style={{fontSize:'10px'}}>Registration System <i className=" icon-info"></i> </FormLabel>
                                        <FormGroup aria-label="position" row>
                                            <Switch onClick={()=>this.settingChang(0)} on={setGe[0]}/>
                                            <i className='material-icons' style={{color: setGe[0] ? 'green' : 'red' }}>{setGe[0] ? 'check' : 'do_not_disturb_alt'}</i>
                                        </FormGroup>
                                    </FormControl>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 ">
                                    <FormControl style={{padding: '0 20px'}} fullWidth>
                                        <FormLabel style={{fontSize:'10px'}}>Auto Approval <i className=" icon-info"></i> </FormLabel>
                                        <FormGroup aria-label="position" row>
                                        <Switch onClick={()=>this.settingChang(1)} on={setGe[1]}/>
                                            <i className='material-icons'style={{color: setGe[1] ? 'green' : 'red' }}>{setGe[1] ? 'check' : 'do_not_disturb_alt'}</i>
                                        </FormGroup>
                                    </FormControl>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-4 col-xs-6 ">
                                    <FormControl style={{padding: '0 20px'}} fullWidth>
                                        <FormLabel style={{fontSize:'10px'}}>Email Verification <i className=" icon-info"></i> </FormLabel>
                                        <FormGroup aria-label="position" row>
                                        <Switch onClick={()=>this.settingChang(2)} on={setGe[2]}/>
                                        <i className='material-icons'style={{color: setGe[2] ? 'green' : 'red' }}>{setGe[2] ? 'check' : 'do_not_disturb_alt'}</i>
                                        </FormGroup>
                                    </FormControl>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 mt-30 mb-30">
                                    <FormControl style={{padding: '0 20px'}} fullWidth>
                                        <FormLabel style={{fontSize:'10px'}}>Free Verify  <i className=" icon-info"></i> </FormLabel>
                                        <FormGroup aria-label="position" row>
                                        <Switch onClick={()=>this.settingChang(3)} on={setGe[3]}/>
                                        <i className='material-icons' style={{color: setGe[3] ? 'green' : 'red' }}>{setGe[3] ? 'check' : 'do_not_disturb_alt'}</i><span style={{color: setGe[3] ? 'green' : 'red' }}> {setGe[3] ? 'On' : 'off' }</span>
                                        </FormGroup>
                                    </FormControl>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6  mt-30 mb-30">
                                    <FormControl style={{padding: '0 20px'}} fullWidth>
                                        <FormLabel style={{fontSize:'10px'}}>User Invoice <i className=" icon-info"></i> </FormLabel>
                                        <FormGroup aria-label="position" row>
                                        <Switch onClick={()=>this.settingChang(4)} on={setGe[4]}/>
                                        <i className='material-icons' style={{color: setGe[4] ? 'green' : 'red' }}>{setGe[4] ? 'check' : 'do_not_disturb_alt'}</i><span style={{color: setGe[4] ? 'green' : 'red' }}> {setGe[4] ? 'On' : 'off' }</span>
                                        </FormGroup>
                                    </FormControl>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 mt-30 mb-30">
                                    <FormControl style={{padding: '0 20px'}} fullWidth>
                                        <FormLabel style={{fontSize:'10px'}}>Rating <i className=" icon-info"></i> </FormLabel>
                                        <FormGroup aria-label="position" row>
                                        <Switch onClick={()=>this.settingChang(5)} on={setGe[5]}/>
                                        <i className='material-icons' style={{color: setGe[5] ? 'green' : 'red' }}>{setGe[5] ? 'check' : 'do_not_disturb_alt'}</i><span style={{color: setGe[5] ? 'green' : 'red' }}> {setGe[5] ? 'On' : 'off' }</span>
                                        </FormGroup>
                                    </FormControl>
                                </div>
                                <div className="col-md-12" style={{display: 'block'}}>
                                    <Button variant="contained" onClick={()=>this.modifySiteSetting(1)} color="primary" className="mb-20 mr-10" style={{float:'right'}}>
                                        <i className="ti-save"></i>&nbsp;Save Change
                                    </Button>
                                </div>
                                
                            </div>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="d-sm-full"
                            heading={<IntlMessages id="widgets.recaptcha" />}
                            collapsible
                            closeable
                            fullBlock
                        >
                            <FormControl style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'14px'}}>Recaptcha</FormLabel>
                                <FormGroup aria-label="position" row>
                                <Switch onClick={(e)=>this.setState({recaptcha:{...recaptcha, recaptcha: !recaptcha.recaptcha}})} on={recaptcha.recaptcha}/>
                                </FormGroup>
                            </FormControl>
                            <FormControl className="mt-20" style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'14px'}}>Recaptcha Site Key</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField
                                        type="text"
                                        fullWidth
                                        value={recaptcha.site_key}
                                        onChange={(e)=>this.setState({recaptcha:{...recaptcha, site_key: e.target.value}})}
                                    />
                                </FormGroup>
                            </FormControl>
                            <FormControl className="mt-20" style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'14px'}}>Secret Key</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField
                                        type="text"
                                        fullWidth
                                        value={recaptcha.secret_key}
                                        onChange={(e)=>this.setState({recaptcha:{...recaptcha,secret_key: e.target.value}})}
                                    />
                                </FormGroup>
                            </FormControl>
                            <FormControl style={{padding:'0px 20px'}} fullWidth>
                                <FormGroup aria-label="position" style={{display: 'block'}} row>
                                    <Button variant="contained" onClick={()=>this.modifySiteSetting(2)} color="primary" className="mt-10 mb-20" style={{float:'right'}}>
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
 