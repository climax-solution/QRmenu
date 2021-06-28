/**
 * Live Chat Support
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { Scrollbars } from 'react-custom-scrollbars';

// rct card box
import { RctCardContent } from 'Components/RctCard';

class LiveChatSupport extends Component {
   render() {
      return (
         <RctCardContent>
            <div className="live-support-wrap">
               <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={410} autoHide>
                  <List className="list-unstyled p-0">
                     <ListItem className="px-0 border-bottom py-10">
                        <div className="d-flex justify-content-center align-items-center">
                           <div className="avatar">
                              <img src={require("Assets/avatars/user-13.jpg")} height="65" width="65" />
                           </div>
                           <div className="content px-20">
                              <div className="d-flex justify-content-start align-items-center mb-5">
                                 <h4 className="pr-10 mb-0">Devy Finn</h4>
                                 <span className="fs-12 text-base">10 Min ago</span>
                              </div>
                              <p className="mb-0">Hi There! Recently I updated the latest version of your app, it crashed every time when i open.Please help me out as soon as possible.....Thanks</p>
                           </div>
                        </div>
                     </ListItem>
                     <ListItem className="px-0 border-bottom py-10">
                        <div className="d-flex flex-row-reverse justify-content-start align-items-center">
                           <div className="avatar">
                              <img src={require("Assets/avatars/user-14.jpg")} height="65" width="65" />
                           </div>
                           <div className="content px-20">
                              <div className="d-flex justify-content-start align-items-center mb-5">
                                 <h4 className="pr-10 mb-0">Sam Brown</h4>
                                 <span className="fs-12 text-base">8 Min agoo</span>
                              </div>
                              <p className="mb-0">Hi Devy, Can you please tell us your mobile configuraion.So that We can help you better.Please Also specify Version of your phone....Thank You!</p>
                           </div>
                        </div>
                     </ListItem>
                     <ListItem className="px-0 border-bottom py-10">
                        <div className="d-flex justify-content-center align-items-center">
                           <div className="avatar">
                              <img src={require("Assets/avatars/user-13.jpg")} height="65" width="65" />
                           </div>
                           <div className="content px-20">
                              <div className="d-flex justify-content-start align-items-center mb-5">
                                 <h4 className="pr-10 mb-0">Devy Finn</h4>
                                 <span className="fs-12 text-base">7 Min ago</span>
                              </div>
                              <p className="mb-0">Thanks you for quick response. I using iPhone 6s and the version of this is 10.2 . Please fix this issue I need this right now....Thanks</p>
                           </div>
                        </div>
                     </ListItem>
                     <ListItem className="px-0 border-bottom py-10">
                        <div className="d-flex flex-row-reverse justify-content-center align-items-center">
                           <div className="avatar">
                              <img src={require("Assets/avatars/user-14.jpg")} height="65" width="65" />
                           </div>
                           <div className="content px-20">
                              <div className="d-flex justify-content-start align-items-center mb-5">
                                 <h4 className="pr-10 mb-0">Sam Brown</h4>
                                 <span className="fs-12 text-base">6 Min agoo</span>
                              </div>
                              <p className="mb-0">Please wait for some time. Our tecnical support team will contact you soon and fix the issue .Thanks for using our App.We will Assit You better</p>
                           </div>
                        </div>
                     </ListItem>
                  </List>
               </Scrollbars>
               <form className="pt-20">
                  <div className="chat-form d-flex justify-content-start align items-center">
                     <TextField
                        id="standard-dense"
                        label="Send Message"
                     />
                     <Fab color="primary" className="mx-sm-20 ml-10">
                        <i className="material-icons">send</i>
                     </Fab>
                  </div>
               </form>
            </div>
         </RctCardContent>
      );
   }
}

export default LiveChatSupport;
