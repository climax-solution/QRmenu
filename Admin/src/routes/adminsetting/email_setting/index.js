import React, { Component } from "react";
import { Helmet } from "react-helmet";
import IntlMessages from 'Util/IntlMessages';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Button, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import { Label, Input } from 'reactstrap';
import Axios from "axios";
import { NotificationManager } from "react-notifications";

export default class EmailSetting extends Component {
    state = {
        setting: {
            regist_subject: '',
            payment_subject: '',
            recovery_password: '',
            email: '0'
        }
    }
    componentDidMount() {
        Axios.post(REACT_APP_BACKEND_API + 'get_email_setting').then(res=>{
            const { data } = res;
            if (Object.keys(data).length) {
                const { setting } = this.state;
                for (const key in setting) {
                    setting[key] = data[key];
                }
                this.setState({
                    setting: setting
                })
            }
        })
    }

    modifyCreate() {
        const { setting } = this.state;
        Axios.post(REACT_APP_BACKEND_API + 'modifyEmailCreate', setting).then(res => {
            const { data } = res;
            if (data.success) {
                NotificationManager.success('Success');
            }
        }).catch(err => {
            NotificationManager.error('Failed');
        })
    }
    render() {
        const { setting } = this.state;
        return (
            <div className="blank-wrapper">
                 <Helmet>
                     <title>Email Setting</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.email_setting" />} match={this.props.match} />
                 <div className="row">
                     <div className="col-lg-6 col-md-12 col-sm-12 offset-md-3">
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="d-sm-full"
                            heading={<IntlMessages id="sidebar.email_setting" />}
                            fullBlock
                        >
                            <FormControl style={{display: 'block',padding:'10px 20px'}} fullWidth>
                                <FormGroup aria-label="position" style={{display: 'block'}} row>
                                    <TextField
                                        margin="dense"
                                        id="regist-subject"
                                        label="Registration Email Subject"
                                        type="text"
                                        className="mt-15"
                                        value={setting.regist_subject}
                                        onChange={(e) => this.setState({
                                            setting: { ...setting, regist_subject: e.target.value }
                                        })}
                                        fullWidth
                                    />
                                    <TextField
                                        margin="dense"
                                        id="payment-subject"
                                        label="Payment Mail Subject"
                                        type="text"
                                        className="mt-15"
                                        value={setting.payment_subject}
                                        onChange={(e) => this.setState({
                                            setting: { ...setting, payment_subject: e.target.value }
                                        })}
                                        fullWidth
                                    />
                                    <TextField
                                        margin="dense"
                                        id="recovery-password"
                                        label="Recovery Passowrd"
                                        type="text"
                                        className="mt-15"
                                        value={setting.recovery_password}
                                        onChange={(e) => this.setState({
                                            setting: { ...setting, recovery_password: e.target.value }
                                        })}
                                        fullWidth
                                    />
                                </FormGroup>                                
                            </FormControl>
                            <FormControl component="fieldset" style={{display: 'block',padding:'10px 20px'}} fullWidth>
                                <RadioGroup
                                    style={{ flexDirection: 'row' }}
                                    value={setting.email}
                                    onChange={
                                        (e) => this.setState({
                                            setting: {
                                                ...setting,
                                                email: e.target.value
                                            }
                                        })
                                    }
                                >
                                    <FormControlLabel
                                        value="0"
                                        control={<Radio color="primary"/>}
                                        label="PHP Mail" />
                                    <FormControlLabel
                                        value="1"
                                        control={<Radio color="primary"/>}
                                        label="SMTP"
                                    />
                                </RadioGroup>
                                <Button variant="contained" color="primary" className=" mb-20 pull-right" onClick={() => this.modifyCreate()}>Save changes</Button>
                            </FormControl>
                        </RctCollapsibleCard>
                    </div>
                </div>
            </div>
        )
    }
}