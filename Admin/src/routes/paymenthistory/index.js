/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
 
 // intl messages
 import IntlMessages from 'Util/IntlMessages';
 import MUIDataTable from "mui-datatables";
import Axios from 'axios';
 export default class BackUpDB extends Component {
     componentWillMount() {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        Axios.post('http://localhost:8000/api/vendorpaymenthistory',{},{headers: headers}).then(res=>{
            console.log(res);
        })
     }
     render() {
        const columns = [
            {
                name: "Sl"
            },
            {
                name: 'Order Number'
            },
            {
                name: "Txn Id"
            },
            {
                name: "Amount"
            },
            {
                name: "Payment Status"
            },
            {
                name: "Payment By",
                // options:{
                //     customBodyRender: (value, tableMeta, updateValue) => (
                //         (value == 'Pending'
                //         ?<Badge color="primary" badgeContent={"Pending"} className="badge-pill"></Badge>
                //         : value)
                //     )
                // }
            },
            {
                name: "Payment Date"
            }
        ];
        const data = [
            [ "1", "111", "sd23xu2rw2", "100USD", "Norway","Paypal","2020"]
        ];
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Payment History</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.paymenthistory" />} match={this.props.match} />
                 <RctCollapsibleCard
                    heading="Payment History"
                    collapsible
                    fullBlock
                >
                    <MUIDataTable
                        title={"Payment History"}
                        data={data}
                        columns={columns}
                        // options={options}
                    />
                 </RctCollapsibleCard>
             </div>
         );
     }
 }
 