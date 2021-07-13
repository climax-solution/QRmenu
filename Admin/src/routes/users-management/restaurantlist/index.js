/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
 
 import MUIDataTable from "mui-datatables";
 import {Button as MatButton} from '@material-ui/core';

 import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

 // intl messages
 import IntlMessages from 'Util/IntlMessages';
 import Axios from 'axios';
 export default class RestaurantList extends Component {

    state = {
        source:[]
    }
    componentDidMount() {
        Axios.get(REACT_APP_BACKEND_API + 'restaurantlist').then(res=>{
            const { data } = res;
            let { source } = this.state;
            data.map((item, index)=>{
                let row = [];
                row.push(index + 1);
                row.push(item.email);
                row.push(item.packages);
                row.push(item.created_at);
                source.push(row);
            })
            this.setState({
                source: source
            })
        })
    }
     render() {
        const columns = [
            {
                name: "Name",                
            },
            {
                name: "Email Address",                
            },
            {
                name: "Package",                
            },
            {
                name: "Created Date",                
            },
            {
                name: "Action",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>
                            <MatButton variant="contained" color="primary" className="mr-10 mb-10 text-white btn-icon" style={{minWidth:'inherit'}}> <i className="zmdi zmdi-edit"></i></MatButton>
                            <MatButton variant="contained" color="danger" className="mr-10 mb-10 text-white btn-danger btn-icon" style={{minWidth:'inherit'}}> <i className="zmdi zmdi-delete"></i></MatButton>
                        </div>
                    )
                }
            }
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
						data={this.state.source}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
             </div>
         );
     }
 }
 