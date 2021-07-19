import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import validator from 'validator';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { Input, FormGroup, Label } from 'reactstrap';
import { Modal, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { emptyCart, removeCart } from '../../../store/actions/cart.actions';
// import Stripe from 'stripe';
const tax = 9.99;

class Content extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        if (props.cart_list == null ) props.history.push('/');
        this.state = {
            priceTotal: this.props.cart_list[window.location.host].reduce((totalPrice, item) => totalPrice + Number(item.price) * item.qty, 0),
            cartitem: this.props.cart_list[window.location.host],
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
        const Location = window.location;
        const params = (new URLSearchParams(Location.search));
        if (params.get('status') == 'success' && localStorage.getItem('tmp_order')) {
            const sendOrder = JSON.parse(localStorage.getItem('tmp_order'));
            sendOrder['token'] = params.get('token');
            sendOrder['PayerID'] = params.get('PayerID');
            axios.post(process.env.REACT_APP_BACKEND_API + 'user/createorder', sendOrder).then(res=>{
                if (res.data.status) {
                    localStorage.removeItem('tmp_order');
                    localStorage.removeItem(sendOrder['subdomain']);
                    this.props.history.push(Location.pathname);
                }
            })
        }
        const sendData = {
            subdomain: Location.host
        }
        axios.post(process.env.REACT_APP_BACKEND_API + 'user/getordertypelist',sendData).then(res=>{
            const { data } = res;
            this.setState({
                ordertypelist: [data.content_betal, data.bestilling, data.henting, data.betal, data.spis]
            })
        })
        // const script = document.createElement("script");
        // script.src = "https://js.stripe.com/v2/";
        // script.async = true;

        // document.body.appendChild(script);
    }

    componentDidUpdate(preprops) {
        const nowProps = this.props.cart_list[window.location.host];
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
            list.push(<option value={i+1}>{i+1}</option>);
        }
        return list;
    }

    placeOrder() {
        const { formData } = this.state;
        let flag = 0;
        for(let key in formData) {
            if (formData[key] == '' || key == 'email' && !validator.isEmail(formData[key])) flag = 1;
        }

        switch(formData.order_type) {
            case 1:
                if (this.state.activePerson == '' || !validator.isDate(this.state.date_time))
                    flag = 1;
                break;
            case 2:
                // if (!validator.isDate(this.state.time))
                    // flag = 1;
                break;
            case 3:
                break;
            case 4: 
                if (this.state.activeTable == '' || this.state.activePerson == '') 
                    flag = 1;
                break;
            default:
                if (this.state.address == '' || this.state.google_map == '')
                    flag = 1;
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
        // axios.post(process.env.REACT_APP_BACKEND_API + 'user/placeorder',formData).then(res=>{
        //     const { url } = res.data;
        //     const tmp_order = JSON.stringify(formData);
        //     localStorage.setItem('tmp_order',tmp_order);
        //     window.location.assign(url);
        // })
        swal("Please Select Payment", {
            buttons: {
              paypal: {
                text: "PayPal",
                value: 'paypal'
              },
              stripe: {
                text: "Stripe",
                value: "stripe",
              },
              razor: {
                text: 'Razor',
                value: "razor",
              },
              bambora: {
                text: 'Bambora',
                value: "bambora"
              }
            },
          })
          .then((value) => {
            switch (value) {
                case "paypal":
                    axios.post(process.env.REACT_APP_BACKEND_API + 'user/placeorder',formData).then(res=>{
                        const { url } = res.data;
                        const tmp_order = JSON.stringify(formData);
                        localStorage.setItem('tmp_order',tmp_order);
                        window.location.assign(url);
                    })
                    break;
              case "stripe":
                this.modalToggle()
                break;
            
              case "razor":
                    swal("Gotcha!", "Pikachu was caught!", "success");
                    break;
              case "bambora":
                    swal("Gotcha!", "Pikachu was caught!", "success");
                    break;
              default:
                swal("Got away safely!");
            }
          });
    }

    modalToggle() {
        this.setState({
            modalshow: !this.state.modalshow
        })
    }

    payByStripe = async (e) => {
        const { stripeInput, formData } = this.state;
        let flag = 0;
        for (const key in stripeInput ) {
            if (stripeInput[key] == '') flag = 1;
            console.log(key, '=>', stripeInput[key]);
        }
        if (flag) {
            NotificationManager.warning('Input is invalid!');
            return;
        }
        let sendData = {...formData, ...stripeInput };
        axios.post(process.env.REACT_APP_BACKEND_API + 'user/stripeMethod',sendData).then(res=>{
            const { data } = res;
            if (data.status) {
                NotificationManager.success('Successfully Ordered!');
                this.props.emptyCart();
            }
            else {
                NotificationManager.error('Action Failure!');
            }
        })
    }

    cartFormat() {
        localStorage.removeItem(window.location.host);
        localStorage.removeItem('tmp_order');
    }
    render() {
        const {
            cartitem,
            ordertypelist,
            typename,
            formData, 
            modalshow,
            stripeInput
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
                                    <td data-title="Price"> <strong>{new Intl.NumberFormat().format((Number(item.price)).toFixed(2))}$</strong> </td>
                                    <td className="quantity" data-title="Quantity">
                                        <div className="qty">
                                            <span className="qty-subtract" onClick={() => this.DecreaseItem(item)}><i className="fa fa-minus" /></span>
                                            <input type="text" name="clicks" value={item.qty} readOnly/>
                                            <span className="qty-add" onClick={() => this.IncrementItem(item)}><i className="fa fa-plus" /></span>
                                        </div>
                                    </td>
                                    <td data-title="Total"> <strong>{new Intl.NumberFormat().format((Number(item.price) * item.qty).toFixed(2))}$</strong> </td>
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
                                        <option value="">Select order type</option>
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
                                        <td>{new Intl.NumberFormat().format((this.state.priceTotal).toFixed(2))}$</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="button" className="btn-custom primary btn-block" onClick={()=>this.placeOrder()}>Order</button>
                        </div>
                    </div>
                    {/* Cart form End */}
                </div>
                <Modal
                    show={modalshow}
                    onHide={this.modalToggle}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Stripe Payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <FormGroup>
                                    <Label for="cardnumber">Card Number</Label>
                                    <Input
                                        type="text"
                                        name="cardnumber"
                                        placeholder="Card Number"
                                        value={stripeInput.card_number}
                                        onChange={
                                            (e)=>this.setState({
                                                stripeInput: {
                                                    ...stripeInput,
                                                    card_number: e.target.value
                                                }
                                            })
                                        }
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <FormGroup>
                                    <Label for="cvc">CVC</Label>
                                    <Input
                                        type="text"
                                        name="cvc"
                                        placeholder="ex.311"
                                        value={stripeInput.cvc}
                                        onChange={
                                            (e)=>this.setState({
                                                stripeInput:{
                                                    ...stripeInput,
                                                    cvc: e.target.value
                                                }
                                            })
                                        }
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <FormGroup>
                                    <Label for="expire_mm">Expiration Month</Label>
                                    <Input
                                        type="text"
                                        name="expire_mm"
                                        placeholder="MM"
                                        value={stripeInput.expire_mm}
                                        onChange={
                                            (e)=>this.setState({
                                                stripeInput:{
                                                    ...stripeInput,
                                                    expire_mm: e.target.value
                                                }
                                            })
                                        }
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <FormGroup>
                                    <Label for="expire_yy">Expiration Year</Label>
                                    <Input
                                        type="text"
                                        name="expire_yy"
                                        placeholder="YYYY"
                                        value={stripeInput.expire_yy}
                                        onChange={
                                            (e)=>this.setState({
                                                stripeInput:{
                                                    ...stripeInput,
                                                    expire_yy: e.target.value
                                                }
                                            })
                                        }
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>this.modalToggle()} variant="secondary">Cancel</Button>
                        <Button variant="primary" onClick={()=>this.payByStripe()}>Submit</Button>
                    </Modal.Footer>
                </Modal>
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