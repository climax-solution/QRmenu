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
export default class BackUpDB extends Component {
     render() {
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
                name: "Status",
                
            },
            {
                name: "Action",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>
                            <MatButton variant="contained" color="primary" className="mr-10 mb-10 text-white btn-icon"> <i className="zmdi zmdi-check"></i>Allow</MatButton>
                            <MatButton variant="contained" color="danger" className="mr-10 mb-10 text-white btn-danger btn-icon"> <i className="zmdi zmdi-block"></i>block</MatButton>
                        </div>
                    )
                }
            }
        ];
        const data = [
            [ "1", "111", "Alexandr", "(555) 3333", "Norway","23123adfadfadf","offline","2020"]
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
                        data={data}
                        columns={columns}
                        // options={options}
                    />
                 </RctCollapsibleCard>
             </div>
         );
     }
 }
 