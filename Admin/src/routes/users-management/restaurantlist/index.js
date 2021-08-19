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

    resetPassword(index) {
        const senddata = {
            id: this.state.tmp[index].id
        }
        
        Axios.post(REACT_APP_BACKEND_API + 'resetpassword', senddata).then(res=>{
            const { data } = res;
            if (data.status) NotificationManager.success('Password is 1234');
        })
        .catch(err=>{
            NotificationManager.success('Failure');
        })
    }
     render() {
        const { tmp } = this.state;
        const columns = [
            {
                name: "Name",
                options: {
                    customBodyRender: (value, meta) => {
                        <a
                            href={
                                tmp[meta.rowIndex].subdomain
                                ? 'https://'+tmp[meta.rowIndex].subdomain
                                : '#'
                        }>
                            {value}
                        </a>
                    }
                }
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
                            <MatButton variant="contained" color="primary" className="mr-10 mb-10 text-white btn-icon btn-info" style={{minWidth:'inherit'}} onClick={()=>this.resetPassword(tableMeta.rowIndex)}><i className="zmdi zmdi-edit"></i></MatButton>
                            <MatButton variant="contained" color="primary" className="mr-10 mb-10 text-white btn-icon" style={{minWidth:'inherit'}} onClick={()=>this.resetPassword(tableMeta.rowIndex)}><i className="zmdi zmdi-lock-outline"></i></MatButton>
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
             </div>
         );
     }
 }
 