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
export default class Avaibledays extends Component {
    state = {
		checked: true,
        selectedDate: moment(),

	}
    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    };
	// on plan change
	checkChange() {
        let checked = this.state.checked;
        this.setState({
            checked: !checked
        });
    }
    handleClickShowPasssword = () => {
		this.setState({ showPassword: !this.state.showPassword });
	};
     render() {
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
                            heading={<IntlMessages id="Reservation" />}
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
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
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
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
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
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
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
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
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
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
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
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
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
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
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
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
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
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
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
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
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
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
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
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
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
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
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
                                                value={this.state.selectedDate}
                                                onChange={this.handleDateChange}
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
                            <Button variant="contained" color="primary" className="text-white btn-icon mt-10 mb-10 mr-10 pull-right">Submit</Button>
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-5" style={{height: '100%'}}>
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="d-sm-full"
                            heading={<IntlMessages id="Reservation Types" />}
                            customStyle={{overflow: 'hidden'}}
                            collapsible
                            closeable
                            fullBlock

                        >
                            <FormControl fullWidth style={{padding: '0 20px'}}>
                                <TextField margin="dense" id="paypalemail" label="Type Name" type="text" fullWidth />
                            </FormControl>
                            <Button variant="contained" color="primary" className="text-white btn-icon mt-10 mb-10 mr-10 pull-right">Submit</Button>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="d-sm-full"
                            heading={<IntlMessages id="Reservation Type List" />}
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
 