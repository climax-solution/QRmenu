import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { hometwo as bannerpost } from '../../../data/banner.json'

class Banner extends Component {
    render() {
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            responsive: [{
                breakpoint: 768,
                settings: {
                    dots: false,
                }
            }]
        }
        return (
            <div className="banner banner-2">
                <Slider className="banner-slider-2" {...settings}>
                    {bannerpost.map((item, i) => (
                        <div key={i} className="banner-item d-flex">
                            <div className="banner-bg bg-cover" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + item.bg + ")" }} />
                            <div className="banner-inner">
                                <div className="banner-text">
                                    <h1 className="title">{item.title}</h1>
                                    <h4>{item.subtitle}</h4>
                                    <p className="subtitle">{item.desc}</p>
                                </div>
                                <Link to="/menu-v1" className="btn-custom primary">View Menu</Link>
                            </div>
                            <img src={process.env.PUBLIC_URL + "/" + item.img} alt={item.title} />
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }
}

export default Banner;