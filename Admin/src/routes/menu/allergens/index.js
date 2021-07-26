/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
 
 // intl messages
 import IntlMessages from 'Util/IntlMessages';
import { TextField, FormControl,FormLabel,Button,Chip } from '@material-ui/core';
import ImageUploader from 'react-images-upload';
import Axios from 'axios';
import NotificationManager from 'react-notifications/lib/NotificationManager';
 
 export default class Allergens extends Component {
     state = {
        pictures: [],
        name: '',
        list: [],
        updateIndex: -1
     }

     componentDidMount() {
         Axios.post(REACT_APP_BACKEND_API + 'allergenlist').then(res=>{
            this.setState({
                list: res.data
            })
         })
     }
     onDrop(picture) {
         console.log(picture);
        this.setState({
            pictures: picture[0],
        });
    }
    setUpdate(index) {
        console.log(index);
        this.setState({
            name: this.state.list[index].name,
            updateIndex: index,
        })
    }
    submitData() {
        let sendData = new FormData();
        sendData.append('name', this.state.name);
        sendData.append('image', this.state.pictures);
        let url = 'addallergen';
        if (this.state.updateIndex > -1) {
            sendData.append('id',this.state.list[this.state.updateIndex].id);
            sendData.append('img_url',this.state.list[this.state.updateIndex].img_url);
            url = 'updateallergen';
        }
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        Axios.post(REACT_APP_BACKEND_API + url, sendData, headers).then(res=>{
            const { data } = res;
            if (res.status) {
                NotificationManager.success('Success');
                this.setState({
                    list: data.data,
                    updateIndex: -1,
                    name: '',
                    pictures: []
                })
            }
        }).catch(err => {
            NotificationManager.error('Error');
        })
    }
    deleteAllergen(index) {
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        Axios.post(REACT_APP_BACKEND_API + 'deleteallergen', {id: this.state.list[index].id}, headers).then(res=>{
            const { data } = res;
            if (res.status) {
                NotificationManager.success('Success');
                this.setState({
                    list: data.data,
                    updateIndex: -1,
                    name: '',
                    pictures: []
                })
            }
        }).catch(err => {
            NotificationManager.error('Error');
        })
    }
     render() {
         const  { name, list } = this.state;
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Allergens</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.allergens" />} match={this.props.match} />
                 <div className="row">
                    <RctCollapsibleCard
                        heading="New Allergens"
                        colClasses="col-lg-6 col-md-6 col-sm-12 d-sm-full"
                        collapsible
                        closeable
                        fullBlock
                    >
                        <div className="col-md-10 offset-md-1">
                            <FormControl fullWidth>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    type="text"
                                    onChange={(e)=>this.setState({name: e.target.value})}
                                    value={name}
                                    fullWidth
                                />
                            </FormControl>
                            <FormControl className="mt-30">
                                <FormLabel>Image</FormLabel>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={(picture)=>this.onDrop
                                    (picture)}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                    singleImage={true}
                                />
                            </FormControl>
                            <FormControl style={{display:'block'}}>
                                <Button variant="contained" className="btn-info text-white mt-20 mb-10 pull-right" onClick={()=>this.submitData()}>
                                    Submit
                                </Button>
                            </FormControl>
                        </div>
                        
                    </RctCollapsibleCard>
                    <RctCollapsibleCard
                        heading="Allergens"
                        colClasses="col-lg-6 col-md-6 col-sm-12 d-sm-full"
                        collapsible
                        closeable
                        fullBlock
                    >
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>Sl</th>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            list.map((item,index)=>{
                                                return (
                                                    <tr key={index}>
                                                        <td>{ index + 1 }</td>
                                                        <td>{ item.name }</td>
                                                        <td className="text-center">
                                                            <img src={REACT_APP_BACKEND_HOST + 'images/' + item.img_url} alt="allergen_img" className="w-30"/>
                                                        </td>
                                                        <td><span className="badge badge-success"><i className="ti-check"></i>&nbsp;Live</span></td>
                                                        <td>
                                                            <Button variant="contained" className="btn-info text-white pull-left" onClick={()=>this.setUpdate(index)}>
                                                            <i className="zmdi zmdi-edit"></i></Button>
                                                            <Button variant="contained" className="btn-danger text-white mt-10 " onClick={()=>this.deleteAllergen(index)}><i className="zmdi zmdi-delete"></i></Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        
                    </RctCollapsibleCard>
                    
                 </div>
             </div>
         );
     }
 }
 