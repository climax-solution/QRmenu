import React, { Component, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Modal } from 'react-bootstrap';
import Quickview from '../../layouts/Quickview';
// import products from "../../../data/product.json";
import productcategory from "../../../data/productcategory.json";
import { Rating } from "../../../helper/helper";
import Masonry from 'react-masonry-component';
import { connect, useDispatch } from 'react-redux';
import { getCategories, getItems } from '../../../store/actions/content.actions';
import { addCart } from '../../../store/actions/cart.actions';
import { GET_ITEMS } from '../../../store/actions/types';
import axios from 'axios';
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
            lastActiveBox: -1,
            filteredProducts: this.props.items,
            allItems: this.props.items,
            categoryList: [],
            ordertypelist: [],
            activeItem: -1
        };
        this.modalShow = this.modalShow.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }
    // Modal
    modalShow(index) {
        this.setState({ modalshow: true, lastActiveBox: index });
    }
    modalClose() {
        this.setState({ modalshow: false });
    }
    componentDidMount() {    
        this.props.getItems();
        this.props.getCategories();
        const sendData = {
            subdomain: window.location.host
        }
        axios.post(process.env.REACT_APP_BACKEND_URL + 'users/getordertypelist',sendData).then(res=>{
            let { ordertypelist } = this.state;
            const { data } = res;
            this.setState({
                ordertypelist: data
            })
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.items !== this.props.items) {
            this.setState({
                filteredProducts: this.props.items,
                allItems: this.props.items
            });
        }
    }

    handleClick = id => {
        let filteredProducts = [];
        const { allItems } = this.state;
        if (id === -1) {
            filteredProducts = allItems;
        } else {
            filteredProducts = allItems.filter(
                (product) => product.category.includes(id)
            );
        }
        this.setState({ filteredProducts, activeItem: id });
    };
    render() {
        const { categories: categoryList } = this.props;
        const settings = {
            slidesToShow: categoryList.length,
            slidesToScroll: 3,
            arrows: false,
            dots: false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 6
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 2,
                    }
                },
            ]
        };
        const imagesLoadedOptions = {
            itemSelector: '.masonry-item',
            percentPosition: true,
            resize: true,
            fitWidth: true
        };
        console.log('LOG',this.props, this.state.filteredProducts)
        const renderAll = this.state.filteredProducts.map((item, i) => (
            <div key={i} className="col-lg-4 col-md-6 masonry-item sides">
                <div className="product">
                    <div className="favorite">
                        <i className="far fa-heart" />
                    </div>
                    <Link className="product-thumb" to="#">
                        <img src={process.env.REACT_APP_BACKEND_HOST + "images/" + item.img_url} alt={item.name} />
                    </Link>
                    <div className="product-body">
                        <div className="product-desc">
                            <h4> <Link to="#">{item.title}</Link></h4>
                            <p>{item.shortdesc}</p>
                            {/* <Link to="#" className="btn-custom light btn-sm shadow-none" onClick={(e) => this.modalShow(item.id)}> Preview <i className="fas fa-eye" /> </Link> */}
                        </div>
                        <div className="product-controls">
                            <p className="product-price">{new Intl.NumberFormat().format((Number(item.price)).toFixed(2))}$</p>
                            <Link to='#' className="order-item btn-custom btn-sm shadow-none" onClick={() => this.props.addCart(item)}>Add cart <i className="fas fa-shopping-cart" /> </Link>
                        </div>
                    </div>
                </div>
            </div>
        ));
        return (
            <Fragment>
                {/* Menu Categories Start */} 
                <div className="ct-menu-categories menu-filter">
                    <div className="container">
                        <Slider className="menu-category-slider" {...settings}>
                            <Link to="#" data-filter="*" className={this.state.activeItem === -1 ? 'ct-menu-category-item active' : 'ct-menu-category-item'} onClick={this.handleClick.bind(this, -1)}>
                                <div className="menu-category-thumb">
                                    <img src={process.env.PUBLIC_URL + "/assets/img/categories/6.jpg"} alt="All" />
                                </div>
                                <div className="menu-category-desc">
                                    <h6>All</h6>
                                </div>
                            </Link>
                            {categoryList.map((item, i) => (
                                <Link key={item.id} to="#" className={this.state.activeItem === parseInt(item.id) ? 'ct-menu-category-item active' : 'ct-menu-category-item'} onClick={this.handleClick.bind(this, item.id)}>
                                    <div className="menu-category-thumb">
                                        <img src={process.env.PUBLIC_URL + "/assets/img/categories/6.jpg"} alt={item.category_name} />
                                    </div>
                                    <div className="menu-category-desc">
                                        <h6>{item.category_name}</h6>
                                    </div>
                                </Link>
                            ))}
                        </Slider>
                    </div>
                </div>
                {/* Menu Categories End */}
                {/* Menu Wrapper Start */}
                <div className="section section-padding">
                    <div className="container">
                        <Masonry className="menu-container row menu-v2" imagesLoadedOptions={imagesLoadedOptions}>
                            {/* Product Start */}
                            {renderAll}
                            {/* Product End */}
                        </Masonry>
                    </div>
                </div>
                <Modal show={this.state.modalshow} id="customizeModal" onHide={this.modalClose} aria-labelledby="contained-modal-title-vcenter" size="lg" centered>
                    <Quickview productId={this.state.lastActiveBox} />
                </Modal>
                {/* Menu Wrapper End */}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    items: state.content.items,
    categories: state.content.categories
})

const mapStateToDispatch = dispatch => ({
    getItems: () => dispatch(getItems()),
    addCart: (item) => dispatch(addCart(item)),
    getCategories: () => dispatch(getCategories()),
})

export default connect(mapStateToProps, mapStateToDispatch)(Content);
