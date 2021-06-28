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

const TaxRatesColumns = ['Date', 'Account', 'Type', 'Amount', 'Credit', 'Balance'];

export default class TaxRates extends Component {

   render() {
      const { taxrates } = this.props;
      return (
         <Fragment>
            <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={424} autoHide>
               <Table className="table-wrap" >
                  <TableHead>
                     <TableRow>
                        {TaxRatesColumns.map((th, index) => (
                           <TableCell key={index} className="fw-bold">{th}</TableCell>
                        ))}
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {taxrates.map((list, index) => {
                        return (
                           <TableRow key={index}>
                              <TableCell>{list.date}</TableCell>
                              <TableCell>{list.account}</TableCell>
                              <TableCell><Badge color={list.typeColor}>{list.type}</Badge></TableCell>
                              <TableCell>{list.amount}</TableCell>
                              <TableCell>{list.credit}</TableCell>
                              <TableCell>{list.balance}</TableCell>
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
