import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import { NotificationManager } from 'react-notifications';

import {validate, res} from 'react-email-validator';
// app config
import AppConfig from 'Constants/AppConfig';
import Axios from 'axios';
import validator from 'validator';
import { connect } from 'react-redux';

class SignIn extends Component {
   state = {
      email: '',
      password: '',
      link:'/'
   }
   changeEmail(e) {
      this.setState({
         email: e.target.value
      })
   }
   changePassword(e) {
      this.setState({
         password: e.target.value
      })
   }
   signin() {
      const { email, password } = this.state;
      if ( validator.isEmail( email ) && password != '') {
         let data = {
            email: email,
            password: password
         }

         Axios.post('http://localhost:8000/api/login',data).then( res => {
            window.localStorage.setItem('token', res.data.data.access_token);
            NotificationManager.success("You logined successfully!");
            this.props.logined(res.data.data.permission);
            this.props.history.push(`/${res.data.data.permission}`);
         }).catch(res=>{
            if (res) NotificationManager.error('Your info is invalid!');
         })
      }
      else {
         NotificationManager.error('Input is invalid!');
      }
   }
   render() {
      return (
         <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper" key="1" style={{overflow:'hidden'}}>
               <AppBar position="static" className="session-header">
                  <Toolbar>
                     <div className="container">
                        <div className="d-flex justify-content-between">
                           <div className="session-logo">
                              <Link to="/">
                                 <img src={require('Assets/img/site-logo.png')} alt="session-logo" className="img-fluid" width="110" height="35" />
                              </Link>
                           </div>
                           <div>
                               <Link to="/signin/signup" className="mr-15 text-white">Don't have an account?</Link>
                               <Button component={Link} to="/signin/signup" variant="contained" className="btn-light">Sign Up</Button>
                            </div>
                        </div>
                     </div>
                  </Toolbar>
               </AppBar>
               <div className="session-inner-wrapper p-4 h-100 p-md-0">
                  <div className="row">
                     <div className="col-sm-8 col-lg-4 mx-auto">
                        <div className="session-body text-center">
                           <div className="session-head mb-30">
                              <h2>SIGN IN</h2>
                              <h4>Signup to discover your shop</h4>
                           </div>
                           <Form>
                              <FormGroup className="has-wrapper">
                                 <Input type="text" name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Enter Your Email" value={this.state.email} onChange={(event) => this.changeEmail(event)} style={{paddingRight: '45px'}}/>
                                 <span className="has-icon"><i className="ti-user"></i></span>
                              </FormGroup>
                              <FormGroup className="has-wrapper">
                                 <Input type="password" name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Enter Your Password"  value={this.state.password} onChange={(event) => this.changePassword(event)}  style={{paddingRight: '45px'}}/>
                                 <span className="has-icon"><i className="ti-lock"></i></span>
                              </FormGroup>
                              <FormGroup>
                                 <Button variant="contained" className="w-100 btn-info text-white btn-block btn-large" onClick={()=>this.signin()}>Sign in</Button>
                              </FormGroup>
                           </Form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </QueueAnim>
      );
   }
}

const mapStateProps = state => {
   return {
   }
}

const mapDispatchProps = dispatch => {
   return {
      logined: (per) => dispatch({type: 'LOGIN_USER_SUCCESS',permission: per})
   }
}

export default connect(
   mapStateProps,
   mapDispatchProps
)(SignIn);