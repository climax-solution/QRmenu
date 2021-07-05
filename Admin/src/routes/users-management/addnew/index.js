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
import Axios from 'axios';
import { NotificationManager } from 'react-notifications';
import validator from 'validator';

 export default class AddNewUser extends Component {
    state = {
        data:{
           username:'',
           email: '',
           password: '',
           packages:'',
           activePkg: ''
       },
       packages:[],
    }
     componentDidMount() {
        Axios.get('http://localhost:8000/api/pkglist').then(res=>{
            const result = res.data.data;
            let { packages } = this.state;
            result.map((item) => {
                packages.push({id: item.id, name: item.package_name});
            })
            this.setState({
                packages: packages
            })
         })
     }

     AddNewUser () {
        const {data} = this.state;
        const send = {
            username: data.username,
            email: data.email,
            password: data.password,
            packages: data.packages
        }
        let flag = 0;
         for (let key in send) {
             if (send[key] === '') flag = 1;
         }
         if (flag || !validator.isEmail(send['email']) ) {
             console.log(flag,validator.isEmail(send['email']))
            NotificationManager.error('Input is invalid!');
         }
         else {
            Axios.post('http://localhost:8000/api/adduser',send).then(res=>{
                if (res.status) {
                   NotificationManager.success('Successfully added!');
                }
                else {
                   NotificationManager.error('Failure!');
                }
            })
         }
         
     }
     render() {
         const { data,packages } = this.state;
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
                                    <Input type="text" name="username" id="username" placeholder="Restaurant Username" value={this.state.data.username} onChange={(e)=>this.setState({data: {...data, username:e.target.value}})}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" placeholder="Email Address" value={data.email} onChange={(e)=>this.setState({data: {...data, email:e.target.value}})} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="package">Package</Label>
									<Input type="select" name="package" id="package" value={data.packages} onChange={(e)=>this.setState({data:{...data,packages: e.target.value}})}>
										<option>Select Package</option>
                                        {
                                            packages.map((key,index) => {
                                                return (
                                                    <option value={packages[index].id}>{packages[index].name}</option>
                                                )
                                            })
                                        }
									</Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" value={data.password} onChange={(e)=>this.setState({data:{...data,password: e.target.value}})}/>
                                </FormGroup>
                                <Button color="primary" onClick={()=>this.AddNewUser()} block>Submit</Button>
                            </Form>
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-md-3"></div>
                </div>
             </div>
         );
     }
 }
 