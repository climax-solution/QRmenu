import React, { Component } from 'react'
import { Helmet } from "react-helmet";
// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// import * as Switch from 'react-toggle-switch';
import Switch from '@material-ui/core/Switch';
import {
    TextField,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, Select, MenuItem, FormControl, Checkbox, FormControlLabel, FormGroup,FormHelperText,Input,Button, Badge
} from '@material-ui/core';
import ReactQuill from 'react-quill';
import ImageUploader from 'react-images-upload';
// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import MUIDataTable from "mui-datatables";

 export default class Package extends Component {
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
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
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
                name: "Image"
            },
            {
                name: "Package Name"
            },
            {
                name: "Price"
            },
            {
                name: "Item"
            },
            {
                name: "Status",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        (value == 'Pending'
                        ?<Badge color="primary" badgeContent={"Pending"} className="badge-pill"></Badge>
                        : value)
                    )
                }
            },
            {
                name: "Action"
            }
        ];
        const data = [];
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
                    <title>Payment Setting</title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.package" />} match={this.props.match} />
                <Button className="btn btn-info text-white" variant="contained" onClick={this.handleClickOpen}>
                    <i className="ti-plus"></i> Add New
                </Button>
                <div className="row mt-10">
                    <RctCollapsibleCard
						customClasses="trafic-bar-chart"
						colClasses="col-sm-12 col-md-12 col-lg-12 d-sm-full"
						heading={<IntlMessages id="sidebar.package" />}
						collapsible
						closeable
						fullBlock
					>
                        <MUIDataTable
                            title={"Packages"}
                            data={data}
                            columns={columns}
                            // options={options}
                        />
                    </RctCollapsibleCard>
                </div>

                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
                    <DialogTitle id="form-dialog-title">Package Management</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.modalTitle}
                        </DialogContentText>
                        <div className="row">                        
                            <div className="col-md-12">
                                <TextField margin="dense" id="name" label="Package name" type="text" fullWidth/>
                                <TextField margin="dense" id="item" label="Item" type="text" fullWidth/>
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel htmlFor="packagetype">Package Type</InputLabel>
                                    <Select id="packagetype">
                                        <MenuItem value="">Select</MenuItem>
                                        <MenuItem value="free">free</MenuItem>
                                        <MenuItem value="month">monthly</MenuItem>
                                        <MenuItem value="year">yearly</MenuItem>
                                    </Select>
                                </FormControl>
                                <ReactQuill modules={modules} formats={formats} placeholder="Enter Your Message.." className="mt-30"/>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                    singleImage={true}
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleClose} color="primary" className="text-white">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={this.handleClose} className="btn-info text-white">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
             </div>
         );
     }
 }
 