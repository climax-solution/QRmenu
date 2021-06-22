/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
 
 import MUIDataTable from "mui-datatables";

 import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

 // intl messages
 import IntlMessages from 'Util/IntlMessages';
 
 export default class RestaurantList extends Component {
     render() {
        const columns = ["Name", "Email Address", "Package", "Create Date", "Earning"];
		const data = [
			["Mason Ray", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "$142,000"],
            ["Mason Ray", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "$142,000"],
            ["Mason Ray", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "$142,000"],
            ["Mason Ray", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "$142,000"],
            ["Mason Ray", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "$142,000"],
            ["Mason Ray", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "$142,000"],
            ["Mason Ray", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "$142,000"],
            ["Mason Ray", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "$142,000"],
            ["Mason Ray", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "$142,000"],
            ["Mason Ray", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "$142,000"],
            ["Mason Ray", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "$142,000"],
            ["Mason Ray", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "$142,000"],
            ["Mason Ray", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "$142,000"],
            ["Mason Ray", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "$142,000"],
            ["Mason Ray", "mason@gmail.com", "Prøve package - kr 0 / trial", "2020-01-01 10:00:00", "$142,000"],
		];
        const options = {
			filterType: 'dropdown',
			responsive: 'stacked'
		};
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Restaurant List</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.restaurantlist" />} match={this.props.match} />
                 <RctCollapsibleCard heading="Restaurant List" fullBlock>
					<MUIDataTable
						title={"Restaurant List"}
						data={data}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
             </div>
         );
     }
 }
 