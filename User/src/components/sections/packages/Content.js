import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Modal } from 'react-bootstrap';
import Quickview from '../../layouts/Quickview';
import products from "../../../data/product.json";
import productcategory from "../../../data/productcategory.json";
import { Rating } from "../../../helper/helper";
import Masonry from 'react-masonry-component';
import axios from 'axios';
import { getPackageList } from '../../../store/actions/package.action';
import { connect } from 'react-redux';
import { addCart } from '../../../store/actions/cart.actions';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'html-react-parser';
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
            lastActiveBox: -1,
            filteredProducts: products,
            activeItem: -1,
            package_list: []
        };
    }
    componentDidMount() {
        this.props.getPackageList();
        // axios.post(process.env.REACT_APP_BACKEND_API + 'user/getpackagelist',{}).then(res=>{
        //     const { data } = res;
        //     this.setState({
        //         package_list: data
        //     })
        // })
    }

    componentDidUpdate(preprops) {
        if (preprops.package_list != this.props.package_list) {
            this.setState({
                package_list: this.props.package_list
            })
        }
    }
    render() {
        console.log('Props->',this.props);

        const { package_list } = this.state;
        return (
            <Fragment>
                {/* Menu Wrapper Start */}
                <div className="section section-padding">
                    <div className="container">
                        {
                            package_list.map((item, i)=>{
                                return <div key={i} className="col-lg-4 col-md-6 masonry-item sides">
                                    <div className="product">
                                        <Link className="product-thumb" to="#">
                                            <img src={process.env.REACT_APP_BACKEND_HOST + "images/" + item.img_url} alt={item.name} />
                                        </Link>
                                        <div className="product-body">
                                            <div className="product-desc">
                                                <h4> <Link to="#">{item.package_name}</Link></h4>
                                                {ReactHtmlParser(item.details)}
                                            </div>
                                            <div className="product-controls">
                                                <p className="product-price">{new Intl.NumberFormat().format((Number(item.price)).toFixed(2))}$</p>
                                                <Link to='#' className="order-item btn-custom btn-sm shadow-none" onClick={() => this.props.addCart(item,'package')}>Add cart <i className="fas fa-shopping-cart" /> </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                        
                    {/* <form style={{overflow:'hidden'}}>
                        <div className="row">
                            <div className="form-group col-lg-6 offset-lg-3">
                                <input type="text" placeholder="Phone Number" className="form-control" name="phone-number" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-lg-6 offset-lg-3">
                                <input type="text" placeholder="Order ID" className="form-control" name="order-id" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-lg-6 offset-lg-3">
                            <button type="button" className="btn-custom primary" name="button" style={{float:'right'}}>Check</button>
                            </div>
                        </div>
                        
                    </form> */}
                    </div>
                </div>
                {/* Menu Wrapper End */}
            </Fragment>
        );
    }
}
const mapToStateProps = ({ drink }) => ({
    package_list: drink.package_list
})

const mapStateToDispatch = dispatch =>({
    getPackageList: () => dispatch(getPackageList()),
    addCart: (item, type) => dispatch(addCart(item, type)),

})
export default connect(mapToStateProps, mapStateToDispatch)(Content);