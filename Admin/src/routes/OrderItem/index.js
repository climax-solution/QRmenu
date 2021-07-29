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
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaRegBell } from 'react-icons/fa';
import './custom.css';

export default class OrderItem extends Component {
    state = {
        item_list: []
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        Axios.post( REACT_APP_BACKEND_API + 'getorderitem',{ id: id}).then(res=>{
            const { data } = res.data;
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
                <div className="row">
                <RctCollapsibleCard
                    heading="Served"
                    colClasses="col-lg-6 col-md-6 col-sm-12 d-sm-full"
                    collapsible
                    closeable
                    fullBlock
                >
                    <MUIDataTable
                        title={"Order Item"}
                        data={item_list}
                        columns={columns}
                        className="mb-20"
                    />
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    heading="Served"
                    colClasses="col-lg-6 col-md-6 col-sm-12 d-sm-full"
                    collapsible
                    closeable
                    fullBlock
                >
                    <VerticalTimeline
                        layout='1-column-left'
                    >
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ borderTop: '2px solid rgb(33, 150, 243)', color: '#000' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            date="2011 - present"
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={<FaRegBell />}
                        >
                            <h3 className="vertical-timeline-element-title">Creative Director</h3>
                            <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                            <p>
                                Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                            </p>
                        </VerticalTimelineElement>
                        
                    </VerticalTimeline>
                </RctCollapsibleCard>
                </div>
                
            </div>
        );
    }
}
 