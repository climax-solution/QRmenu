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
import Axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { data } from 'jquery';

 export default class Package extends Component {
    constructor(props) {
        super(props)
        this.state = {
            monthlyPlan: true,
            premiumPlan: 300,
            enterprisePlan: 590,
            open: false,
            modalTitle: 'Add Package',
            activeIndex: -1,
            dialog: {
                image: [],
                package_name: '',
                price: '',
                details: '',
            },
            tmp: [],
            list: []
        }
    }
    
    componentDidMount() {
        const headers = {
            'Accept':'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        const { tmp } = this.state;
        Axios.post(REACT_APP_BACKEND_API + 'drinklist',{}, {headers: headers}).then(res=>{
            const { data } = res;
            const { list } = this.state;
            data.map((item, index)=>{
                const key_list = ['package_name', 'img_url','price'];
                let row = [index + 1];
                key_list.map(key=>{
                    row.push(item[key]);
                })
                list.push(row);
            })
            this.setState({
                list: list,
                tmp: data
            })
        })  
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
    modifyCreate = () => {
        const { dialog, activeIndex, tmp } = this.state;
        let flag = 0;
        let sendData = new FormData();
        const headers = {
            'Accept':'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        for (let key in dialog ) {
            sendData.append(key, dialog[key]);
            if (activeIndex != -1 && key == 'image') continue;
            if (!dialog[key] ) flag = 1;
        }
        if (activeIndex != -1) {
            sendData.append('id', tmp[activeIndex].id);
            sendData.append('img_url', tmp[activeIndex].img_url);
        }
        if (flag) {
            NotificationManager.warning('Input is invalid. Please check!');
            return;
        }
        
        Axios.post(`${REACT_APP_BACKEND_API}${activeIndex == -1 ? 'createdrink' : 'updatedrink'}`,sendData,{headers: headers}).then(res=>{
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
                    image: [],
                    package_name: '',
                    price: '',
                    details: '',
                }
            })
        })
    }

    itemEdit(arg) {
        const { tmp, dialog } = this.state;
        //console.log(tmp, dialog);
        const key_list = ['package_name', 'img_url','price'];

        key_list.map(key =>{
            dialog[key] = tmp[arg][key];
        })
        this.setState({
            dialog: dialog,
            open: true,
            activeIndex: arg,
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
        Axios.post(REACT_APP_BACKEND_API + 'removedrink',{id: tmp[arg].id},{headers: headers}).then(res=>{
            const { data } = res;
            this.resetStates(data.data);
            if (data.status) {
                NotificationManager.success('Successfully Removed!');
            }
        })
    }

    resetStates(data) {
        let tmp = [], item_list = [];
        data.map((item, index)=>{
            tmp.push(item);
            let row = [index + 1];
            const key = ['package_name','img_url','price'];
            key.map(it => {
                row.push(item[it]);
            })
            item_list.push(row);
        })
        this.setState({
            list: item_list,
            tmp: tmp
        })
    }
     render() {
        const { dialog, list } = this.state;
        const columns = [
            {
                name: "Sl"
            },
            {
                name: "Package Name"
            },
            {
                name: "Image",
                options:{
                    customBodyRender: (value) => (
                        <img src={`${REACT_APP_BACKEND_HOST}images/${value}`} alt="images" style={{width: '50px', height: '50px'}}/>
                    )
                }
            },
            {
                name: "Price"
            },
            {
                name: "Action",
                options:{
                    customBodyRender: (value, meta) => (
                        <div>
                            <Button variant="contained" className="btn-icon text-white btn-primary" onClick={()=>this.itemEdit(meta.rowIndex)}>
                                <i className="zmdi zmdi-edit"></i>
                            </Button>
                            <Button variant="contained" className="btn-icon text-white btn-danger ml-2" onClick={()=>this.itemRemove(meta.rowIndex)}>
                                <i className="zmdi zmdi-delete"></i>
                            </Button>
                        </div>
                    )
                }
            }
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
                            data={list}
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
                                <div className="row">
                                    <div className="col-md-6">
                                        <TextField
                                            margin="dense"
                                            id="name"
                                            label="Package name"
                                            type="text"
                                            fullWidth
                                            value={dialog.package_name}
                                            onChange={(e)=>this.setState({dialog:{...dialog, package_name: e.target.value}})}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField
                                            margin="dense"
                                            id="price"
                                            label="Price"
                                            type="text"
                                            fullWidth
                                            value={dialog.price}
                                            onChange={(e)=>this.setState({dialog:{...dialog, price: e.target.value}})}
                                        />
                                    </div>
                                </div>
                                <ReactQuill
                                    modules={modules}
                                    formats={formats}
                                    placeholder="Enter Your Message.."
                                    className="mt-30"
                                    value={dialog.details}
                                    onChange={(value)=>this.setState({dialog:{...dialog,  details: value }})}
                                />
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                    singleImage={true}
                                    value={dialog.image}
                                    onChange={
                                        (src)=>this.setState({
                                            dialog:{...dialog,  image: src[0]}
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleClose} color="primary" className="text-white">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={()=>this.modifyCreate()} className="btn-info text-white">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
             </div>
         );
     }
 }
 