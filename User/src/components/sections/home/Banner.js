import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { home as bannerpost } from '../../../data/banner.json'
import { connect, useDispatch } from 'react-redux';
import { getCategories, getItems, getSpecialities } from '../../../store/actions/content.actions';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null,
            special_list: [],
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.slider2.slickNext();
    }
    previous() {
        this.slider2.slickPrev();
    }
    componentDidMount() {
        this.props.getSpecialities();
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.specialities !== this.props.specialities) {
            this.setState({
                special_list: this.props.specialities
            })
        }
    }
    render() {
        const { special_list } = this.state;
        console.log(this.props)
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                }
            }]
        }
        const settingsthumb = {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            focusOnSelect: true,
            responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    autoplay: true
                }
            }
            ]
        }
        return (
            <div className="banner banner-1 bg-cover">
                <div className="imgs-wrapper">
                    <img src={process.env.PUBLIC_URL + "/assets/img/veg/11.png"} alt="veg" className="d-none d-lg-block" />
                </div>
                <Slider className="banner-slider" {...settings} asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)}>
                    {special_list.map((item, i) => (
                        <div key={i} className="banner-item">
                            <div className="banner-inner">
                                <div className="container">
                                    <div className="row align-items-center">
                                        <div className="col-xl-6 col-lg-6">
                                            <h1 className="title text-center">{item.special_name}</h1>
                                            <p className="subtitle">{item.short_about}</p>
                                            <div className="banner-controls">
                                                <Link to="/menu-v1" className="btn-custom primary">Order <i className="flaticon-shopping-bag" /> </Link>
                                                <h4>${new Intl.NumberFormat().format((Number(item.price)).toFixed(2))}</h4>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6">
                                            <img src={process.env.REACT_APP_BACKEND_HOST + "images/" + item.img_url} alt={item.title} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="banner-slider-nav">
                    <div className="container">
                        {/* Arrow */}
                        <i className="slider-prev fas fa-arrow-left slick-arrow" onClick={this.previous} />
                        <Slider className="banner-slider-nav-inner" {...settingsthumb} asNavFor={this.state.nav1} ref={slider => (this.slider2 = slider)}>
                            {special_list.map((item, i) => (
                                <div key={i} className="banner-nav-item">
                                    <div className="banner-nav-item-inner">
                                        {item.offer === true ? <div className="sale"> <div className="sale-inner"> Offer </div> </div> : ""}
                                        <img src={process.env.REACT_APP_BACKEND_HOST + "images/" + item.img_url} alt={item.special_name} />
                                        <div className="banner-nav-item-body">
                                            <h5>{item.category}</h5>
                                            <span>{new Intl.NumberFormat().format((Number(item.price)).toFixed(2))}$</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        {/* Arrow */}
                        <i className="slider-next fas fa-arrow-right slick-arrow" onClick={this.next} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    items: state.content.items,
    categories: state.content.categories,
    specialities: state.content.specialities
})

const mapStateToDispatch = dispatch => ({
    getItems: () => dispatch(getItems()),
    getCategories: () => dispatch(getCategories()),
    getSpecialities: () => dispatch(getSpecialities()),
})

export default connect(mapStateToProps, mapStateToDispatch)(Banner);
