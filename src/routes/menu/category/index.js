import React, { Component, Fragment } from 'react';

import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import { Scrollbars } from 'react-custom-scrollbars';

import MUIDataTable from "mui-datatables";
import ReactQuill from 'react-quill';
// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
// intl messages
import IntlMessages from 'Util/IntlMessages';

import Joyride, { Step, CallBackProps } from "react-joyride";
import {
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Button,
    Badge
} from '@material-ui/core';

import {Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';

export default class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            monthlyPlan: true,
            premiumPlan: 300,
            enterprisePlan: 590,
            open: false,
            modalTitle: 'Add Package',
            pictures: []
        }
    }
	// on plan change
	onPlanChange(isMonthly) {
		this.setState({ monthlyPlan: !isMonthly });
		if (!isMonthly) {
			this.setState({ businessPlan: 300, enterprisePlan: 590 });
		} else {
			this.setState({ businessPlan: 350, enterprisePlan: 700 });
		}
	}
    handleClickOpen = () => {
        this.setState({ open: true });
    };
  
    handleClose = () => {
        this.setState({ open: false });
    };
    onNewsletterChange = () => {
        this.setState({
            open: true
        })
    };
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
                        <Badge color="primary" badgeContent={value} className="badge-pill text-white"></Badge>
                    )
                }
            },
            {
                name: "Action",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>
                            <Button variant="contained" className="btn-primary text-white">
                            &nbsp;<i className="ti-pencil-alt"></i>&nbsp;&nbsp;&nbsp;&nbsp;Edit
                            </Button>
                            <Button variant="contained" className="btn-danger text-white mt-5">
                                <i className="ti-trash"></i>&nbsp;&nbsp;Delete
                            </Button>
                        </div>
                        
                    )
                }
            }
        ];
        const data = [
            ["1","admin", "mason@gmail.com", "Prøve package - kr 0 / trial","pending", ]
        ];
        const options = {
            filterType: 'dropdown',
            responsive: 'stacked'
        };
        const modules = {
            toolbar: [
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
              ['link', 'image'],
              ['clean'],
              [{ 'align': [] }],
              ['code-block']
            ],
        };
          
        const formats = [
        'header',
        'font',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'align',
        'code-block'
        ];
        return (
            <div className="blank-wrapper">
                <Helmet>
                    <title>Offline Payment</title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.category" />} match={this.props.match} />
                <Button className="btn btn-info text-white" variant="contained" onClick={this.handleClickOpen}>
                    <i className="ti-plus"></i> Add New
                </Button>
                <Joyride
                    run={true}
                />
                <div className="row mt-30">
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
                                    <i className="ti-save"></i>&nbsp;Save Change
                                </Button>
                            </RctCollapsibleCard>
                        
                    </div>
                </div>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
                    <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.modalTitle}
                        </DialogContentText>
                        <div className="row">                        
                            <div className="col-md-12">
                                <TextField margin="dense" id="name" label="Category name" type="text" fullWidth/>
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel htmlFor="packagetype">Type</InputLabel>
                                    <Select id="packagetype" defaultValue="pizza">
                                        <MenuItem value="">Select</MenuItem>
                                        <MenuItem value="pizza">Pizza</MenuItem>
                                        <MenuItem value="burger">Burger</MenuItem>
                                        <MenuItem value="other">Others</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField margin="dense" id="order" label="Order" type="number" fullWidth/>
                                <FormControl>
                                    <InputLabel>Details</InputLabel>
                                    <ReactQuill modules={modules} formats={formats} placeholder="Enter Your Message.." className="mt-50"/>
                                </FormControl>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleClose} color="primary" className="text-white">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={this.handleClose} className="btn-info text-white">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
 }