/**
 * Ongoing Project
 */
import React, { Component } from 'react';
import { Progress } from 'reactstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// rct card box
import { RctCardContent } from 'Components/RctCard';

class OngoingProjects extends Component {
   render() {
      return (
         <RctCardContent>
            <div className="ongoing-projects-wrap">
               <h4 className="mb-15">Project 1</h4>
               <List className="project-list list-unstyled p-0 ">
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="w-50 d-flex fw-semi-bold ">
                        <i className="material-icons mr-10 ">account_circle</i>
                        supervisor :
                     </span>
                     <span className="w-50 text-truncate">
                        john Gena
                     </span>
                  </ListItem>
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="w-50 d-flex fw-semi-bold ">
                        <i className="material-icons mr-10 ">schedule</i>
                        duration :
                     </span>
                     <span className="w-50 text-truncate">
                        3 Weeks
                     </span>
                  </ListItem>
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="w-50 d-flex fw-semi-bold ">
                        <i className="material-icons mr-10 ">monetization_on</i>
                        net worth :
                     </span>
                     <span className="w-50 text-truncate">
                        $ 2364378
                     </span>
                  </ListItem>
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="w-50 d-flex fw-semi-bold ">
                        <i className="material-icons mr-10 ">mail_outline</i>
                        email :
                     </span>
                     <span className="w-50 text-truncate">
                        support@theironnetwork.org
                     </span>
                  </ListItem>
                  <ListItem className="p-0 d-flex justify-content-start align-content-center">
                     <span className="w-50 d-flex fw-semi-bold ">
                        <i className="material-icons mr-10 ">phone</i>
                        phone :
                     </span>
                     <span className="w-50 text-truncate">
                        +01 3456 25378
                     </span>
                  </ListItem>
               </List>
               <div className="progress-wrap pt-20">
                  <div className="d-flex justify-content-between align-items-center mb-10">
                     <span className="fw-semi-bold text-capitalize">progress :</span>
                     <span>30%</span>
                  </div>
                  <Progress color="primary" className="mt-10 progress-xs" value={70} />
               </div>

            </div>
         </RctCardContent>
      );
   }
}

export default OngoingProjects;
