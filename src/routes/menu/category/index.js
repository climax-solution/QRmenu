/**
 * Offline Payment
 */
import React, { Component, Fragment  } from 'react';
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import {Badge,Button} from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import {Table, TableHead, TableBody, TableRow, TableCell, TextField, FormControl } from '@material-ui/core';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import Form from 'reactstrap/lib/Form';

export default class Category extends Component {
    render() {
        const columns = [
            {
                name: "Sl"
            },
            {
                name: "Type"
            },
            {
                name: "Order"
            },
            {
                name: "Username"
            },
            {
                name: "Status",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <Badge color="secondary" badgeContent={value} className="badge-pill text-white"></Badge>
                    )
                }
            },
            {
                name: "Action",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>
                            <Button variant="contained" className="btn-primary text-white">
                                <i class="ti-pencil-alt"></i>&nbsp;&nbsp;Edit
                            </Button>
                            <Button variant="contained" className="btn-danger text-white">
                                <i class="ti-trash"></i>&nbsp;&nbsp;Delete
                            </Button>
                        </div>
                        
                    )
                }
            }
        ];
        const data = [
            ["1","admin", "mason@gmail.com", "Prøve package - kr 0 / trial","$22222", ]
        ];
        const options = {
            filterType: 'dropdown',
            responsive: 'stacked'
        };
        return (
            <div className="blank-wrapper">
                <Helmet>
                    <title>Offline Payment</title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.category" />} match={this.props.match} />
                    
                    <div className="row">
                        <div className="col-lg-7 col-md-12 col-sm-12">
                            <RctCollapsibleCard
                                heading="Categories"
                                colClasses="col-md-12 col-sm-12 d-sm-full"
                                customStyle={{padding: '10px 20px'}}
                                collapsible
        						closeable
                                fullBlock
                            >
                                <MUIDataTable
                                    title={"Categories"}
                                    data={  data}
                                    columns={columns}
                                    options={options}
                                />
                            </RctCollapsibleCard>
                        </div>
                        <div className="col-lg-5 col-md-12 col-sm-12">
                            
                                <RctCollapsibleCard
                                    heading="Sizes"
                                    colClasses="col-md-12 col-sm-12 d-sm-full"
                                    customStyle={{padding: '10px 20px'}}
                                    collapsible
						            closeable
                                    fullBlock
                                >
                                    <div style={{overflow: 'auto'}}>
                                        <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell variant="head">Sl</TableCell>
                                                <TableCell variant="head">Type</TableCell>
                                                <TableCell variant="head">Size Name</TableCell>
                                                <TableCell variant="head">-</TableCell>
                                                <TableCell variant="head">Type</TableCell>
                                                <TableCell variant="head">Size Name</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>1</TableCell>
                                                <TableCell>Pizza</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <TextField fullWidth/>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>Burger</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <TextField fullWidth/>
                                                    </FormControl>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>2</TableCell>
                                                <TableCell>Pizza</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <TextField fullWidth/>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>Burger</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <TextField fullWidth/>
                                                    </FormControl>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>3</TableCell>
                                                <TableCell>Pizza</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <TextField fullWidth/>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>Burger</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <TextField fullWidth/>
                                                    </FormControl>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>4</TableCell>
                                                <TableCell>Pizza</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <TextField fullWidth/>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>Burger</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <TextField fullWidth/>
                                                    </FormControl>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>5</TableCell>
                                                <TableCell>Pizza</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <TextField fullWidth/>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>Burger</TableCell>
                                                <TableCell>
                                                    <FormControl fullWidth>
                                                        <TextField fullWidth/>
                                                    </FormControl>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    
                                    </div>
                                    <Button variant="contained"  color="primary" style={{float:'right'}} className="mt-10 mb-10 ml-auto">
                                        <i class="ti-save"></i>&nbsp;Save Change
                                    </Button>
                                </RctCollapsibleCard>
                            
                        </div>
                    </div>
            </div>
        );
    }
 }