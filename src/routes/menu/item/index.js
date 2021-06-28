/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
 import {Button as MatButton} from '@material-ui/core';
 // intl messages
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import MUIDataTable from "mui-datatables";
import ReactQuill from 'react-quill';

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
    FormGroup,
    FormLabel
} from '@material-ui/core';

import ImageUploader from 'react-images-upload';
export default class Item extends Component {
    state = {
        open: false,
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
     render() {
        const columns = [
            {
                name: "Sl"
            },
            {
                name: 'Categories'
            },
            {
                name: "Items"
            }
        ];
        const data = [
        ];
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
                     <title>Items</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.item" />} match={this.props.match} />
                 <Button className="btn btn-info text-white" variant="contained" onClick={this.handleClickOpen}>
                    <i className="ti-plus"></i> Add New
                </Button>
                 <RctCollapsibleCard
                    heading="Items"
                    collapsible
                    fullBlock
                >
                    <MUIDataTable
                        data={data}
                        columns={columns}
                        // options={options}
                    />
                 </RctCollapsibleCard>
                 <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
                    <DialogTitle id="form-dialog-title">Add Items</DialogTitle>
                    <DialogContent>
                        <div className="row">                        
                            <div className="col-md-12">
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel htmlFor="packagetype">Category</InputLabel>
                                    <Select id="packagetype">
                                        <MenuItem value="">Select</MenuItem>
                                        <MenuItem value="free">Pizza</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel htmlFor="tables">Allergens</InputLabel>
                                    <Select id="tables">
                                        <MenuItem value="">Select</MenuItem>
                                        <MenuItem value="free">Gluten</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField margin="dense" id="title" label="Title" type="text" fullWidth/>
                                <FormControl style={{display: 'block',padding:'10px 0px'}} className="mt-20" fullWidth>
                                    <FormGroup aria-label="position" style={{display: 'block'}} row>
                                        <TextField id="short-des" fullWidth label="Small Description" multiline rows="4"/>
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
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleClose} color="primary" className="text-white">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={this.handleClose} className="btn-info text-white">Create</Button>
                    </DialogActions>
                </Dialog>
            
             </div>
         );
     }
 }
 