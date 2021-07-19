/**
 * Blank Page
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import PricingBlockV2 from 'Components/Pricing/PricingBlockV2';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import swal from 'sweetalert';
import { Input, FormGroup, Label } from 'reactstrap';
import { Modal, Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { updatePackage } from 'Actions/AuthActions';
import axios from 'axios';
import './custom.css';

class Subscription extends Component {
     state = {
        premiumPlan: 300,
        modalshow: false,
        packages: [],
        stripeInput: {
            card_number: '',
            cvc: '',
            expire_mm: '',
            expire_yy: ''
        },
        paymentsetting: [],
        livePrice: -1,
        selectedPkg: -1,
     }
     componentDidMount() {
        const Location = window.location;
        const params = (new URLSearchParams(Location.search));
        if (params.get('type') == 'paypal') {
            if (params.get('status') == 'success' && localStorage.getItem('tmp_subs')) {
                NotificationManager.success('Transfered Successfully!');
                const src = JSON.parse(localStorage.getItem('tmp_subs'));
                const sendOrder = {
                    package: src.pkg,
                    price: src.price,
                    txnid: params.get('PayerID'),
                    subdomain: window.location.host,
                }
                const headers = {
                    headers: {
                        'Accept':'application/json',
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
                axios.post(REACT_APP_BACKEND_API + 'paypalTrans', sendOrder,headers).then(res=>{
                    if (res.data.status == true) {
                        const str = localStorage.getItem('extime');
                        const data = JSON.parse(str);
                        const tmp_sub = localStorage.getItem('tmp_subs');
                        const sub = JSON.parse(tmp_sub);
                        data['g'] = sub['pkg'];
                        localStorage.setItem('extime',JSON.stringify(data));
                        localStorage.removeItem('tmp_subs');
                        this.props.history.push(Location.pathname);
                    }
                })
            }
            else {
                NotificationManager.error('Transfered Failured!');
                localStorage.removeItem('tmp_subs');
                this.props.history.push(Location.pathname);
            }
        }
        
        else if (params.get('type') == 'bambora') {
            if (params.get('status') == 'success' && localStorage.getItem('tmp_subs')) {
                NotificationManager.success('Transfered Successfully!');
                const src = JSON.parse(localStorage.getItem('tmp_subs'));
                const sendOrder = {
                    package: src.pkg,
                    price: src.price,
                    txnid: params.get('txnid'),
                    subdomain: window.location.host,
                }
                const headers = {
                    headers: {
                        'Accept':'application/json',
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
                axios.post(REACT_APP_BACKEND_API + 'bamboraTrans', sendOrder,headers).then(res=>{
                    if (res.data.status == true) {
                        const str = localStorage.getItem('extime');
                        const data = JSON.parse(str);
                        const tmp_sub = localStorage.getItem('tmp_subs');
                        const sub = JSON.parse(tmp_sub);
                        data['g'] = sub['pkg'];
                        localStorage.setItem('extime',JSON.stringify(data));
                        localStorage.removeItem('tmp_subs');
                        this.props.history.push(Location.pathname);
                    }
                })
                
            }
            else {
                NotificationManager.error('Transfered Failured!');
                localStorage.removeItem('tmp_subs');
                this.props.history.push(Location.pathname);
            }
        }

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
         }
        axios.get(REACT_APP_BACKEND_API + 'pkglist',{},{headers: headers}).then(res=>{
            this.setState({
                packages: res.data.data
            })
        })

        axios.post(REACT_APP_BACKEND_API + 'paymentsettings').then(res=>{
            const { data } = res;
            this.setState({
                paymentsetting: data
            })
        })
     }
    handleClickOpen = (arg = false) => {
    };

    modalToggle() {
        this.setState({
            modalshow: !this.state.modalshow
        })
    }

    paymentMethod(price ,pkg) {
        this.setState({
            livePrice: price,
            selectedPkg: pkg
        })
        const sendData = {
            price: price,
            domain_url: window.location.origin + window.location.pathname,
        };
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
                text: ' Razor ',
                value: "razor",
              },
              bambora: {
                text: 'Bambora',
                value: "bambora"
              },
              offline: {
                  text: 'Offline',
                  value: 'offline'
              }
            }
          })
          .then((value) => {
            switch (value) {
                case "paypal":
                    this.paypalMethod(sendData);
                    break;
                case "stripe":
                this.modalToggle()
                break;

                case "razor":
                    this.razorMethod();
                    break;
                case "bambora":
                    this.bamboraMethod();
                    // swal("Gotcha!", "Pikachu was caught!", "success");
                    break;
                case "offline":
                    this.offlineMethod();
                    break;
              default:
                swal("Canceled");
            }
          });
    }
    paypalMethod = (sendData) => {
        axios.post(
            REACT_APP_BACKEND_API + 'paypalMethod',
            sendData
        )
        .then(res=>{
            const { url } = res.data;
            const tmp_subs = JSON.stringify({
                price: this.state.livePrice,
                pkg: this.state.selectedPkg
            });
            localStorage.setItem('tmp_subs',tmp_subs);
            window.location.assign(url);
        })
    }

    stripeMethod = async (e) => {
        const { stripeInput } = this.state;
        let flag = 0;
        for (const key in stripeInput ) {
            if (stripeInput[key] == '') flag = 1;
            console.log(key, '=>', stripeInput[key]);
        }
        if (flag) {
            NotificationManager.warning('Input is invalid!');
            return;
        }
        stripeInput.price = this.state.livePrice;
        axios.post(REACT_APP_BACKEND_API + 'stripeMethod',stripeInput).then(res=>{
            const { data } = res;
            if (data.status) {
                NotificationManager.success('Successfully Ordered!');
            }

            else {
                NotificationManager.error('Action Failure!');
            }
        })
    }

    razorMethod() {
        const razorData = {
            price: this.state.livePrice
        }
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        axios.post(REACT_APP_BACKEND_API + 'razorMethod',razorData,{headers: headers}).then(res=>{
            const { options } = res.data;
            options.handler = (response) => {
                const sendData = {
                    razorpay_payment_id:response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    package: this.state.selectedPkg,
                    price : this.state.livePrice,
                    razorpay_order_id: options.order_id,
                }
                axios.post(REACT_APP_BACKEND_API + 'razorResult',sendData, {headers: headers}).then(res=>{
                    const { status } = res.data;
                    NotificationManager.success(status ? 'Success' : 'Failure');
                })
            }
            options.modal = {
                ondismiss: function() {
                  NotificationManager.error('Action Failure!')
                },
                escape: true,
                backdropclose: false
            };
            const RZP = new Razorpay(options);
            RZP.open();
        })
        .catch(err=>{
            NotificationManager.error('Actions Failure!')
        })
        
    }

    bamboraMethod() {
        const bamboraData = {
            price: this.state.livePrice,
            domain_url: window.location.hostname + window.location.pathname
        };

        axios.post(REACT_APP_BACKEND_API + 'bamboraMethod', bamboraData).then(res=>{
            const { data } = res;
            new Bambora.RedirectCheckout(data.token);
        })
    }

    offlineMethod = async() => {
        const sendData = {
            package: this.state.selectedPkg,
            price: this.state.livePrice,
            payment: 4,
            status: 0
        }
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

        axios.post(REACT_APP_BACKEND_API + 'offlineMethod', sendData, {headers:  headers}).then(res=>{
            const { data } = res;
            if (data.status) {
                NotificationManager.success('Successfully Requested!');
            }
            else {
                NotificationManager.error('Failure Requested!');
            }
        })
    }
    render() {
        const { packages, modalshow,stripeInput  } = this.state;
        const { user, activedpkg } = this.props;
        console.log(user);
        return (
            <div className="blank-wrapper">
                <Helmet>
                    <title>Subscription</title>
                    <meta name="description" content="Reactify Blank Page" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.subscription" />} match={this.props.match} />
                <div className="price-list m-10">
                <div className="row row-eq-height">
                `   {
                        packages.map((item, index)=>{
                            return <PricingBlockV2
                                planType="premium"
                                type={`${item.package_name}`}
                                color={item.id == activedpkg  ? 'success' : 'primary'}
                                description="Secure file sharing and collaboration. Ideal for small teams."
                                price={item.price}
                                users={1}
                                activePkg = {()=>{ item.id != activedpkg ? this.paymentMethod(item.price, item.id) : NotificationManager.info('You have already chosen this package!')}}
                                features={[
                                    'Velkommen side',
                                    `Meny (${item.order_limit < 0 ? 'Unlimited' : item.order_limit} items)`,
                                    'Pakker',
                                    'Spesialiteter',
                                    'QR kode',
                                    'Whatsapp bestilling',
                                    `Online bestilling (${item.order_limit < 0 ? 'Unlimited' : item.order_limit + 'items'})`,
                                    'Reservasjon',
                                    'Kontakter',
                                    'Digital betaling'
                                ]}
                                id={item.id}
                                deletePackage = {() => this.deletePackage(item.id) }
                                ability={item.package_ability}
                                status={item.id == activedpkg  ? true : false}
                                key={index}
                            />
                        })
                    }
                </div>
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
                    <Button variant="primary" onClick={()=>this.stripeMethod()}>Submit</Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
 }
 const mapStateToProps = ({ authUser }) => {
    const { user, activedpkg } = authUser;
    return { user, activedpkg };
 };
 const mapStateDispatch = dispatch => ({
    updatePackage: () => dispatch(updatePackage())
 })
 export default connect(
    mapStateToProps,
 
 )(Subscription);