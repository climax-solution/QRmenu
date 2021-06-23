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
 
 import MUIDataTable from "mui-datatables";
 
 import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
 
 export default class OfflinePayment extends Component {
     render() {
         const columns = ["Sl", "Username", "Email", "Package", "Price","Txn Id", "Request Date","Status","Action"];
         const data = [
             ["1", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"],
             ["2", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"],
             ["3", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"],
             ["4", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"],
             ["5", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"],
             ["6", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"],
             ["7", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"],
             ["8", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"],
             ["9", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"],
             ["10", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"],
             ["11", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"],
             ["12", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"],
             ["13", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"],
             ["14", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"],
             ["15", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "Pending","23123adfadfadf","offline","2020"],
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
  