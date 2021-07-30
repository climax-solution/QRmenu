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
import { Drawer } from '@material-ui/core';
import Axios from  'axios';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { Link } from 'react-router-dom';
import OrderItem from './OrderItem';

export default class LiveOrder extends Component {
    state = {
        tmp: [],
        order_list: [],
    	customizer: false,
        activeID: -1
    }
    componentDidMount() {
        const headers = {
            'Accept':'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        Axios.post(REACT_APP_BACKEND_API + 'orderlist',{},{headers: headers}).then(res=>{
            const { data } = res;
            this.resetStates(data);
        })
    }

    updateItem( index, status ) {
        const { tmp } = this.state;
        const headers = {
            'Accept':'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        Axios.post(REACT_APP_BACKEND_API + 'updateorder', {id: tmp[index].id, status: status},{headers:headers}).then(res=>{
            const { data } = res;
            if ( data.status ) {
                this.resetStates(data.data);
                NotificationManager.success('Success!');
            }
        })
    }

    resetStates(data) {
        let tmp = [], order_list = [];
        data.map((item, index)=>{
            tmp.push(item);
            let row = [index + 1];
            const key = ['id','name','phone','address','order_type','status','status'];
            key.map(it => {
                row.push(item[it]);
            })
            order_list.push(row);
        })
        this.setState({
            order_list: order_list,
            tmp: tmp
        })
    }
    quickView(index) {
        const { tmp } = this.state;
        this.setState({
            activeID: tmp[index].id,
            customizer: true
        })
    }
     render() {
        const { order_list } = this.state;
        const ordertype = ['Kontantbetaling ved levering', 'Bestilling', 'Henting'];
        // const ordertype = ['PayPal', 'Stripe', 'Razor' , 'Bambora'];
        const columns = [
            {
                name: "Sl"
            },
            {
                name: 'Order Number'
            },
            {
                name: "Name"
            },
            {
                name: "Phone"
            },
            {
                name: "Address"
            },
            {
                name: "OrderType",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        (<span className="badge badge-info">{ordertype[value]}</span>)
                    )
                }
            },
            {
                name: "Status",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <span
                            className={`badge ${value == '0' ? 'badge-primary' : 'badge-info'}`}
                        >
                            {value == '-1' ? 'Blocked' : value == '0' ? 'Pending': value == '1' ? 'Allowed' : 'Completed'}
                        </span>
                    )
                }
            },
            {
                name: "Action",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>
                            <MatButton
                                variant="contained"
                                className="btn-success mr-10 mb-10 text-white btn-icon"
                                onClick={()=>this.quickView(tableMeta.rowIndex)}
                            >
                                <i className="zmdi zmdi-eye"></i>
                                View
                            </MatButton>
                            {
                                value > '-1' && <MatButton
                                    variant="contained"
                                    className="mr-10 mb-10 text-white btn-icon btn-primary"
                                    onClick={() => this.updateItem(tableMeta.rowIndex, value < '1' ? '1' : '2' )}
                                    disabled={value == '2' ? true : false}
                                >
                                    <i
                                        className="zmdi zmdi-check"
                                    ></i>
                                    {value == '1' ? 'Complete' : value == '0'  ? 'Allow' : 'Completed'}
                                </MatButton>
                            }
                            {
                                value == '0' &&
                                <MatButton
                                    variant="contained"
                                    className="mr-10 mb-10 text-white btn-danger btn-icon"  onClick={() => this.updateItem(tableMeta.rowIndex, '-1')}
                                >
                                    <i className="zmdi zmdi-block"></i>Block
                                </MatButton>
                            }
                        </div>
                    )
                }
            }
        ];
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Live Order</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.liveorder" />} match={this.props.match} />
                 <RctCollapsibleCard
                    heading="Live Order"
                    collapsible
                    fullBlock
                >
                    <MUIDataTable
                        title={"Live Order"}
                        data={order_list}
                        columns={columns}
                        // options={options}
                    />
                    <Drawer
                        anchor={'left'}
                        open={this.state.customizer}
                        onClose={() => this.setState({ customizer: false })}
                        >
                        <OrderItem id={this.state.activeID} resetState={(data)=>this.resetStates(data)}/>
                    </Drawer>
                 </RctCollapsibleCard>
             </div>
         );
     }
 }
 