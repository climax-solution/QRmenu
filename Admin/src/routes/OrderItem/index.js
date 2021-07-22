/**
 * Blank Page
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import MUIDataTable from 'mui-datatables';
import Axios from 'axios';

export default class OrderItem extends Component {
    state = {
        item_list: []
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        Axios.post( REACT_APP_BACKEND_API + 'getorderitem',{ id: id}).then(res=>{
            const { data } = res;
            let item_list = [];
            data.map((item, index)=>{
                let row = [index + 1];
                const key_list = ['item_name','img_url','qty','price'];
                key_list.map(key=>{
                    row.push(item[key]); 
                })
                item_list.push(row);
            })
            this.setState({
                item_list: item_list
            })
        })
    }
    render() {
        const { item_list } = this.state;
        //console.log(item_list);
        const columns = [
            {
                name: "Sl"
            },
            {
                name: "Name"
            },
            {
                name: "Photo",
                options:{
                    customBodyRender: (value) => (
                        <img src={REACT_APP_BACKEND_HOST + 'images/' + value} alt={value} style={{width: '100px', height: '100px'}}/>
                    )
                }
            },
            {
                name: "Qty"
            },
            {
                name: "Price"
            }
        ];
        return (
            <div className="blank-wrapper">
                <Helmet>
                    <title>Order Item</title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.orderitem" />} match={this.props.match} />
                <MUIDataTable
                    title={"Order Item"}
                    data={item_list}
                    columns={columns}
                    className="mb-20"
                />
            </div>
        );
    }
}
 