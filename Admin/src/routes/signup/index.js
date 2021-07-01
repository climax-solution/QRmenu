/**
 * Sign Up page (Register)
 */
 import React, { Component } from 'react';
 import Button from '@material-ui/core/Button';
 import { connect } from 'react-redux';
 import AppBar from '@material-ui/core/AppBar';
 import Toolbar from '@material-ui/core/Toolbar';
 import { Link } from 'react-router-dom';
 import { Form, FormGroup, Input } from 'reactstrap';
 import {Checkbox,FormControlLabel} from '@material-ui/core';
 import LinearProgress from '@material-ui/core/LinearProgress';
 import QueueAnim from 'rc-queue-anim';
 import { Fab } from '@material-ui/core';
import { NotificationManager } from 'react-notifications';
 
 // components
 import { SessionSlider } from 'Components/Widgets';
 
 // app config
 import AppConfig from 'Constants/AppConfig';
 
 // redux action
 import {
    signupUserInFirebase,
    signinUserWithFacebook,
    signinUserWithGoogle,
    signinUserWithGithub,
    signinUserWithTwitter
 } from 'Actions';
 
 import axios from 'axios';
import validator from 'validator';

 class SignupFirebase extends Component {
 
    state = {
       website: '',
       name:'',
       email: '',
       password: '',
       confirmpass: '',
       legacy: false,
    }
 
    /**
     * On User Signup
     */
    onUserSignUp() {
       let state = this.state;
       let flag = 0;
       for (let item in state)
       {
         if ( state[item] == '')
         {
            flag = 1;
         }
       }
       if (flag)
       {
         NotificationManager.error('Input is invalid!');
         return ;
      }
      let url_option = {
         protocols: ['http','https','ftp'],
         require_tld: true,
         require_protocol: false,
         require_host: true,
         require_port: false,
         require_valid_protocol: true,
         allow_underscores: false,
         host_whitelist: false,
         host_blacklist: false,
         allow_trailing_dot: false,
         allow_protocol_relative_urls: false,
         disallow_auth: false,
         validate_length: true
      };

      if ( !validator.isURL(state['website'],url_option) ) {
         NotificationManager.error('Url is invalid!');
         return ;
      }
      else if ( !validator.isEmail(state['email']) ) {
         NotificationManager.error('Email is invalid!');
         return ;
      }
      if (state['confirmpass'] != state['password'])
      {
         NotificationManager.error('Password is invalid!');
      } else {
         delete state.confirmpass;
         axios.post('http://localhost:8000/api/signup',state).then((res)=>{
            console.log(res);
         })
      }
    }
 
    render() {
       const { website,name, email, password,confirmpass } = this.state;
       const { loading } = this.props;
       return (
          <QueueAnim type="bottom" duration={2000}>
             <div className="rct-session-wrapper">
                {loading &&
                   <LinearProgress />
                }
                <AppBar position="static" className="session-header">
                   <Toolbar>
                      <div className="container">
                         <div className="d-flex justify-content-between">
                            <div className="session-logo">
                               <Link to="/">
                                  <img src={AppConfig.appLogo} alt="session-logo" width="110" height="35" />
                               </Link>
                            </div>
                            <div>
                               <Link to="/signin" className="mr-15 text-white">Already have an account?</Link>
                               <Button component={Link} to="/signin" variant="contained" className="btn-light">Sign In</Button>
                            </div>
                         </div>
                      </div>
                   </Toolbar>
                </AppBar>
                <div className="session-inner-wrapper">
                   <div className="container">
                      <div className="row row-eq-height">
                         <div className="col-sm-6 col-md-6 col-lg-6 offset-md-3">
                            <div className="session-body text-center">
                               <div className="session-head mb-15">
                                  <h2>Sign Up</h2>
                               </div>
                               <Form>
                                  <FormGroup className="has-wrapper">
                                     <Input type="text" value={website} name="restaurant-name" id="user-name" className="has-input input-lg" placeholder="Restaurant Name" onChange={(e) => this.setState({ website: e.target.value })} />
                                     <span className="has-icon"><i className="zmdi zmdi-local-dining"></i></span>
                                  </FormGroup>
                                  <FormGroup className="has-wrapper">
                                     <Input type="text" value={name} name="owner-name" id="user-name" className="has-input input-lg" placeholder="Owner Name" onChange={(e) => this.setState({ name: e.target.value })} />
                                     <span className="has-icon"><i className="zmdi zmdi-account"></i></span>
                                  </FormGroup>
                                  <FormGroup className="has-wrapper">
                                     <Input type="mail" value={email} name="user-mail" id="user-mail" className="has-input input-lg" placeholder="Enter Email Address" onChange={(e) => this.setState({ email: e.target.value })} />
                                     <span className="has-icon"><i className="zmdi zmdi-email"></i></span>
                                  </FormGroup>
                                  <FormGroup className="has-wrapper">
                                     <Input value={password} type="Password" name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                                     <span className="has-icon"><i className="zmdi zmdi-lock"></i></span>
                                  </FormGroup>
                                  <FormGroup className="has-wrapper">
                                     <Input value={confirmpass} type="Password" name="confirm-pwd" id="pwd" className="has-input input-lg" placeholder="Confirm Password" onChange={(e) => this.setState({ confirmpass: e.target.value })} />
                                     <span className="has-icon"><i className="zmdi zmdi-lock"></i></span>
                                  </FormGroup>
                                  <FormGroup className="has-wrapper">
                                        <FormControlLabel
                                            control={<Checkbox name="term-legacy" color="primary" checked={this.state.legacy}/>}
                                            label="I have read theTerms & Conditions accept them "
                                            onClick={() => this.setState({ legacy: !this.state.legacy }) }
                                        />
                                  </FormGroup>
                                  <FormGroup className="mb-15">
                                     <Button
                                        className="btn-info text-white btn-block w-100"
                                        variant="contained"
                                        size="large"
                                        onClick={() => this.onUserSignUp()}>
                                            Sign Up
                                    </Button>
                                  </FormGroup>
                               </Form>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </QueueAnim>
       );
    }
 }
 
 // map state to props
 const mapStateToProps = ({ authUser }) => {
    const { loading } = authUser;
    return { loading };
 };
 
 export default connect(mapStateToProps, {
    signupUserInFirebase,
    signinUserWithFacebook,
    signinUserWithGoogle,
    signinUserWithGithub,
    signinUserWithTwitter
 })(SignupFirebase);
 