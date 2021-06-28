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

export default class OfflinePayment extends Component {
    render() {
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
                        (value == 'Pending'
                        ?<Badge color="secondary" badgeContent={"Pending"} className="badge-pill"></Badge>
                        : value)
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
        const data = [
            ["1","admin", "mason@gmail.com", "Prøve package - kr 0 / trial","$22222", "d1341223g3r","202020789","Pending","2020"],
        ];
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
                    <Scrollbars className="rct-scroll" autoHeight  autoHeightMin={500} autoHeightMax={700} autoWidth autoWidthMin={100} autoWidthMax={500} autoHide >
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