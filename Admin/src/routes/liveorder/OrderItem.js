import React, {useState, useEffect} from 'react';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
   Card,
   CardImg,
   CardText,
   CardBody,
   CardTitle,
   CardSubtitle,
   Button,
} from 'reactstrap';
// data

// helpers
import './custom.css';
import Axios from 'axios';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';

const OrderItem = ({ id, resetState }) => {
   const [item_list, setItemList] = useState([]);
   const [order_info, setOrderInfo] = useState([]);
   useEffect(()=>{
      Axios.post( REACT_APP_BACKEND_API + 'getorderitem',{ id: id}).then(res=>{
         const { data } = res;
         setItemList(data.data);
         setOrderInfo(data.src);
     })
   },[])
   const updateItem = ( status ) => {
      const headers = {
          'Accept':'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      Axios.post(REACT_APP_BACKEND_API + 'updateorder', {id: id, status: status},{headers:headers}).then(res=>{
          const { data } = res;
          if ( data.status ) {
               resetState(data.data);
               setOrderInfo(data.src);
               console.groupCollapsed(data.src);
               NotificationManager.success('Success!');
          }
      })
  }
   return (
      <div className="chat-sidebar rct-customizer">
         <AppBar position="static" color="primary">
            <Toolbar>
               <Typography color="inherit">
                  Order Details
               </Typography>
            </Toolbar>
         </AppBar>
         <List>
            <div className="alert bg-info text-white" role="alert">
               <h2>Order ID: {id}</h2>
            </div>
            <div>
               <CardBody>
                  <CardTitle>Name: {order_info.name} </CardTitle>
                  <CardTitle>Phone: {order_info.phone} </CardTitle>
                  <CardTitle>Email: {order_info.email} </CardTitle>
                  <CardTitle>Order: {moment(order_info.created_at).format('YYYY-MM-DD hh:mm')} </CardTitle>
                  {/* <CardTitle>Accept:  </CardTitle> */}
               </CardBody>
            </div>
            <div className="text-center mb-10">
               {
                  order_info.status == '0' && <Button color="primary" className="ml-1" onClick={() => updateItem('1')}>Accept</Button>
               }
               {
                  order_info.status > '0' && <Button color="primary" className="ml-1">Accepted</Button>
               }
               {
                  order_info.status > '-1' && order_info.status < '2' && <Button color="success" className="ml-1" onClick={() => updateItem('2')}>Complete</Button>
               }
               {
                  order_info.status == '2' && <Button color="success" className="ml-1">Completed</Button>
               }
               {
                  order_info.status == '0' && <Button color="danger" className="ml-1" onClick={() => updateItem('-1')}>Cancel</Button>
               }
            </div>
            {
               item_list.map((item, i)=>{
                  return <Card key={i}>
                     <CardImg top width="100%" className="img-fluid ripple-effect" src={REACT_APP_BACKEND_HOST + 'images/' + item.img_url } alt="Card image cap" />
                     <CardBody>
                        <CardTitle>Name: {item.name}</CardTitle>
                        <CardTitle>Price: {item.price}kr</CardTitle>
                        <CardTitle>Qty: {item.qty}</CardTitle>
                     </CardBody>
                  </Card>
               })
            }
            
         </List>
         <div className="text-center">
            <Link
               className="btn-success btn"
               to={"orderitem/"+id}
            >
                  <i className="zmdi zmdi-eye">Order Details</i>
            </Link>
         </div>
      </div>
   )
}

export default OrderItem;
