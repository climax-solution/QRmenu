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
import { TextField, FormControl,FormLabel,Button,Chip } from '@material-ui/core';
import ImageUploader from 'react-images-upload';
 
 export default class Allergens extends Component {
     state = {
        pictures: []
     }
     onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
     render() {
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Allergens</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.allergens" />} match={this.props.match} />
                 <div className="row">
                    <RctCollapsibleCard
                        heading="New Allergens"
                        colClasses="col-lg-6 col-md-6 col-sm-12 d-sm-full"
                        collapsible
                        closeable
                        fullBlock
                    >
                        <div className="col-md-10 offset-md-1">
                            <FormControl fullWidth>
                                <TextField margin="dense" id="name" label="Name" type="text" fullWidth/>
                            </FormControl>
                            <FormControl className="mt-30">
                                <FormLabel>Image</FormLabel>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                    singleImage={true}
                                />
                            </FormControl>
                            <FormControl style={{display:'block'}}>
                                <Button variant="contained" className="btn-info text-white mt-20 mb-10 pull-right">
                                    Submit
                                </Button>
                            </FormControl>
                        </div>
                        
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
                        heading="Allergens"
                        colClasses="col-lg-6 col-md-6 col-sm-12 d-sm-full"
                        collapsible
                        closeable
                        fullBlock
                    >
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>Sl</th>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Gluten</td>
                                            <td></td>
                                            <td><span className="badge badge-success"><i className="ti-check"></i>&nbsp;Live</span></td>
                                            <td><Button variant="contained" className="btn-info text-white pull-left"><i class="ti-pencil-alt"></i>&nbsp;Edit</Button>
                                                <Button variant="contained" className="btn-danger text-white ml-10"><i class="ti-trash"></i>&nbsp;Delete</Button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        
                    </RctCollapsibleCard>
                    
                 </div>
             </div>
         );
     }
 }
 