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
import axios from 'axios';

export default class SignIn extends Component {
   state = {
      username: '',
      password: '',
      link:'/'
   }
   changeUsername(e) {
      this.setState({
         username: e.target.value
      })
   }
   changePassword(e) {
      this.setState({
         password: e.target.value
      })
   }
   signin() {
      if (this.state.username == 'admin' && this.state.password == 'DevQR2021') {
         NotificationManager.success('User Login Successfully!');
         this.props.history.push('/app');
      }
      else if (this.state.username == 'vendor' && this.state.password == 'Dev2021') {
         NotificationManager.success('User Login Successfully!');
         this.props.history.push('/vendor');
      }
      else {
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
                                 <Input type="text" name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Enter Your Username" value={this.state.username} onChange={(event) => this.changeUsername(event)}/>
                                 <span className="has-icon"><i className="ti-user"></i></span>
                              </FormGroup>
                              <FormGroup className="has-wrapper">
                                 <Input type="password" name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Enter Your Password"  value={this.state.password} onChange={(event) => this.changePassword(event)}/>
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
