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
    Badge,
    Chip,
} from '@material-ui/core';
import Axios from 'axios';
import {Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';
import { NotificationManager } from 'react-notifications';
export default class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            monthlyPlan: true,
            premiumPlan: 300,
            enterprisePlan: 590,
            open: false,
            modalTitle: 'Add Package',
            activeIndex: -1,
            pictures: [],
            dialog: {
                category_name: '',
                type: '',
                order: '',
                status: true,
                details: ''
            },
            categorylist:[],
            tmp:[]
        }
    }
    
    componentWillMount() {
        const headers = {
            'Accept':'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        Axios.post(REACT_APP_BACKEND_API + 'categorylist',{},{headers: headers}).then(res=>{
            const { data } = res;
            let { categorylist, dialog, tmp } = this.state;
            data.map((item, index)=>{
                tmp.push(item);
                let row = [index + 1];
                for (let key in dialog) {
                    if (key == 'details') continue;
                    row.push(item[key]);
                }
                categorylist.push(row);
            })
            console.log('Catergory=>',categorylist);
            this.setState({
                categorylist: categorylist,
                tmp: tmp
            })
        })
    }

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
    createNew = () => {
        const { dialog,activeIndex,tmp } = this.state;
        const headers = {
            'Accept':'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        if (activeIndex != -1) {
            dialog['id'] = tmp[activeIndex].id;
        }
        Axios.post(`http://localhost:8000/api/${activeIndex != -1 ? 'updatecategory': 'createcategory'}`,dialog,{headers: headers}).then(res=>{
            if (res.data.status) {
                NotificationManager.success('Success!');
                const { data } = res.data;
                this.resetStates(data);
            }
            else {
                NotificationManager.error('failure');
            }
            this.setState({ open: false, activeIndex: -1 });
        })
    };

    itemEdit(arg) {
        const { tmp, dialog } = this.state;
        console.log(tmp, dialog);
        for (let key in dialog ) {
            dialog[key] = tmp[arg][key];
        }
        this.setState({
            dialog: dialog,
            open: true,
            activeIndex: arg,
        })
    }

    itemRemove(arg) {
        const { tmp } = this.state;
        const headers = {
            'Accept':'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        Axios.post(REACT_APP_BACKEND_API + 'removecategory',{id: tmp[arg].id},{headers: headers}).then(res=>{
            const { data } = res;
            this.resetStates(data.data);
            if (data.success) {
                NotificationManager.success('Successfully Removed!');
            }
        })
    }

    resetStates(data) {
        let { dialog } = this.state;
        let tmp = [], categorylist = [];
        data.map((item, index)=>{
            tmp.push(item);
            let row = [index + 1];
            for (let key in dialog) {
                if (key == 'details') continue;
                row.push(item[key]);
            }
            categorylist.push(row);
        })
        this.setState({
            categorylist: categorylist,
            tmp: tmp
        })
    }
    render() {
        const columns = [
            {
                name: "Sl"
            },
            {
                name: "Name"
            },
            {
                name: "Type"
            },
            {
                name: "Order"
            },
            {
                name: "Status",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        (
                            value ?
                            <span className={`badge badge-success`}>Live</span>
                            : <span className={`badge badge-danger`}>Hide</span>
                        )
                        
                    )
                }
            },
            {
                name: "Action",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>
                            <Button variant="contained" className="btn-primary text-white" onClick={()=>this.itemEdit(tableMeta.rowIndex)}>
                            &nbsp;<i className="ti-pencil-alt"></i>&nbsp;&nbsp;&nbsp;&nbsp;Edit
                            </Button>
                            <Button variant="contained" className="btn-danger text-white mt-5" onClick={()=>this.itemRemove(tableMeta.rowIndex)}>
                                <i className="ti-trash"></i>&nbsp;&nbsp;Delete
                            </Button>
                        </div>
                        
                    )
                }
            }
        ];
        const data = this.state.categorylist;
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

        const { dialog } = this.state;
        return (
            <div className="blank-wrapper">
                <Helmet>
                    <title>Categories</title>
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
                    <div className="col-lg-12 col-md-12 col-sm-12">
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
                    {/* <div className="col-lg-5 col-md-12 col-sm-12">
                        
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
                        
                    </div> */}
                </div>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
                    <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.modalTitle}
                        </DialogContentText>
                        <div className="row">                        
                            <div className="col-md-12">
                                <TextField margin="dense" id="name" label="Category name" type="text" fullWidth value={dialog.category_name} onChange={
                                    (e)=>this.setState({
                                        dialog: {...dialog, category_name: e.target.value}
                                    })
                                }/>
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel htmlFor="packagetype">Type</InputLabel>
                                    <Select id="packagetype" value={dialog.type} onChange={
                                    (e)=>this.setState({
                                        dialog: {...dialog, type: e.target.value}
                                    })} >
                                        <MenuItem value="">Select</MenuItem>
                                        <MenuItem value="pizza">Pizza</MenuItem>
                                        <MenuItem value="burger">Burger</MenuItem>
                                        <MenuItem value="other">Others</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField margin="dense" id="order" label="Order" type="number" fullWidth value={dialog.order} onChange={
                                    (e)=>this.setState({
                                        dialog: {...dialog, order: e.target.value}
                                    })}/>
                                <FormControl>
                                    <InputLabel>Details</InputLabel>
                                    <ReactQuill modules={modules} formats={formats} placeholder="Enter Your Message.." className="mt-50"
                                    value={dialog.details} onChange={
                                        (value)=>this.setState({
                                            dialog: {...dialog, details: value}
                                        })}/>
                                </FormControl>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleClose} color="primary" className="text-white">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={this.createNew} className="btn-info text-white">
                            { this.state.activeIndex == -1 ? 'Create' : 'Update' }
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
 }