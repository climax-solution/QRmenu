/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

 import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Col,
	FormFeedback
} from 'reactstrap';
 
 import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
 // intl messages
 import IntlMessages from 'Util/IntlMessages';
 
 export default class AddNewUser extends Component {
     render() {
         return (
             <div className="blank-wrapper">
                <Helmet>
                    <title>Add new restaurant</title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.newuser" />} match={this.props.match} />
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <RctCollapsibleCard>
                            <Form>
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input type="text" name="username" id="username" placeholder="Restaurant Username" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" placeholder="Email Address" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="package">Package</Label>
									<Input type="select" name="package" id="package">
										<option>Select Package</option>
										<option value="1">Prøve package - kr 0 / trial</option>
										<option value="2">Payment package - kr 300 / monthly</option>
									</Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" />
                                </FormGroup>
                                <Button color="primary" block>Submit</Button>
                            </Form>
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-md-3"></div>
                </div>
             </div>
         );
     }
 }
 