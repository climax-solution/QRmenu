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
import moment from 'moment';
import { NotificationManager } from 'react-notifications';

 export default class RestaurantList extends Component {

    state = {
        source:[],
        tmp: []
    }
    componentDidMount() {
        Axios.get(REACT_APP_BACKEND_API + 'restaurantlist').then(res=>{
            const { data } = res;
            let { source } = this.state;
            data.map((item, index)=>{
                let row = [];
                row.push(index + 1);
                row.push(item.email);
                row.push(item.package);
                row.push(moment(item.created_at).format('Y-MM-DD'));
                row.push(item.status);
                source.push(row);
            })
            this.setState({
                source: source,
                tmp: res.data
            })
        })
    }

    updatestatus(index, status) {
        const sendData = {
            id: this.state.tmp[index].id,
            status: status
        }
        Axios.post(REACT_APP_BACKEND_API + 'updateuser', sendData).then(res=>{
            const { data } = res;
            let source = [];
            data.map((item, index)=>{
                let row = [];
                row.push(index + 1);
                row.push(item.email);
                row.push(item.package);
                row.push(moment(item.created_at).format('Y-MM-DD'));
                row.push(item.status);
                source.push(row);
            })
            this.setState({
                source: source,
                tmp: res.data
            })
            NotificationManager.success('Success');
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
                        value == 0 ? <MatButton variant="contained" color="primary" className="mr-10 mb-10 text-white btn-icon" style={{minWidth:'inherit'}} onClick={()=>this.updatestatus(tableMeta.rowIndex, 1)}><i className="zmdi zmdi-flash"></i></MatButton>
                        : <MatButton variant="contained" color="danger" className="mr-10 mb-10 text-white btn-danger btn-icon" style={{minWidth:'inherit'}} onClick={()=>this.updatestatus(tableMeta.rowIndex, 0)}> <i className="zmdi zmdi-flash-off"></i></MatButton>
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
 