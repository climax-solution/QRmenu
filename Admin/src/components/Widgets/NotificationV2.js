/**
 * Notification Version 2
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// rct card box
import { RctCardContent } from 'Components/RctCard';

class NotificationV2 extends Component {
   render() {
      return (
         <RctCardContent>
            <div className="notification-v2-wrap">
               <List className="list-unstyled p-0 py-15">
                  <ListItem className="p-0">
                     <div className="w-100 mx-15 mb-15 px-20 py-15 bg-danger border-rad-md">
                        <p className="text-white mb-0 fw-normal">Site goes is down for 6 hours due to maintainance and bug fixing.Please Check </p>
                     </div>
                  </ListItem>
                  <ListItem className="p-0" >
                     <div className="w-100 mx-15 mb-15 px-20 py-15 bg-success border-rad-md">
                        <p className="text-white mb-0 fw-normal">New users from March is promoted as special benefit under promotional offer of 30%. </p>
                     </div>
                  </ListItem>
                  <ListItem className="p-0">
                     <div className="w-100 mx-15 mb-15 px-20 py-15 bg-primary border-rad-md">
                        <p className="text-white mb-0 fw-normal">Bug detected from the development team at the cart module of Fashion store.  </p>
                     </div>
                  </ListItem>
               </List>
               <div className="text-center">
                  <Button className="text-base">view all notifications</Button>
               </div>
            </div>
         </RctCardContent>
      );
   }
}

export default NotificationV2;
