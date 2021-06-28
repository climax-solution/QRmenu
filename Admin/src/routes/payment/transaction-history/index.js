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

export default class TransactionHistory extends Component {
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
                        (value == 'Pending'
                        ?<Badge color="primary" badgeContent={"Pending"} className="badge-pill"></Badge>
                        : value)
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
                        (value == 'offline'
                        ?<Badge color="secondary" badgeContent={"offline"}></Badge>
                        : value)
                    )
                }
            },
            {
                name: "PaymentDate"
            }
        ];
        const data = [
            [ "1", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"]
        ];
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
