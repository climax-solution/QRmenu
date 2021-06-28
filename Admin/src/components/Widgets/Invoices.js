/**
 * Invoices Component
*/
import React, { Component, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Badge } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const InvoiceColumns = ['Invoice Id', 'Client Name', 'Account Type', 'Date Created', 'Due Date', 'Amount'];

export default class Invoices extends Component {

   render() {
      const { data } = this.props
      return (
         <Fragment>
            <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={424} autoHide>
               <Table className="table-wrap" >
                  <TableHead>
                     <TableRow>
                        {InvoiceColumns.map((th, index) => (
                           <TableCell key={index} className="fw-bold">{th}</TableCell>
                        ))}
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {data.map((list, index) => {
                        return (
                           <TableRow key={index}>
                              <TableCell>{list.id}</TableCell>
                              <TableCell className="fw-bold">{list.firstName} {list.lastName}</TableCell>
                              <TableCell><Badge color={list.typeColor}>{list.accountType}</Badge></TableCell>
                              <TableCell>{list.dateCreated}</TableCell>
                              <TableCell>{list.dueDate}</TableCell>
                              <TableCell>{list.amount}</TableCell>
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
