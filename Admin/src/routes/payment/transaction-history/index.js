import React, { Component, Fragment } from 'react';

import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import { Scrollbars } from 'react-custom-scrollbars';

import MUIDataTable from "mui-datatables";

import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import { Badge,Media } from '@material-ui/core';
import moment from 'moment';
import axios from 'axios';
export default class TransactionHistory extends Component {
    state = {
        data: []
    }
    componentWillMount() {
        axios.get(REACT_APP_BACKEND_API + 'transactionhistory').then(res=>{
            const { data } = this.state;
            res.data.map((row, index)=>{
                let item = [index + 1];
                const key = ['username','package','price','status','txnid','payment','created_at'];
                key.map(it=>{
                    if (it == 'created_at') item.push(moment(row[it]).format('Y-MM-DD'));
                    else item.push(row[it]);
                })
                data.push(item);
            })
            this.setState({
                data: data
            })
        })
    }
    render() {
        const paymenttype = ['PayPal', 'Stripe', 'Razor' , 'Bambora','Offline'];
        const columns = [
            {
                name: "Sl"
            },
            {
                name: "Name"
            },
            {
                name: "PackageName"
            },
            {
                name: "Price"
            },
            {
                name: "Status",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        (
                        value == 1 ? <span className="badge badge-success">success</span>
                        :  <span className="badge badge-info">pending</span>
                        )
                    )
                }
            },
            {
                name: "TxnId"
            },
            {
                name: "PaymentBy",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        (
                            value == 0 ? <span className="badge badge-success">{paymenttype[value]}</span>
                            : value == 1 ? <span className="badge badge-info">{paymenttype[value]}</span>
                            : value == 2 ? <span className="badge badge-primary">{paymenttype[value]}</span>
                            : value == 3 ? <span className="badge badge-warning">{paymenttype[value]}</span>
                            : <span className="badge badge-danger">{paymenttype[value]}</span>
                        )
                    )
                }
            },
            {
                name: "PaymentDate"
            }
        ];
        const data = this.state.data;
        // const options = {
        //     filterType: 'dropdown',
        //     responsive: 'stacked'
        // };
        return (
            <div className="blank-wrapper">
                <Helmet>
                <title>Transaction History</title>
                <meta name="description" content="Reactify Blank Page" />
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.transactionhistory" />} match={this.props.match} />
                <RctCollapsibleCard heading="Transaction History" fullBlock>
                    <MUIDataTable
                        title={"Transaction History"}
                        data={data}
                        columns={columns}
                        // options={options}
                    />
                </RctCollapsibleCard>
            </div>
        );
    }
}
