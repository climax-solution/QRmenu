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
import moment from 'moment';

 export default class BackUpDB extends Component {
    state = {
        data:[]
    }
    componentWillMount() {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        Axios.post(REACT_APP_BACKEND_API + 'vendorpaymenthistory',{},{headers: headers}).then(res=>{
            const result = res.data;
            let { data } = this.state;
            result.map((row, index)=>{
                let item = [index + 1];
                const key = ['price', 'status', 'payment','created_at'];
                key.map(it => {
                    if (it == 'created_at') item.push(moment(row[it]).format('Y-MM-DD'));
                    else item.push(row[it]);
                })
                data.push( item );
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
                name: "Amount"
            },
            {
                name: "Payment Status",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                       value != 1 ? <span className="badge badge-success">success<i className=" zmdi zmdi-check ml-5"></i></span>
                       : <span className="badge badge-info">pending<i className=" zmdi zmdi-spinner ml-5"></i></span>
                    )
                }
            },
            {
                name: "Payment By",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                       <span className="badge badge-warning">{paymenttype[value]}</span>
                    )
                }
            },
            {
                name: "Payment Date"
            }
        ];
        const { data } = this.state;

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
 