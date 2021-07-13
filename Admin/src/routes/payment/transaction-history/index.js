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
                const key = ['username','package','price','status','txnid','payment','payment_date'];
                key.map(it=>{
                    item.push(row[it]);
                })
                data.push(item);
            })
            this.setState({
                data: data
            })
        })
    }
    render() {
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
                        <Badge color="primary" badgeContent={value} className="badge-pill"></Badge>
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
                        <Badge color="secondary" badgeContent={value}></Badge>
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
        const StatusBadge = ({status}) => (
            <Fragment>
                {status == "completed" && (
                    <p> Completed </p>
                )}
                {status != "Pending"&& (
                    <span style={{color:'red'}}> Pending </span>
                )}
            </Fragment>
        );
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
