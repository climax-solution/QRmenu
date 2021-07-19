/**
 * Offline Payment
 */
import React, { Component, Fragment  } from 'react';
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import { Scrollbars } from 'react-custom-scrollbars';
import {Badge,Button} from '@material-ui/core';
import MUIDataTable from "mui-datatables";

import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import axios from 'axios';
export default class OfflinePayment extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        axios.get(REACT_APP_BACKEND_API + 'offlinepayment').then(res=>{
            let { data } = this.state;
            res.data.map((row,index)=>{
                let item = [index + 1];
                const key = ['username','email','package','price','txnid','request_date','status'];
                key.map(it=>{
                    item.push(row[it]);
                })
                data.push(item);
            })
            this.setState({
                data: data
            });
        })
    }
    render() {
        console.log(this.state.data);
        const columns = [
            {
                name: "Sl"
            },
            {
                name: "Username"
            },
            {
                name: "Email"
            },
            {
                name: "Package"
            },
            {
                name: "Price",
                
            },
            {
                name: "TxnId"
            },
            {
                name: "Request Date"
            },
            {
                name: "Status",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <Badge color="secondary" badgeContent={value} className="badge-pill"></Badge>
                    )
                }
            },
            {
                name: "Action",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <Button variant="contained" color="primary">
                            Approve<i className="ti-arrow-circle-right"></i>
                        </Button>
                    )
                }
            }
        ];
        const data = this.state.data;
        const options = {
            filterType: 'dropdown',
            responsive: 'stacked'
        };
        return (
            <div className="blank-wrapper">
                <Helmet>
                    <title>Offline Payment</title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.offlinepayment" />} match={this.props.match} />
                <Fragment>
                    <Scrollbars className="rct-scroll" autoHeight  autoHeightMin={500} autoHeightMax={700} autoHide >
                        <RctCollapsibleCard heading="Offline Payment" fullBlock>
                            <MUIDataTable
                                title={"Offline Payment"}
                                data={data}
                                columns={columns}
                                options={options}
                            />
                        </RctCollapsibleCard>
                    </Scrollbars>
                </Fragment>
            </div>
        );
    }
 }