import React, { Component } from 'react'
import { Helmet } from "react-helmet";
// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// import * as Switch from 'react-toggle-switch';
import { IconButton, Input, FormControl, TextField, Button,InputLabel,Checkbox,InputAdornment,FormControlLabel } from '@material-ui/core';
// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { TimePicker } from 'material-ui-pickers';
import moment from 'moment';

import {Table, TableHead, TableBody, TableFooter,TableRow, TableCell} from '@material-ui/core';
import InputAdornments from './input-adornment';
import { NotificationManager } from 'react-notifications';
import Axios from 'axios';
export default class Avaibledays extends Component {
    state = {
		checked: true,
        selectedDate: '22:15:00',
        timelist: {
            sun_mor: moment(),
            sun_aft: moment(),
            mon_mor: moment(),
            mon_aft: moment(),
            tue_mor: moment(),
            tue_aft: moment(),
            wed_mor: moment(),
            wed_aft: moment(),
            thu_mor: moment(),
            thu_aft: moment(),
            fri_mor: moment(),
            fri_aft: moment(),
            sat_mor: moment(),
            sat_aft: moment(),
        },
        type_name: ''
	}
    componentDidMount() {
        const headers = {
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        Axios.post(REACT_APP_BACKEND_API + 'gettimelist',{},headers).then(res=>{
            const { data } = res;
            const { timelist } = this.state;
            if ( data ) {
                for (let key in timelist) {
                    timelist[key] = !data[key] ? moment() : data[key];
                }
                this.setState({
                    timelist: timelist,
                    type_name: data['type_name']
                })
            }
            //console.log(timelist);
            
        })
    }
	checkChange() {
        let checked = this.state.checked;
        this.setState({
            checked: !checked
        });
    }
    updateTimeList = () => {
		const { timelist } = this.state;
        const headers = {
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        Axios.post(REACT_APP_BACKEND_API + 'updatetimelist',timelist,headers).then(res=>{
            if (res.data.success) {
                NotificationManager.success('Success!');
            }
            else {
                NotificationManager.error('Failure!');
            }
        })
	};
    updateTypeName = () => {
		const { type_name } = this.state;
        const headers = {
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        Axios.post(REACT_APP_BACKEND_API + 'updatetimelist',{type_name: type_name},headers).then(res=>{
            if (res.data.success) {
                NotificationManager.success('Success!');
            }
            else {
                NotificationManager.error('Failure!');
            }
        })
	};
     render() {
        const { timelist,type_name } = this.state;
        //console.log(process.env.REACT_APP_BACKEND_API);
       
        return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Avaible Days</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.avaible" />} match={this.props.match} />
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-7">
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="col-sm-12 col-md-12 d-sm-full"
                            heading={<IntlMessages id="widgets.reservation" />}
                            collapsible
                            closeable
                            fullBlock
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Days</TableCell>
                                        <TableCell>Start Time</TableCell>
                                        <TableCell>End Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <FormControlLabel
                                                control={<Checkbox color="primary" checked={this.state.checked}
                                                onChange={()=>this.checkChange()}/>}
                                                label="Sunday"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TimePicker
                                                value={new Date(timelist.sun_mor)}
                                                onChange={(date)=>this.setState({
                                                    timelist:{...timelist, sun_mor: date.toString()}
                                                })}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="end" className="date-picker-icon">
                                                        <IconButton><i className="zmdi zmdi-alarm" /></IconButton>
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TimePicker
                                                value={new Date(timelist.sun_aft)}
                                                onChange={(date)=>this.setState({
                                                    timelist:{...timelist, sun_aft: date.toString()}
                                                })}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="end" className="date-picker-icon">
                                                        <IconButton><i className="zmdi zmdi-alarm" /></IconButton>
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <FormControlLabel
                                                control={<Checkbox color="primary" checked={this.state.checked}
                                                onChange={()=>this.checkChange()}/>}
                                                label="Monday"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TimePicker
                                                value={new Date(timelist.mon_mor)}
                                                onChange={(date)=>this.setState({
                                                    timelist:{...timelist, mon_mor: date.toString()}
                                                })}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="end" className="date-picker-icon">
                                                        <IconButton><i className="zmdi zmdi-alarm" /></IconButton>
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TimePicker
                                                value={new Date(timelist.mon_aft)}
                                                onChange={(date)=>this.setState({
                                                    timelist:{...timelist, mon_aft: date.toString()}
                                                })}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="end" className="date-picker-icon">
                                                        <IconButton><i className="zmdi zmdi-alarm" /></IconButton>
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <FormControlLabel
                                                control={<Checkbox color="primary" checked={this.state.checked}
                                                onChange={()=>this.checkChange()}/>}
                                                label="Tuesday"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TimePicker
                                                value={new Date(timelist.tue_mor)}
                                                onChange={(date)=>this.setState({
                                                    timelist:{...timelist, tue_mor: date.toString()}
                                                })}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="end" className="date-picker-icon">
                                                        <IconButton><i className="zmdi zmdi-alarm" /></IconButton>
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TimePicker
                                                value={new Date(timelist.tue_aft)}
                                                onChange={(date)=>this.setState({
                                                    timelist:{...timelist, tue_aft: date.toString()}
                                                })}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="end" className="date-picker-icon">
                                                        <IconButton><i className="zmdi zmdi-alarm" /></IconButton>
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <FormControlLabel
                                                control={<Checkbox color="primary" checked={this.state.checked}
                                                onChange={()=>this.checkChange()}/>}
                                                label="Wednesday"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TimePicker
                                                value={new Date(timelist.wed_mor)}
                                                onChange={(date)=>this.setState({
                                                    timelist:{...timelist, wed_mor: date.toString()}
                                                })}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="end" className="date-picker-icon">
                                                        <IconButton><i className="zmdi zmdi-alarm" /></IconButton>
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TimePicker
                                                value={new Date(timelist.wed_aft)}
                                                onChange={(date)=>this.setState({
                                                    timelist:{...timelist, wed_aft: date.toString()}
                                                })}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="end" className="date-picker-icon">
                                                        <IconButton><i className="zmdi zmdi-alarm" /></IconButton>
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <FormControlLabel
                                                control={<Checkbox color="primary" checked={this.state.checked}
                                                onChange={()=>this.checkChange()}/>}
                                                label="Thursday"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TimePicker
                                                value={new Date(timelist.thu_mor)}
                                                onChange={(date)=>this.setState({
                                                    timelist:{...timelist, thu_mor: date.toString()}
                                                })}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="end" className="date-picker-icon">
                                                        <IconButton><i className="zmdi zmdi-alarm" /></IconButton>
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TimePicker
                                                value={new Date(timelist.thu_aft)}
                                                onChange={(date)=>this.setState({
                                                    timelist:{...timelist, thu_aft: date.toString()}
                                                })}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="end" className="date-picker-icon">
                                                        <IconButton><i className="zmdi zmdi-alarm" /></IconButton>
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <FormControlLabel
                                                control={<Checkbox color="primary" checked={this.state.checked}
                                                onChange={()=>this.checkChange()}/>}
                                                label="Friday"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TimePicker
                                                value={new Date(timelist.fri_mor)}
                                                onChange={(date)=>this.setState({
                                                    timelist:{...timelist, fri_mor: date.toString()}
                                                })}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="end" className="date-picker-icon">
                                                        <IconButton><i className="zmdi zmdi-alarm" /></IconButton>
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TimePicker
                                                value={new Date(timelist.fri_aft)}
                                                onChange={(date)=>this.setState({
                                                    timelist:{...timelist, fri_aft: date.toString()}
                                                })}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="end" className="date-picker-icon">
                                                        <IconButton><i className="zmdi zmdi-alarm" /></IconButton>
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <FormControlLabel
                                                control={<Checkbox color="primary" checked={this.state.checked}
                                                onChange={()=>this.checkChange()}/>}
                                                label="Saturday"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TimePicker
                                                value={new Date(timelist.sat_mor)}
                                                onChange={(date)=>this.setState({
                                                    timelist:{...timelist, sat_mor: date.toString()}
                                                })}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="end" className="date-picker-icon">
                                                        <IconButton><i className="zmdi zmdi-alarm" /></IconButton>
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TimePicker
                                                value={new Date(timelist.sat_aft)}
                                                onChange={(date)=>this.setState({
                                                    timelist:{...timelist, sat_aft: date.toString()}
                                                })}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment position="end" className="date-picker-icon">
                                                        <IconButton><i className="zmdi zmdi-alarm" /></IconButton>
                                                    </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Button variant="contained" color="primary" className="text-white btn-icon mt-10 mb-10 mr-10 pull-right" onClick={()=>this.updateTimeList()}>Submit</Button>
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-5" style={{height: '100%'}}>
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="d-sm-full"
                            heading={<IntlMessages id="widgets.reservation_types" />}
                            customStyle={{overflow: 'hidden'}}
                            collapsible
                            closeable
                            fullBlock
                        >
                            <FormControl fullWidth style={{padding: '0 20px'}}>
                                <TextField margin="dense" id="paypalemail" label="Type Name" type="text" value={!type_name ? '' : type_name} onChange={(e)=>this.setState({
                                    type_name: e.target.value
                                })} fullWidth />
                            </FormControl>
                            <Button variant="contained" color="primary" className="text-white btn-icon mt-10 mb-10 mr-10 pull-right" onClick={()=>this.updateTypeName()}>Submit</Button>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="d-sm-full"
                            heading={<IntlMessages id="widgets.reservation_type_list" />}
                            collapsible
                            closeable
                            fullBlock
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Days</TableCell>
                                        <TableCell>Start Time</TableCell>
                                        <TableCell>End Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                </TableBody>
                            </Table>
                            
                        </RctCollapsibleCard>
                    </div>
                    
                </div>
             </div>
         );
     }
 }
 