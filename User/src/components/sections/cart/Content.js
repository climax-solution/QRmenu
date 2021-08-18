import React, { Component } from 'react';
import { Link,Route,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import validator from 'validator';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { Input, FormGroup, Label } from 'reactstrap';
import { Modal, Button } from 'react-bootstrap';

import { addCart, emptyCart, removeCart } from '../../../store/actions/cart.actions';
import swal from '@sweetalert/with-react';
// import Stripe from 'stripe';
const tax = 9.99;

const Sample = () => {
    return (
        <div>
        <div className="text-center">
            <img src={`${process.env.REACT_APP_BACKEND_HOST}/qrcode/1627548859.png`} alt="234" className="w-50"/>
        </div>
        <div className="text-center">
            {/* <a className="badge badge-success" href={process.env.REACT_APP_BACKEND_HOST+ qrcode} download>Download</a> */}
            <button className="badge badge-success download-btn" onClick={alert()}>
                Download
            </button>
            <a href={`${process.env.REACT_APP_BACKEND_HOST}/qrcode/1627548859.png`} download="test.png" target="__blank">Download1</a>
        </div>
        <div className="text-center">
        </div>
    </div>
    )
}
class Content extends Component {
    constructor(props) {
        super(props);
        if (props.cart_list == null ) props.history.push('/');
        this.state = {
            priceTotal: this.props.cart_list[window.location.host].reduce((totalPrice, item) => totalPrice + Number(item.price) * item.qty, 0),
            cartitem: this.props.cart_list ? this.props.cart_list[window.location.host] : [],
            ordertypelist: [],
            typename: ['Kontantbetaling ved levering','Bestilling','Henting'],
            formData: {
                name: '',
                email: '',
                phone: '',
                order_type: -1,
            },
            stripeInput: {
                card_number: '',
                cvc: '',
                expire_mm: '',
                expire_yy: ''
            },
            address:'',
            google_map: '',
            guest_number: '',
            date_time: '',
            time: '',
            activeTable:'',
            table_guest: '',
            activeOrderType: -1,
            activePerson:'',
            modalshow: false,
        };
    }

    componentDidMount() {
        const sendData = {
            subdomain: window.location.host
        }
        axios.post(process.env.REACT_APP_BACKEND_API + 'user/getordertypelist',sendData).then(res=>{
            const { data } = res;
            this.setState({
                ordertypelist: [data.content_betal, data.bestilling, data.henting, data.betal, data.spis]
            })
        })
    }

    componentDidUpdate(preprops) {
        const nowProps = !this.props.cart_list ? [] : this.props.cart_list[window.location.host];
        if (preprops.cart_list != this.props.cart_list) {
            this.setState({
                cartitem: nowProps
            })
        }
        if (!this.state.cartitem.length) this.props.history.push('/');
    }

    IncrementItem = (item) => {
        item.qty = item.qty + 1;
        this.setState({ cartitem: this.state.cartitem, priceTotal: this.state.cartitem.reduce((totalPrice, item) => totalPrice + Number(item.price) * item.qty, 0) });
    };

    DecreaseItem = (item) => {
        item.qty = item.qty - 1;
        if (item.qty < 0) item.qty = 0;
        this.setState({ cartitem: this.state.cartitem, priceTotal: this.state.cartitem.reduce((totalPrice, item) => totalPrice + Number(item.price) * item.qty, 0) });
    };
    
    personList() {
        let list = [];
        for (let i = 0; i < 9; i ++) {
            list.push(<option value={i+1} key={i}>{i+1}</option>);
        }
        return list;
    }

    runAlert = () =>{
        alert('dddd')
    }


    placeOrder() {
        swal({
            buttons: {
                cancel: "Close",
                download: "Download",
            },
            content: (
                <div>
                    {/* <div className="text-center">
                        <img src={process.env.REACT_APP_BACKEND_HOST+ qrcode} alt="234" className="w-50"/>
                    </div>
                    <div className="text-center">
                        <p>Your Order Id: {order_id}</p>
                    </div> */}
                </div>
            )
        }).then((value) => {
            switch (value) {
           
              case "cancel":
                break;

              default:
                this.download();
            }
        });
        const { formData } = this.state;
        let flag = 0;
        for(let key in formData) {
            if (formData[key] == '' || key == 'email' && !validator.isEmail(formData[key])) flag = 1;
        }
        //console.log(flag);
        switch(formData.order_type) {
            case '1':
                if ( !this.state.activePerson || !this.state.date_time) {
                    flag = 1;
                }
                break;
            case '2':
                // if (!validator.isDate(this.state.time))
                    // flag = 1;

                break;
            case '3':
                break;
            case '4': 
                if (this.state.activeTable == '' || this.state.activePerson == '') {

                    flag = 1;
                }
                break;
            default:
                if (this.state.address == '' || this.state.google_map == '') {

                    flag = 1;
                }
                break;
        }

        if (flag) {
            NotificationManager.warning('Input is invalid');
            return;
        }
        else {
            switch(formData.order_type) {
                case 1:
                    formData['guest_number'] = this.state.activePerson;
                    formData['date_time'] = this.state.date_time;
                    break;
                case 2:
                    formData['time'] = this.state.time;
                    break;
                case 3:
                    break;
                case 4: 
                    formData['table'] = this.state.activeTable;
                    formData['table_guest'] = this.state.activePerson;
                    break;
                default:
                    formData['address'] = this.state.address;
                    formData['google_map'] = this.state.google_map;
                    break;
            }
        }
        formData['subdomain'] = window.location.host;
        formData['domain_url'] = window.location.origin + window.location.pathname; 
        formData['carts'] = JSON.stringify(this.props.cart_list[window.location.host]);
        formData['total'] = this.state.priceTotal;
        axios.post(process.env.REACT_APP_BACKEND_API + 'user/placeorder',formData).then(res=>{
           const { status, order_id, qrcode } = res.data;
           if (status) {
               NotificationManager.success('Successfully Ordered!');
                swal({
                    text: 'Ordered successfully! You can check your orderlist by phone and order id',
                    buttons: {
                        cancel: "Close",
                        download: "Download",
                    },
                    content: (
                        <div>
                            <div className="text-center">
                                <img src={process.env.REACT_APP_BACKEND_HOST+ qrcode} alt="234" className="w-50"/>
                            </div>
                            <div className="text-center">
                                <p>Your Order Id: {order_id}</p>
                            </div>
                        </div>
                    )
                }).then((value) => {
                    switch (value) {
                   
                      case "cancel":
                        break;

                      default:
                        this.download(process.env.REACT_APP_BACKEND_HOST+ qrcode);
                        
                    }
                    this.props.emptyCart();
                });
            }
           else NotificationManager.error('Failure!');
        }) 
    }
    
    download = (links) => {
        axios.get(links,{
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
          .then(response => {
            response.arrayBuffer().then(function(buffer) {
              const url = window.URL.createObjectURL(new Blob([buffer]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "image.png"); //or any other extension
              document.body.appendChild(link);
              link.click();
            });
          })
          .catch(err => {
            //console.log(err);
          });
    };
    render() {
        
        const {
            cartitem,
            ordertypelist,
            typename,
            formData,
        } = this.state;
        return (
            <section className="section">
                <NotificationContainer/>
                <div className="container">
                    {/* Cart Table Start */}
                    <table className="ct-responsive-table">
                        <thead>
                            <tr>
                                <th className="remove-item" />
                                <th>Product</th>
                                <th>Price</th>
                                <th>Qunantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartitem.map((item, i) => (
                                <tr key={i}>
                                    <td className="remove">
                                        <button type="button" className="close-btn close-danger remove-from-cart" onClick={(i)=>this.props.removeCart(i)}>
                                            <span />
                                            <span />
                                        </button>
                                    </td>
                                    <td data-title="Product">
                                        <div className="cart-product-wrapper">
                                            <img src={process.env.REACT_APP_BACKEND_HOST + "images/" + item.img_url} alt={item.name} />
                                            <div className="cart-product-body">
                                                <h6> <Link to="#">{item.name}</Link> </h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-title="Price"> <strong>{new Intl.NumberFormat().format((Number(item.price)).toFixed(2))}Kr</strong> </td>
                                    <td className="quantity" data-title="Quantity">
                                        <div className="qty">
                                            <span className="qty-subtract" onClick={() => this.DecreaseItem(item)}><i className="fa fa-minus" /></span>
                                            <input type="text" name="clicks" value={item.qty} readOnly/>
                                            <span className="qty-add" onClick={() => this.IncrementItem(item)}><i className="fa fa-plus" /></span>
                                        </div>
                                    </td>
                                    <td data-title="Total"> <strong>{new Intl.NumberFormat().format((Number(item.price) * item.qty).toFixed(2))}Kr</strong> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Cart Table End */}
                    {/* Coupon Code Start */}
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group mb-0">
                                <div className="input-group mb-2">
                                    <input type="text" className="form-control" placeholder="Full Name" aria-label="Full Name" value={formData.name} onChange={(e) => this.setState({
                                        formData: {...formData, name: e.target.value}
                                    })}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <div className="input-group mb-0">
                                    <input type="email" className="form-control" placeholder="Enter Email" aria-label="Email"  value={formData.email} onChange={(e) => this.setState({
                                        formData: {...formData, email: e.target.value}
                                    })}/>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <div className="input-group mb-0">
                                    <input type="text" className="form-control" placeholder="Enter Phone" aria-label="Phone"  value={formData.phone} onChange={(e) => this.setState({
                                        formData: {...formData, phone: e.target.value}
                                    })} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <div className="input-group mb-0">
                                    <select className="form-control" value={formData.order_type} onChange={(e)=> this.setState({
                                        formData:{...formData, order_type: e.target.value}
                                    })}>
                                        <option value="-1">Select order type</option>
                                        {
                                            ordertypelist.map((item, index )=>{
                                                return item && typename[index] && <option value={index} key={index}>{typename[index]}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    { formData.order_type == 0 &&<div className="row">
                        <div className="col-lg-12">
                            <div className="form-group mb-2">
                                <div className="input-group mb-0">
                                    <textarea className="form-control" placeholder="Address" rows="5"  value={this.state.address} onChange={(e) => this.setState({
                                        address: e.target.value
                                    })}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="form-group mb-2">
                                <div className="input-group mb-0">
                                    <input className="form-control" placeholder="Google Map Link"   value={this.state.google_map} onChange={(e) => this.setState({
                                        google_map: e.target.value
                                    })}/>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {
                        formData.order_type == 1 && <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <div className="input-group mb-0">
                                    <select className="form-control" value={this.state.activePerson} onChange={(e)=> this.setState({
                                            activePerson: e.target.value
                                        })}>
                                            <option value="">Select person</option>
                                            {
                                                this.personList()
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group mb-2">
                                    <div className="input-group mb-0">
                                        <input type="datetime-local" className="form-control"   value={this.state.date_time} onChange={(e) => this.setState({
                                        date_time: e.target.value
                                    })}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        formData.order_type == 2 && <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group mb-2">
                                    <div className="input-group mb-0">
                                        <input type="time" className="form-control" value={this.state.time} onChange={(e) => this.setState({
                                        time: e.target.value
                                    })}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        formData.order_type == 4 && <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <div className="input-group mb-0">
                                    <select className="form-control" value={this.state.activePerson} onChange={(e) => this.setState({
                                        activePerson: e.target.value
                                    })}>
                                        <option value="">Select person</option>
                                        {
                                            this.personList()
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group mb-2">
                                <div className="input-group mb-0">
                                    <select className="form-control" value={this.state.activePerson} onChange={(e) => this.setState({
                                        activePerson: e.target.value
                                    })}>
                                        <option value="">Select person</option>
                                        {
                                            this.personList()
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    {/* Coupon Code End */}
                    {/* Cart form Start */}
                    <div className="row ct-cart-form">
                        <div className="offset-lg-6 col-lg-6">
                            <h4>Cart Total</h4>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>{new Intl.NumberFormat().format((this.state.priceTotal).toFixed(2))}Kr</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="button" className="btn-custom primary btn-block" onClick={()=>this.placeOrder()}>Order</button>
                        </div>
                    </div>
                    {/* Cart form End */}
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    cart_list: JSON.parse(state.content.cart_list)
})
const mapStateToDispatch = dispatch => ({
    removeCart: (key) => dispatch(removeCart(key)),
    emptyCart: () => dispatch(emptyCart()),
})
export default withRouter(connect(mapStateToProps,mapStateToDispatch)(Content));