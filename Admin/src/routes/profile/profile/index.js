/**
 * Offline Payment
 */
import React, { Component, Fragment  } from 'react';
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import { Scrollbars } from 'react-custom-scrollbars';
import {
    Badge,
    Button,
    IconButton,
    Input,
    InputLabel,
    FormControl,
    TextField,
    FormGroup
} from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import InputAdornment from '@material-ui/core/InputAdornment';

import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import ReactQuill from 'react-quill';


export default class Profile extends Component {
    state = {
        password: '',

		showPassword: false,

    }
    handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	};
    render() {
        const columns = [
            {
                name: "Sl"
            },
            {
                name: "Username"
            },
            {
                name: "Email"
            },
            {
                name: "Package"
            },
            {
                name: "Price",
                
            },
            {
                name: "TxnId"
            },
            {
                name: "Request Date"
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
                        <Button variant="contained" color="primary">
                            Approve<i className="ti-arrow-circle-right"></i>
                        </Button>
                    )
                }
            }
        ];
        const data = [
            ["1","admin", "mason@gmail.com", "Prøve package - kr 0 / trial","$22222", "d1341223g3r","202020789","Pending","2020"],
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
                    <title>Profile</title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.profile" />} match={this.props.match} />
                <div className="row">
                    <div className="col-md-6">
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="d-sm-full"
                            heading={<IntlMessages id="sidebar.profile" />}
                            collapsible
                            closeable
                            fullBlock
                        >
                            <div className="row" style={{padding: '10px 20px'}}>
                                <div className="col-md-6">
                                    <InputLabel>Whatsapp Number</InputLabel>
                                    <Input
                                        id="whatsapp-number"
                                        type="text"
                                        startAdornment={
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <i className="zmdi zmdi-whatsapp"></i>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </div>
                                <div className="col-md-6">
                                    <InputLabel>Youtube</InputLabel>
                                    <Input
                                        id="youtube"
                                        type="text"
                                        startAdornment={
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <i className="zmdi zmdi-youtube"></i>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </div>
                                <div className="col-md-6 mt-20">
                                    <InputLabel>Facebook</InputLabel>
                                    <Input
                                        id="facebook"
                                        type="text"
                                        startAdornment={
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <i className="zmdi zmdi-facebook"></i>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </div>
                                <div className="col-md-6 mt-20">
                                    <InputLabel>Website</InputLabel>
                                    <Input
                                        id="Website"
                                        type="text"
                                        startAdornment={
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <i className="zmdi zmdi-globe-alt"></i>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </div>
                                <div className="col-md-6 mt-20">
                                    <InputLabel>Twitter</InputLabel>
                                    <Input
                                        id="twitter"
                                        type="text"
                                        startAdornment={
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <i className="zmdi zmdi-twitter"></i>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </div>
                                <div className="col-md-6 mt-20">
                                    <InputLabel>Instagarm</InputLabel>
                                    <Input
                                        id="instagram"
                                        type="text"
                                        startAdornment={
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <i className="zmdi zmdi-instagram"></i>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </div>
                            </div>

                            <div className="row" style={{padding: '10px 20px'}}>
                                <FormControl style={{display: 'block',padding:'10px 20px'}} fullWidth>
                                    <FormGroup aria-label="position" style={{display: 'block'}} row>
                                        <TextField id="short-des" fullWidth label="About Short Text (Max 120)" multiline rows="4"/>
                                    </FormGroup>
                                </FormControl>
                                <FormControl style={{display: 'block',padding:'10px 20px'}} fullWidth>
                                    <InputLabel className="ml-20">About</InputLabel>
                                    <ReactQuill modules={modules} formats={formats} placeholder="Enter Your Message.." className="mt-50"/>
                                </FormControl>
                                <FormControl style={{display: 'block'}} fullWidth>
                                    <FormGroup aria-label="position" style={{display: 'block'}} row>
                                        <Button variant="contained" onClick={this.handleClose} color="primary" className="mt-10 mb-10" style={{float:'right'}}>
                                            <i className="ti-save"></i>&nbsp;Save Change
                                        </Button>
                                    </FormGroup>
                                </FormControl>
                            </div>
                            
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-md-6">
                        <RctCollapsibleCard
                            customClasses="trafic-bar-chart"
                            colClasses="d-sm-full"
                            heading={<IntlMessages id="Profile QR Code" />}
                            collapsible
                            closeable
                            fullBlock
                        >
                            <img src={require('Assets/img/qrcode.png')} style={{width: '200px',display:'inherit'}} className="m-auto img-thumbnail"/>
                            <div className="row mt-20">
                                <FormControl style={{display: 'block',padding: '0 20px'}} fullWidth>
                                    <FormGroup aria-label="position" style={{display: 'block'}} row>
                                        <Button variant="contained" onClick={this.handleClose} color="primary" className="mt-10 mb-10" style={{float:'right'}}>
                                            <i className="ti-save"></i>&nbsp;Save Change
                                        </Button>
                                    </FormGroup>
                                </FormControl>
                            </div>
                        </RctCollapsibleCard>
                    </div>
                </div>
            </div>
        );
    }
 }