/**
 * Upcoming Events
*/
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from '@material-ui/core';

// rct card box
import { RctCardContent } from 'Components/RctCard';


class UpcomingEvents extends Component {
   render() {
      return (
         <RctCardContent>
            <div className="upcoming-events-wrap">
               <List className="list-unstyled p-0">
                  <ListItem className="border-bottom px-0 d-flex justify-content-between align-content-start">
                     <div>
                        <h4>Marketing Seminar</h4>
                        <p className="mb-0 fs-12">28th April, Mumbai</p>
                     </div>
                     <div>
                        <Link to="javascript:void(0);" >email</Link>
                     </div>
                  </ListItem>
                  <ListItem className="border-bottom px-0 d-flex justify-content-between align-content-start">
                     <div>
                        <h4>Strategy Planning</h4>
                        <p className="mb-0 fs-12">22th May, Delhi</p>
                     </div>
                     <div>
                        <Link to="javascript:void(0);" >phone</Link>
                     </div>
                  </ListItem>
                  <ListItem className="border-bottom px-0 d-flex justify-content-between align-content-start">
                     <div>
                        <h4>Hiring Personals</h4>
                        <p className="mb-0 fs-12">29th May, Delhi</p>
                     </div>
                     <div>
                        <Link to="javascript:void(0);" >skype</Link>
                     </div>
                  </ListItem>
                  <ListItem className="border-bottom px-0 d-flex justify-content-between align-content-start">
                     <div>
                        <h4>Training</h4>
                        <p className="mb-0 fs-12">30th May, Delhi</p>
                     </div>
                     <div>
                        <Link to="javascript:void(0);" >email</Link>
                     </div>
                  </ListItem>
               </List>
            </div>
         </RctCardContent>
      );
   }
}

export default UpcomingEvents;
