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
import Axios from 'axios';
import NotificationManager from 'react-notifications/lib/NotificationManager';
export default class Item extends Component {
    state = {
        open: false,
        activeIndex: -1,
        category_list: [],
        activeCategory: '',
        item_list: [],
        allergen_list: [],
        tmp: [],
        dialog: {
            category: '',
            title: '',
            short_des: '',
            status: 1,
            more_des: '',
            price: '',
            allergen: '',
            image:''
        }
    }

    componentDidMount() {
        const headers = {
            'Accept':'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        Axios.post(REACT_APP_BACKEND_API + 'categorylist',{},{headers: headers}).then(res=>{
            const { category_list } = this.state;
            const { data } = res;
            data.map(item=>{
                let row = { id: item.id, name: item.category_name};
                category_list.push(row);
            })
            this.setState({
                category_list: category_list
            })
        })
        Axios.post(REACT_APP_BACKEND_API + 'allergenlist').then(res=>{
            const { allergen_list } = this.state;
            const { data } = res;
            data.map(item=>{
                let row = { id: item.id, name: item.name};
                allergen_list.push(row);
            })
            this.setState({
                allergen_list: allergen_list
            })
        })
        Axios.post(REACT_APP_BACKEND_API + 'itemlist',{},{headers: headers}).then(res=>{
            const { data } = res;
            this.resetStates(data);
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false, activeIndex: -1 });
    };

    modifyCreate = () => {
        const { dialog, activeIndex, tmp } = this.state;
        let flag = 0;
        let sendData = new FormData();
        const headers = {
            'Content-type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        for (let key in dialog ) {
            sendData.append(key, dialog[key]);
            if (activeIndex != -1 && key == 'image') continue;
            if (!dialog[key] && key != 'allergen' ) flag = 1;
        }
        if (activeIndex != -1) {
            sendData.append('id', tmp[activeIndex].id);
            sendData.append('img_url', tmp[activeIndex].img_url);
        }
        if (flag) {
            NotificationManager.warning('Input is invalid. Please check!');
            return;
        }
        
        Axios.post(`${REACT_APP_BACKEND_API}${activeIndex == -1 ? 'createitem' : 'updateproduct'}`,sendData,{headers: headers}).then(res=>{
            if (res.data.status) {
                NotificationManager.success('Sucess!');
                this.resetStates(res.data.data);
            }
            else {
                NotificationManager.success('Failure!');
            }
            this.setState({
                open: false,
                activeIndex: -1,
                dialog: {
                    category: '',
                    title: '',
                    short_des: '',
                    status: 1,
                    more_des: '',
                    price: '',
                    allergen: '',
                    image:''
                }
            })
        })
    }

    itemEdit(arg) {
        const { tmp, dialog } = this.state;
        //console.log(tmp, dialog);
        for (let key in dialog ) {
            dialog[key] = tmp[arg][key];
        }
        this.setState({
            dialog: dialog,
            open: true,
            activeIndex: arg,
        })
    }

    resetStates(data) {
        let tmp = [], item_list = [];
        data.map((item, index)=>{
            tmp.push(item);
            let row = [index + 1];
            const key = ['img_url','title','price','status'];
            key.map(it => {
                row.push(item[it]);
            })
            item_list.push(row);
        })
        this.setState({
            item_list: item_list,
            tmp: tmp
        })
    }
    itemRemove(arg) {
        //console.log(this.state);
        const { tmp } = this.state;
        const headers = {
            'Accept':'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        Axios.post(REACT_APP_BACKEND_API + 'removeitem',{id: tmp[arg].id},{headers: headers}).then(res=>{
            const { data } = res;
            this.resetStates(data.data);
            if (data.status) {
                NotificationManager.success('Successfully Removed!');
            }
        })
    }

     render() {
        const { category_list, dialog, item_list, activeCategory,activeIndex, allergen_list } = this.state;

        const columns = [
            {
                name: "Sl"
            },
            {
                name: 'Images',
                options:{
                    customBodyRender: (value) => (
                        <img src={`http://localhost:8000/images/${value}`} alt="" style={{width: '50px', height: '50px'}}/>
                    )
                }
            },
            {
                name: "Title"
            },
            {
                name: "Price"
            },
            {
                name: "Status",
                options:{
                    customBodyRender: (value,tableMeta) => (
                        <span className="badge badge-success">Live</span>
                    )
                }
            },
            {
                name: "Action",
                options:{
                    customBodyRender: (value,tableMeta) => (
                        <div>
                            <Button variant="contained" className="btn-primary text-white btn-icon" onClick={()=>this.itemEdit(tableMeta.rowIndex)}><i className="zmdi zmdi-edit"></i></Button>
                            <Button variant="contained" className="btn-danger text-white ml-5 btn-icon" onClick={()=>this.itemRemove(tableMeta.rowIndex)}>
                                <i className="zmdi zmdi-delete"></i></Button>
                        </div>
                    )
                }
            }
        ];
        const data = item_list;
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
                {/* <div style={{width: '250px'}} className="pull-right mb-0 mt-0 select-category">
                    <span>Category: </span>
                    <FormControl style={{width: '50%'}}>
                        <Select
                            id="packagetype"
                            value={activeCategory}
                            onChange={(e)=>this.setState({ activeCategory : e.target.value })}
                        >
                            <MenuItem value="">Select</MenuItem>
                            {
                                category_list.map(item=>{
                                    return (
                                        <MenuItem value={item.id} >{item.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div> */}
                
                 <RctCollapsibleCard
                    heading="Items"
                    colClasses="mt-10"
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
                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <FormControl margin="dense" fullWidth>
                                            <InputLabel htmlFor="packagetype">Category</InputLabel>
                                            <Select id="packagetype" value={dialog.category} onChange={(e)=>this.setState({
                                                    dialog: { ...dialog, category: e.target.value}
                                                })
                                            }>
                                                <MenuItem value="" key="0">Select</MenuItem>
                                                {
                                                    category_list.map((item, index)=>{
                                                        return (
                                                            <MenuItem value={item.id} key={index + 1}>{item.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <FormControl margin="dense" fullWidth>
                                            <InputLabel htmlFor="packagetype">Allergen</InputLabel>
                                            <Select id="packagetype" value={dialog.allergen} onChange={(e)=>this.setState({
                                                    dialog: { ...dialog, allergen: e.target.value}
                                                })
                                            }>
                                                <MenuItem value="" key="0">Select</MenuItem>
                                                {
                                                    allergen_list.map((item, index)=>{
                                                        return (
                                                            <MenuItem value={item.id} key={index + 1}>{item.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                
                                <TextField margin="dense" id="title" label="Title" type="text" fullWidth value={dialog.title} onChange={(e)=>this.setState({ dialog:{...dialog, title: e.target.value}})}/>
                                <TextField margin="dense" id="price" label="Price" type="text" fullWidth value={dialog.price} onChange={(e)=>this.setState({ dialog:{...dialog, price: e.target.value}})}/>
                                <FormControl style={{display: 'block',padding:'10px 0px'}} className="mt-20" fullWidth>
                                    <FormGroup aria-label="position" style={{display: 'block'}} row>
                                        <TextField id="short-des" fullWidth label="Small Description" multiline rows="4"  value={dialog.short_des} onChange={(e)=>this.setState({ dialog:{...dialog, short_des: e.target.value}})}/>
                                    </FormGroup>
                                </FormControl>
                                <ReactQuill modules={modules} formats={formats} placeholder="Enter Your Message.." className="mt-30" value={dialog.more_des} onChange={(value)=>this.setState({ dialog:{...dialog, more_des: value}})}/>
                                <FormControl className="mt-30">
                                    <FormLabel>Image</FormLabel>
                                    <ImageUploader
                                        withIcon={true}
                                        buttonText='Choose images'
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                        withPreview={true}
                                        singleImage={true}
                                        value={dialog.image}
                                        onChange={(src)=>this.setState({ dialog:{...dialog, image: src[0]}})}
                                    />
                                </FormControl>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleClose} color="primary" className="text-white">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={()=>this.modifyCreate()} className="btn-info text-white">{ activeIndex == -1 ? 'Create' : 'Update'}</Button>
                    </DialogActions>
                </Dialog>
            
             </div>
         );
     }
 }
 