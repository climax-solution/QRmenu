/**
 * Blank Page
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

import MUIDataTable from "mui-datatables";
import {Button as MatButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';

import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import Axios from 'axios';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import { FormControl, Input } from '@material-ui/core';

 export default class RestaurantList extends Component {

    state = {
        source:[],
        tmp: [],
        open: false,
        password: '',
        confpassword: '',
        activeIndex: -1
    }
    componentDidMount() {
        Axios.get(REACT_APP_BACKEND_API + 'restaurantlist').then(res=>{
            const { data } = res;
            let { source } = this.state;
            data.map((item, index)=>{
                let row = [];
                row.push(index + 1);
                row.push(item.email);
                row.push(item.package);
                row.push(moment(item.created_at).format('Y-MM-DD'));
                row.push(item.status);
                source.push(row);
            })
            this.setState({
                source: source,
                tmp: res.data
            })
        })
    }

    updatestatus(index, status) {
        const sendData = {
            id: this.state.tmp[index].id,
            status: status
        }
        Axios.post(REACT_APP_BACKEND_API + 'updateuser', sendData).then(res=>{
            const { data } = res;
            let source = [];
            data.map((item, index)=>{
                let row = [];
                row.push(index + 1);
                row.push(item.email);
                row.push(item.package);
                row.push(moment(item.created_at).format('Y-MM-DD'));
                row.push(item.status);
                source.push(row);
            })
            this.setState({
                source: source,
                tmp: res.data
            })
            NotificationManager.success('Success');
        })
    }

    modalOpen(index) {
        this.setState({
            open: true,
            activeIndex: this.state.tmp[index].id
        })
    }
    modalClose() {
        this.setState({
            open: false,
            activeIndex: -1
        })
        this.formatPassword();
    }
    formatPassword() {
        this.setState({
            password: '',
            confpassword: ''
        })
    }
    resetPassword() {
        const { password, confpassword, activeIndex } = this.state;
        if (password != confpassword) {
            NotificationManager.warning('Confirm Password!');
            return;
        }
        const senddata = {
            password: this.state.password,
            id: activeIndex
        }
        
        Axios.post(REACT_APP_BACKEND_API + 'resetpassword', senddata).then(res=>{
            const { data } = res;
            if (data.status) NotificationManager.success('Success');
            this.modalClose();
        })
        .catch(err=>{
            NotificationManager.success('Failure');
            this.modalClose();
        })
    }
     render() {
        const columns = [
            {
                name: "Name",                
            },
            {
                name: "Email Address",                
            },
            {
                name: "Package",                
            },
            {
                name: "Created Date",                
            },
            {
                name: "Action",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>
                            <MatButton variant="contained" color="primary" className="mr-10 mb-10 text-white btn-icon" style={{minWidth:'inherit'}} onClick={()=>this.modalOpen(tableMeta.rowIndex)}><i className="zmdi zmdi-lock-outline"></i></MatButton>
                            {value == 0 ? <MatButton variant="contained" color="primary" className="mr-10 mb-10 text-white btn-icon" style={{minWidth:'inherit'}} onClick={()=>this.updatestatus(tableMeta.rowIndex, 1)}><i className="zmdi zmdi-flash"></i></MatButton>
                            : <MatButton variant="contained" className="mr-10 mb-10 text-white btn-danger btn-icon" style={{minWidth:'inherit'}} onClick={()=>this.updatestatus(tableMeta.rowIndex, 0)}> <i className="zmdi zmdi-flash-off"></i></MatButton>}
                        </div>
                        
                    )
                }
            }
        ];
		const options = {
			filterType: 'dropdown',
			responsive: 'stacked'
		};
        const { open, password, confpassword } = this.state;
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Restaurant List</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.restaurantlist" />} match={this.props.match} />
                 <RctCollapsibleCard heading="Restaurant List" fullBlock>
					<MUIDataTable
						title={"Restaurant List"}
						data={this.state.source}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
                <Dialog
                    open={open}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Reset Password</DialogTitle>
                    <DialogContent>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        <FormControl>
                            <TextField
                                placeholder="New Password"
                                value={password}
                                onChange={(e)=>this.setState({password: e.target.value})} type="password"
                                key="0"
                            />
                            <TextField
                                placeholder="Confirm Password"
                                className="mt-30"
                                value={confpassword}
                                onChange={(e)=>this.setState({confpassword: e.target.value})}
                                type="password"
                                key="1"
                            />
                        </FormControl>
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <MatButton onClick={()=>this.modalClose()} color="primary">
                        Cancel
                    </MatButton>
                    <MatButton onClick={()=>this.resetPassword()} color="primary">
                        Submit
                    </MatButton>
                    </DialogActions>
                </Dialog>
             </div>
         );
     }
 }
 