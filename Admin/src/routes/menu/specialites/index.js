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
    InputAdornment,
    FormLabel,
    FormGroup,
    Input
} from '@material-ui/core';
import ImageUploader from 'react-images-upload';

export default class Specialites extends Component {
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
                name: "Images"
            },
            {
                name: "Name"
            },
            {
                name: "Price"
            },
            {
                name: 'Username'
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
                name: "Action",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        (value == 'offline'
                        ?<Badge color="secondary" badgeContent={"offline"}></Badge>
                        : value)
                    )
                }
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
                    <title>Specialites</title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.specialities" />} match={this.props.match} />
                <div className="row mt-10">
                    <div className="col-lg-5 col-md-12 col-sm-12">
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="d-sm-full"
                            heading={<IntlMessages id="sidebar.specialities" />}
                            collapsible
                            closeable
                            fullBlock
                        >
                        <div className="row">                        
                            <div className="col-md-10 offset-md-1">
                                <TextField margin="dense" id="name" label="Name" type="text" fullWidth/>
                                <FormControl className="mt-20">
                                    <Input
                                        id="price"
                                        type="number"
                                        endAdornment={
                                            <InputAdornment position="end">Kr</InputAdornment>
                                        }
                                        style={{width: '50%'}}
                                    />
                                </FormControl>
                                <FormControl style={{display: 'block',padding:'10px 0px'}} className="mt-20" fullWidth>
                                    <FormGroup aria-label="position" style={{display: 'block'}} row>
                                        <TextField id="short-des" fullWidth label="About Short Text (Max 120)" multiline rows="4"/>
                                    </FormGroup>
                                </FormControl>
                                <ReactQuill modules={modules} formats={formats} placeholder="Enter Your Message.." className="mt-30"/>
                                <FormControl className="mt-30">
                                    <FormLabel>Image</FormLabel>
                                    <ImageUploader
                                        withIcon={true}
                                        buttonText='Choose images'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                        withPreview={true}
                                        singleImage={true}
                                    />
                                </FormControl>
                                <FormControl style={{display:'block'}}>
                                    <Button variant="contained" className="btn-info text-white mt-20 mb-10 pull-right">
                                        Submit
                                    </Button>
                                </FormControl>
                            </div>
                        </div>
                    </RctCollapsibleCard>
                    </div>
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="d-sm-full"
                            heading={<IntlMessages id="sidebar.specialities" />}
                            collapsible
                            closeable
                            fullBlock
                        >
                        <MUIDataTable
                            title={"Specialities"}
                            data={data}
                            columns={columns}
                            // options={options}
                        />
                        </RctCollapsibleCard>
                    </div>
                </div>
            </div>
        );
    }
}
