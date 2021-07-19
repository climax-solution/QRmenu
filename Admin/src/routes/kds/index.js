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
import axios from 'axios';
 const textEffect = {
    textShadow:'0 1px 0 hsl(174,5%,80%),0 2px 0 hsl(174,5%,75%),0 3px 0 hsl(174,5%,70%), 0 4px 0 hsl(174,5%,66%),0 5px 0 hsl(174,5%,64%),0 6px 0 hsl(174,5%,62%),0 7px 0 hsl(174,5%,61%), 0 8px 0 hsl(174,5%,60%), 0 0 5px rgba(0,0,0,.05), 0 1px 3px rgba(0,0,0,.2), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.2),  0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.3)',
    fontSize: '6rem',
    color: 'white',
    textAlign: 'center'
 };
 export default class KDS extends Component {
     state = {
         list : {
             new: 0,
             accept: 0,
             complete: 0
         }
     }
     componentDidMount() {
        const headers = {
            'Accept':'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
         axios.post(REACT_APP_BACKEND_API + 'getkds',{},{headers: headers}).then(res=>{
             const { data } = res;
             if (data.status) {
                this.setState({
                    list: data.data
                })
             }
         })
     }
     render() {
         const { list } = this.state;
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>KDS</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.kds" />} match={this.props.match} />
                 <div className="row">
                    <RctCollapsibleCard
                        heading="New Order"
                        colClasses="col-lg-3 col-md-6 col-sm-12 d-sm-full"
                        collapsible
                        closeable
                        fullBlock
                    >
                        <p style={textEffect}>{list.new}</p>
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
                        heading="Accepted"
                        colClasses="col-lg-3 col-md-6 col-sm-12 d-sm-full"
                        collapsible
                        closeable
                        fullBlock
                    >
                        <p style={textEffect}>{list.accept}</p>
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
                        heading="Completed"
                        colClasses="col-lg-3 col-md-6 col-sm-12 d-sm-full"
                        collapsible
                        closeable
                        fullBlock
                    >
                        <p style={textEffect}>{list.complete}</p>
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
                        heading="Served"
                        colClasses="col-lg-3 col-md-6 col-sm-12 d-sm-full"
                        collapsible
                        closeable
                        fullBlock
                    >
                        <p style={textEffect}>{list.complete}</p>
                    </RctCollapsibleCard>
                 </div>
             </div>
         );
     }
 }
 