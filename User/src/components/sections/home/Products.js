import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Modal } from 'react-bootstrap';
import Quickview from '../../layouts/Quickview';
import Axios from 'axios';
import { connect } from 'react-redux';
import { addCart } from '../../../store/actions/cart.actions';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
            lastActiveBox: -1,
            item_list: []
        };
        this.modalShow = this.modalShow.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    componentDidMount() {
        const data = {
            subdomain: window.location.host
        }
        Axios.post(process.env.REACT_APP_BACKEND_API + 'user/getitemlist',data).then(res=>{
            const { data } = res;
            const { item_list } = this.state;
            data.map(item => {
                item_list.push(item);
            })
            this.setState({
                item_list: item_list
            })
        });
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    // Modal
    modalShow(index) {
        this.setState({ modalshow: true, lastActiveBox: index });
    }
    modalClose() {
        this.setState({ modalshow: false });
    }
    render() {
        const { item_list } = this.state;
        const settings = {
            slidesToShow: item_list.length > 3 ? 3: item_list.length,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        }
        return (
            <Fragment>
                <div className="container">
                    <div className="section-title-wrap section-header text-center">
                        <h2 className="title custom-primary">Popular Foods</h2>
                    </div>
                    <Slider className="product-slider" {...settings} ref={c => (this.slider = c)}>
                        {/* Product Start */}
                        {item_list.map((item, i) => (
                            <div key={i} className="product">
                                <Link className="product-thumb">
                                    <img src={process.env.REACT_APP_BACKEND_HOST + "images/" + item.img_url} alt={item.title} />
                                </Link>
                                <div className="product-body">
                                    <div className="product-desc">
                                        <h4> <Link to="#">{item.title}</Link> </h4>
                                        <p>{item.shortdesc}</p>
                                        <p className="product-price">{new Intl.NumberFormat().format((Number(item.price)).toFixed(2))}$</p>
                                        <div className="favorite">
                                            <i className="far fa-heart" />
                                        </div>
                                    </div>
                                    <div className="product-controls">
                                        <Link to='#' className="order-item btn-custom btn-sm shadow-none" onClick={() => this.props.addCart(item,'item')}>Add cart <i className="fas fa-shopping-cart" /> </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Product End */}
                    </Slider>
                    <div className="ct-arrows centered-arrows">
                        <i className="slider-prev fas fa-arrow-left slick-arrow" onClick={this.previous} />
                        <i className="slider-next fas fa-arrow-right slick-arrow" onClick={this.next} />
                    </div>
                </div>
               
                <Modal show={this.state.modalshow} id="customizeModal" onHide={this.modalClose} aria-labelledby="contained-modal-title-vcenter" size="lg" centered>
                    <Quickview productId={this.state.lastActiveBox}/>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    cart_list: state.content.cart_list
})
const mapStateToDispatch = dispatch => ({
    addCart: (item,type) => dispatch(addCart(item, type))
})
export default connect(mapStateToProps, mapStateToDispatch)(Products);