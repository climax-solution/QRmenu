/**
 * Transaction table section
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Scrollbars } from 'react-custom-scrollbars';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Badge } from 'reactstrap';

// intl messages
import IntlMessages from 'Util/IntlMessages';

function TabContainer({ children, dir }) {
   return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
         {children}
      </Typography>
   );
}

const TransactionColumns = ['transid', 'date', 'account', 'type', 'amount', 'debit', 'credit', 'balance'];

const TransferColumns = ['transid', 'date', 'account', 'type', 'amount', 'balance', 'status'];

const ExpenseColumns = ['itmNo', 'date', 'type', 'description', 'amount', 'status'];

class TransactionList extends Component {

   state = {
      value: 0,
   };

   handleChange = (event, value) => {
      this.setState({ value });
   };

   handleChangeIndex = index => {
      this.setState({ value: index });
   };

   render() {
      const { theme, listData, transferreport, expenseCategory } = this.props;
      return (
         <div className="Transaction-table-wrap Tab-wrap">
            <AppBar position="static" color="default">
               <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
               >
                  <Tab label={<IntlMessages id="widgets.transactionList" />} />
                  <Tab label={<IntlMessages id="widgets.transferReport" />} />
                  <Tab label={<IntlMessages id="widgets.expenseCategory" />} />
               </Tabs>
            </AppBar>
            <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={420} autoHide>
               <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={this.state.value}
                  onChangeIndex={this.handleChangeIndex}>
                  <div className="card mb-0 transaction-box">
                     <TabContainer dir={theme.direction}>
                        <Table className="table-wrap">
                           <TableHead>
                              <TableRow>
                                 {TransactionColumns.map((th, index) => (
                                    <TableCell key={index} className="fw-bold">{th}</TableCell>
                                 ))}
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {listData.map((list, index) => (
                                 <TableRow key={index}>
                                    <TableCell>{list.transid}</TableCell>
                                    <TableCell>{list.date}</TableCell>
                                    <TableCell>{list.account}</TableCell>
                                    <TableCell><Badge color={list.typeColor}>{list.type}</Badge></TableCell>
                                    <TableCell>{list.amount}</TableCell>
                                    <TableCell>{list.debit}</TableCell>
                                    <TableCell>{list.credit}</TableCell>
                                    <TableCell>{list.balance}</TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TabContainer>
                  </div>
                  <div className="card mb-0 transaction-box">
                     <TabContainer dir={theme.direction}>
                        <Table className="table-wrap" >
                           <TableHead>
                              <TableRow>
                                 {TransferColumns.map((th, index) => (
                                    <TableCell key={index} className="fw-bold">{th}</TableCell>
                                 ))}
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {transferreport.map((list, index) => (
                                 <TableRow key={index}>
                                    <TableCell>{list.transid}</TableCell>
                                    <TableCell>{list.date}</TableCell>
                                    <TableCell>{list.account}</TableCell>
                                    <TableCell><Badge color={list.typeColor}>{list.type}</Badge></TableCell>
                                    <TableCell>{list.amount}</TableCell>
                                    <TableCell>{list.balance}</TableCell>
                                    <TableCell><Badge color={list.statusColor}>{list.status}</Badge></TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TabContainer>
                  </div>
                  <div className="card mb-0 transaction-box">
                     <TabContainer dir={theme.direction}>
                        <Table className="table-wrap" >
                           <TableHead>
                              <TableRow>
                                 {ExpenseColumns.map((th, index) => (
                                    <TableCell key={index} className="fw-bold">{th}</TableCell>
                                 ))}
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {expenseCategory.map((list, index) => (
                                 <TableRow key={index}>
                                    <TableCell>{list.itmNo}</TableCell>
                                    <TableCell>{list.date}</TableCell>
                                    <TableCell><Badge color={list.typeColor}>{list.type}</Badge></TableCell>
                                    <TableCell>{list.description}</TableCell>
                                    <TableCell>{list.amount}</TableCell>
                                    <TableCell><Badge color={list.statusColor}>{list.status}</Badge></TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TabContainer>
                  </div>
               </SwipeableViews>
            </Scrollbars>
         </div>
      );
   }
}

export default withStyles(null, { withTheme: true })(TransactionList);
