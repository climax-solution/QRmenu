/**
 * Blank Page
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
 // page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import {NotificationManager} from 'react-notifications';
 // intl messages
import IntlMessages from 'Util/IntlMessages';

import {
    FormControl,
    TextField,
    FormLabel,
    FormGroup,
} from '@material-ui/core';
import { Button } from 'reactstrap';
import Axios from 'axios';
export default class ManageFeature extends Component {
    state = {
        feature_list: []
    }
    componentWillMount() {
        Axios.get(REACT_APP_BACKEND_API + 'featurelist').then(res=>{
            const { data } = res;
            let { feature_list } = this.state;
            data.map(row=>{
                row.status = row.status ? true : false; 
                feature_list.push(row);
            })
            //console.log(feature_list);
            this.setState({
                feature_list: feature_list
            })
        })
    }
    inputValue(index,key, value) {
        let { feature_list } = this.state;
        feature_list[index][key] = value;
        this.setState({
            feature_list: feature_list
        })
    }
    activate(index) {
        let { feature_list } = this.state;
        feature_list[index]['status'] = !feature_list[index]['status'];
        this.setState({
            feature_list: feature_list
        })
    }
    updateFeature() {
        let { feature_list } = this.state;
        Axios.post(REACT_APP_BACKEND_API + 'updatefeature', feature_list).then(res=>{
            if (res.data.success) {
                NotificationManager.success('Successfully updated!');
            }
        })
    }
     render() {
         const { feature_list } = this.state;
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Manage Feature</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.managefeature" />} match={this.props.match} />
                 <RctCollapsibleCard
                    heading="Manage Feature"
                    colClasses="col-lg-9 col-md-12 col-sm-12"
                    collapsible
                    closeable
                    fullBlock
                    row
                >
                    <div className="row" style={{padding: '0 10px'}}>
                        {
                            feature_list.map((item, index)=>{
                                return (
                                    <RctCollapsibleCard
                                        heading={`${item.feature_name}`}
                                        setable
                                        onChange={()=>this.activate(index)}
                                        checked={item.status}
                                        colClasses="col-lg-6 col-md-12 col-sm-12"
                                        customStyle={{border: '1px solid rgb(0 0 0 / 10%)'}}
                                        key={index}
                                    >
                                        <FormControl style={{padding: '0 20px'}} fullWidth>
                                            <FormLabel style={{fontSize:'1rem'}}>Heading</FormLabel>
                                            <FormGroup aria-label="position" row>
                                                <TextField type="text" fullWidth value={!item.heading ? '' : item.heading} onChange={(e)=>this.inputValue(index,'heading',e.target.value)}/>
                                            </FormGroup>
                                        </FormControl>
                                        <FormControl className="mt-20" style={{padding: '0 20px'}} fullWidth>
                                            <FormLabel style={{fontSize:'1rem'}}>Sub Heading</FormLabel>
                                            <FormGroup aria-label="position" row>
                                                <TextField type="text" value={!item.sub_heading ? '' : item.sub_heading} fullWidth onChange={(e)=>this.inputValue(index,'sub_heading',e.target.value)}/>
                                            </FormGroup>
                                        </FormControl>
                                    </RctCollapsibleCard>                                    
                                )
                            })
                        }
                        <Button color="primary" className="btn-primary pull-right ml-auto mb-10 mr-10" onClick={()=>this.updateFeature()}>Submit</Button>
                    </div>

                </RctCollapsibleCard>
             </div>
         );
     }
 }
 