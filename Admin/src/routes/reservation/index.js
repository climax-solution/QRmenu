/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
 import {Button as MatButton} from '@material-ui/core';
 // intl messages
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import MUIDataTable from "mui-datatables";
import { Badge } from '@material-ui/core';
import { NotificationManager } from 'react-notifications';
import Axios from 'axios';
export default class BackUpDB extends Component {
    state = {
        list: []
    }
    componentWillMount() {
        const headers = {
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        const sort = { sort: 'today' };
        Axios.post(REACT_APP_BACKEND_API + 'reservation_list',sort, headers).then(res=>{
            const { data } = res;
            let { list } = this.state;
            data.map((item, index)=>{
                let row = [index + 1];
                const key = ['order_id','order_name','phone','order_type','overview','comments','status'];
                key.map(it=>{
                    row.push(item[it]);
                })
                list.push(row);
            })
            this.setState({
                list: list
            })
        })
    }

    updateItem = (arg, state) => {
        const { list } = this.state;
        console.log(list);
        const data = {
            order_id: list[arg][1],
            // vendor: list[arg].vendor,
            status: state == 'allow' ? '1' : '-1'
        }
        console.log(data);
        Axios.post(REACT_APP_BACKEND_API + 'updateitem',data).then(res=>{
            if (res.data.success) {
                NotificationManager.success('Success!');
            }
            else {
                NotificationManager.error('failure!');
            }
        })
    }
     render() {
        const columns = [
            {
                name: "Sl"
            },
            {
                name: 'Order ID'
            },
            {
                name: "Name"
            },
            {
                name: "Phone"
            },
            {
                name: "OrderType",
                // options:{
                //     customBodyRender: (value, tableMeta, updateValue) => (
                //         (value == 'Pending'
                //         ?<Badge color="primary" badgeContent={"Pending"} className="badge-pill"></Badge>
                //         : value)
                //     )
                // }
            },
            {
                name: "Overview"
            },
            {
                name: "Comments"
            },
            {
                name: "Status",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        (value == '0'
                        ? <Badge color="primary" badgeContent={"pending"} className="badge-pill"></Badge>
                        : value == '1' ? <Badge color="primary" badgeContent={"allowed"} className="badge-pill"></Badge> : <Badge color="error" badgeContent={"blocked"} className="badge-pill"></Badge> )
                    )
                }
            },
            {
                name: "Action",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>
                            <MatButton variant="contained" color="primary" className="mr-10 mb-10 text-white btn-icon" onClick={()=>this.updateItem(tableMeta.rowIndex, 'allow')}> <i className="zmdi zmdi-check"></i>Allow</MatButton>
                            <MatButton variant="contained" color="danger" className="mr-10 mb-10 text-white btn-danger btn-icon" onClick={()=>this.updateItem(tableMeta.rowIndex, 'block')}> <i className="zmdi zmdi-block"></i>block</MatButton>
                        </div>
                    )
                }
            }
        ];
        const { list } = this.state;
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Reservation</title>
                     <meta name="description" content="reservation" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.reservation" />} match={this.props.match} />
                 <RctCollapsibleCard
                    heading="Reversation"
                    collapsible
                    fullBlock
                >
                    <MUIDataTable
                        data={list}
                        columns={columns}
                        // options={options}
                    />
                 </RctCollapsibleCard>
             </div>
         );
     }
 }
 