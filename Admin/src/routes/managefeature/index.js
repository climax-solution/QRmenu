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

import {
    FormControl,
    TextField,
    FormLabel,
    FormGroup,
} from '@material-ui/core';
import { Button } from 'reactstrap';
export default class BackUpDB extends Component {
     render() {
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
                        <RctCollapsibleCard
                            heading="Velkommen Side"
                            setable
                            colClasses="col-lg-6 col-md-12 col-sm-12"
                            customStyle={{border: '1px solid rgb(0 0 0 / 10%)'}}
                        >
                            <FormControl style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                            <FormControl className="mt-20" style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Sub Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            heading="Meny"
                            setable
                            colClasses="col-lg-6 col-md-12 col-sm-12"
                            customStyle={{border: '1px solid rgb(0 0 0 / 10%)'}}
                        >
                            <FormControl style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                            <FormControl className="mt-20" style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Sub Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            heading="Pakker"
                            setable
                            colClasses="col-lg-6 col-md-12 col-sm-12"
                            customStyle={{border: '1px solid rgb(0 0 0 / 10%)'}}
                        >
                            <FormControl style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                            <FormControl className="mt-20" style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Sub Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            heading="Spesialiteter"
                            setable
                            colClasses="col-lg-6 col-md-12 col-sm-12"
                            customStyle={{border: '1px solid rgb(0 0 0 / 10%)'}}
                        >
                            <FormControl style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                            <FormControl className="mt-20" style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Sub Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            heading="QR Kode"
                            setable
                            colClasses="col-lg-6 col-md-12 col-sm-12"
                            customStyle={{border: '1px solid rgb(0 0 0 / 10%)'}}
                        >
                            <FormControl style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                            <FormControl className="mt-20" style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Sub Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            heading="Whatsapp Bestilling"
                            setable
                            colClasses="col-lg-6 col-md-12 col-sm-12"
                            customStyle={{border: '1px solid rgb(0 0 0 / 10%)'}}
                        >
                            <FormControl style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                            <FormControl className="mt-20" style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Sub Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            heading="Online Bestilling"
                            setable
                            colClasses="col-lg-6 col-md-12 col-sm-12"
                            customStyle={{border: '1px solid rgb(0 0 0 / 10%)'}}
                        >
                            <FormControl style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                            <FormControl className="mt-20" style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Sub Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            heading="Reservasjon"
                            setable
                            colClasses="col-lg-6 col-md-12 col-sm-12"
                            customStyle={{border: '1px solid rgb(0 0 0 / 10%)'}}
                        >
                            <FormControl style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                            <FormControl className="mt-20" style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Sub Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            heading="Kontakter"
                            setable
                            colClasses="col-lg-6 col-md-12 col-sm-12"
                            customStyle={{border: '1px solid rgb(0 0 0 / 10%)'}}
                        >
                            <FormControl style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                            <FormControl className="mt-20" style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Sub Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                        </RctCollapsibleCard>
                        <RctCollapsibleCard
                            heading="Digital Betaling"
                            setable
                            colClasses="col-lg-6 col-md-12 col-sm-12"
                            customStyle={{border: '1px solid rgb(0 0 0 / 10%)'}}
                        >
                            <FormControl style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                            <FormControl className="mt-20" style={{padding: '0 20px'}} fullWidth>
                                <FormLabel style={{fontSize:'1rem'}}>Sub Heading</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <TextField type="text" fullWidth/>
                                </FormGroup>
                            </FormControl>
                        </RctCollapsibleCard>
                        <Button color="primary" className="btn-primary pull-right ml-auto mb-10 mr-10">Submit</Button>
                    </div>

                </RctCollapsibleCard>
             </div>
         );
     }
 }
 