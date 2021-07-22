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
import Axios from 'axios';
import NotificationManager from 'react-notifications/lib/NotificationManager';

export default class Specialites extends Component {
    constructor(props) {
        super(props)
        this.state = {
            monthlyPlan: true,
            premiumPlan: 300,
            enterprisePlan: 590,
            open: false,
            modalTitle: 'Add Package',
            tmp: [],
            activeIndex: -1,
            speciallist: [],
            dialog: {
                special_name: '',
                price: '',
                short_about: '',
                more_about: '',
                image:''
            }
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
    componentWillMount() {
        const headers = {
            'Accept':'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        Axios.post(REACT_APP_BACKEND_API + 'speciallist',{},{headers: headers}).then(res=>{
            const { data } = res;
            this.resetStates(data);
        })
    }
    modifyCreate() {
        const { dialog, activeIndex,tmp } = this.state;
        //console.log(activeIndex);
        let sendData = new FormData();
        for (let key in dialog) {
            sendData.append(key, dialog[key]);
        }
        const headers = {
            'Accept':'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        if (activeIndex > -1) {
            sendData.append('id',tmp[activeIndex].id);
            sendData.append('img_url',tmp[activeIndex].img_url);
        }
        Axios.post(`http://localhost:8000/api/${activeIndex == -1 ? 'createspecial': 'updatespecial'}`,sendData, {headers: headers}).then(res=>{
            const { data } = res;
            if ( data.status ) {                
                this.resetStates(data.data);
                NotificationManager.success('Success!');
            }
            else NotificationManager.error('Failure!');
        })
    }
    itemEdit(arg) {
        const { tmp, dialog } = this.state;
        //console.log(tmp, dialog);
        for (let key in dialog ) {
            dialog[key] = tmp[arg][key];
        }
        dialog['image'] = '';
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
        Axios.post(REACT_APP_BACKEND_API + 'removespecial',{id: tmp[arg].id},{headers: headers}).then(res=>{
            const { data } = res;
            this.resetStates(data.data);
            if (data.success) {
                NotificationManager.success('Successfully Removed!');
            }
        })
    }
    resetStates(data) {
        let tmp = [], speciallist = [];
        data.map((item, index)=>{
            tmp.push(item);
            let row = [index + 1];
            const keys = ['img_url','special_name','price','status'];
            keys.map(key=> {
                row.push(item[key]);
            })
            speciallist.push(row);
        })
        this.setState({
            speciallist: speciallist,
            tmp: tmp
        })
    }

    render() {
        const { dialog, speciallist } = this.state;
        const columns = [
            {
                name: "Sl"
            },
            {
                name: "Images",
                options: {
                    customBodyRender: (value, tableMeta) => (
                        <img src={`http://localhost:8000/images/${value}`} style={{width: '50px',height: '50px'}} alt=""/>
                    )
                }
            },
            {
                name: "Name"
            },
            {
                name: "Price"
            },
            {
                name: "Status",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        (
                            value ?
                            <span className="badge badge-success">Live</span>
                            : <span className="badge badge-danger">Hide</span>
                        )
                    )
                }
            },
            {
                name: "Action",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>
                            <Button variant="contained" className="btn-primary text-white btn-icon" onClick={()=>this.itemEdit(tableMeta.rowIndex)}><i className="zmdi zmdi-edit"></i></Button>
                            <Button variant="contained" className="btn-danger text-white btn-icon" onClick={()=>this.itemRemove(tableMeta.rowIndex)}>
                                <i className="zmdi zmdi-delete"></i></Button>
                        </div>
                    )
                }
            }
        ];
        const data = speciallist;
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
                                <TextField margin="dense" id="name" label="Name" type="text" fullWidth value={dialog.special_name} onChange={(e)=>this.setState({
                                    dialog: {...dialog, special_name: e.target.value}
                                })}/>
                                <FormControl className="mt-20">
                                    <Input
                                        id="price"
                                        type="number"
                                        endAdornment={
                                            <InputAdornment position="end">Kr</InputAdornment>
                                        }
                                        value={dialog.price} onChange={(e)=>this.setState({
                                            dialog: {...dialog, price: e.target.value}
                                        })}
                                        style={{width: '50%'}}
                                    />
                                </FormControl>
                                <FormControl style={{display: 'block',padding:'10px 0px'}} className="mt-20" fullWidth>
                                    <FormGroup aria-label="position" style={{display: 'block'}} row>
                                        <TextField id="short-des" fullWidth label="About Short Text (Max 120)" multiline rows="4"  value={dialog.short_about} onChange={(e)=>this.setState({
                                    dialog: {...dialog, short_about: e.target.value}
                                })}/>
                                    </FormGroup>
                                </FormControl>
                                <ReactQuill modules={modules} formats={formats} placeholder="Enter Your Message.." className="mt-30"  value={dialog.more_about} onChange={(value)=>this.setState({
                                    dialog: {...dialog, more_about: value}
                                })}/>
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
                                        onChange={(image)=>this.setState({
                                            dialog: {...dialog, image: image[0]}
                                        })}
                                    />
                                </FormControl>
                                <FormControl style={{display:'block'}}>
                                    <Button variant="contained" className="btn-info text-white mt-20 mb-10 pull-right" onClick={()=>this.modifyCreate()}>
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
