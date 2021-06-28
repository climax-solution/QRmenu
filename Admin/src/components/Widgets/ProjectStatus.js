/**
 * Project Status
*/
import React, { Component } from 'react';
import { Progress, Badge } from 'reactstrap';

// rct card box
import { RctCardContent } from 'Components/RctCard';

class ProjectStatus extends Component {
   render() {
      return (
         <RctCardContent>
            <div className="project-status-wrap">
               <div className="progress-wrap mb-25">
                  <div className="d-flex justify-content-between align-items-center">
                     <h4 className="mb-0">Project 1</h4>
                     <Badge color="success" className="text-capitalize" pill>completed</Badge>
                  </div>
                  <Progress color="primary" className="my-15 progress-xs" value={70} />
               </div>
               <div className="progress-wrap mb-25">
                  <div className="d-flex justify-content-between align-items-center">
                     <h4 className="mb-0">Project 2</h4>
                     <Badge color="danger" className="text-capitalize" pill>pending</Badge>
                  </div>
                  <Progress color="primary" className="my-15 progress-xs" value={70} />
               </div>
               <div className="progress-wrap mb-25">
                  <div className="d-flex justify-content-between align-items-center">
                     <h4 className="mb-0">Project 3</h4>
                     <Badge color="info" className="text-capitalize" pill>ongoing</Badge>
                  </div>
                  <Progress color="primary" className="my-15 progress-xs" value={70} />
               </div>
               <div className="progress-wrap mb-25">
                  <div className="d-flex justify-content-between align-items-center">
                     <h4 className="mb-0">Project 4</h4>
                     <Badge color="success" className="text-capitalize" pill>completed</Badge>
                  </div>
                  <Progress color="primary" className="my-15 progress-xs" value={70} />
               </div>

            </div>
         </RctCardContent>
      );
   }
}

export default ProjectStatus;
