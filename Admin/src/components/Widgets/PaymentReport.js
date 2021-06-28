/**
 * payment reports Component
*/
import React, { Component, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Badge } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const paymentColumns = ['Payment Id', 'Client Name', 'Payment Type', 'Paid Date', 'Amount'];

export default class Paymentreport extends Component {

   render() {
      const { paymentlist } = this.props
      return (
         <Fragment>
            <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={424} autoHide>
               <Table className="table-wrap" >
                  <TableHead>
                     <TableRow>
                        {paymentColumns.map((th, index) => (
                           <TableCell key={index} className="fw-bold">{th}</TableCell>
                        ))}
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {paymentlist.map((list, index) => {
                        return (
                           <TableRow key={index}>
                              <TableCell>{list.payid}</TableCell>
                              <TableCell className="fw-bold">{list.firstName} {list.lastName}</TableCell>
                              <TableCell><Badge color={list.typeColor}>{list.paymentType}</Badge></TableCell>
                              <TableCell>{list.paidDate}</TableCell>
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
