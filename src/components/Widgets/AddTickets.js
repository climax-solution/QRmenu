/**
 * Tax Rates Component
*/
import React, { Component, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Badge } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const TicketsColumns = ['Sr.No', 'Tickets Code', 'Subject', 'date', 'Department', 'Status'];

export default class AddTickets extends Component {

   render() {
      const { addtickets } = this.props;
      return (
         <Fragment>
            <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={424} autoHide>
               <Table className="table-wrap" >
                  <TableHead>
                     <TableRow>
                        {TicketsColumns.map((th, index) => (
                           <TableCell key={index} className="fw-bold">{th}</TableCell>
                        ))}
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {addtickets.map((list, index) => {
                        return (
                           <TableRow key={index}>
                              <TableCell>{list.srno}</TableCell>
                              <TableCell className="fw-bold">{list.ticketCode}</TableCell>
                              <TableCell>{list.subject}</TableCell>
                              <TableCell>{list.date}</TableCell>
                              <TableCell>{list.department}</TableCell>
                              <TableCell><Badge color={list.statusColor}>{list.status}</Badge></TableCell>
                           </TableRow>
                        )
                     })}
                  </TableBody>
               </Table>
            </Scrollbars>
         </Fragment>
      );
   }
}
