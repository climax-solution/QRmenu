import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';
import { getSpecialities } from '../../../store/actions/content.actions';
import { addCart } from '../../../store/actions/cart.actions';
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
            lastActiveBox: -1,
            filteredProducts: [],
            activeItem: -1
        };
    }

    componentDidMount() {
        this.props.getSpecialities();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.specialities !== this.props.specialities) {
            this.setState({
                filteredProducts: this.props.specialities
            })
        }
    }
    render() {
        const imagesLoadedOptions = {
            itemSelector: '.masonry-item',
            percentPosition: true,
            resize: true,
            fitWidth: true
        };
        return (
            <Fragment>
                {/* Menu Wrapper Start */}
                <div className="section section-padding">
                    <div className="container">
                    <Masonry className="menu-container row menu-v2" imagesLoadedOptions={imagesLoadedOptions}>

                    { this.state.filteredProducts.map((item, i) => (
                        <div key={i} className="col-lg-4 col-md-6 masonry-item sides">
                            <div className="product">
                                <Link className="product-thumb" to="#" onClick={()=>this.props.addCart(item)}>
                                    <img src={process.env.REACT_APP_BACKEND_HOST + "images/" + item.img_url} alt={item.special_name} />
                                </Link>
                                <div className="product-body">
                                    <div className="product-desc">
                                        <h4> <Link to="#" onClick={()=>this.props.addCart(item)}>{item.special_name}</Link></h4>
                                        <p>{item.short_about}</p>
                                    </div>
                                    <div className="product-controls">
                                        <p className="product-price">{new Intl.NumberFormat().format((Number(item.price)).toFixed(2))}Kr</p>
                                        <Link to="#" onClick={()=>this.props.addCart(item, 'special')} className="order-item btn-custom btn-sm shadow-none">Add Cart <i className="fas fa-shopping-cart" /> </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) }
                    </Masonry>
                    </div>
                </div>
                {/* Menu Wrapper End */}
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    specialities: state.content.specialities
})

const mapStateToDispatch = dispatch => ({
    getSpecialities: () => dispatch(getSpecialities()),
    addCart: (item, type) => dispatch(addCart(item, type)),
})

export default connect(mapStateToProps, mapStateToDispatch)(Content);