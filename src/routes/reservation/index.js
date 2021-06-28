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

export default class BackUpDB extends Component {
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
                        (value == 'pending'
                        ?<Badge color="primary" badgeContent={"pending"} className="badge-pill"></Badge>
                        : value)
                    )
                }
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
            // [ "1", "111", "Alexandr", "(555) 3333", "Norway","any","offline","pending"]
        ];
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
                        data={data}
                        columns={columns}
                        // options={options}
                    />
                 </RctCollapsibleCard>
             </div>
         );
     }
 }
 