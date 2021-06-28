import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import $ from 'jquery';
import 'magnific-popup';


const gallery = [
    {
        img: "assets/img/blog/2.jpg"
    },
    {
        img: "assets/img/blog/3.jpg"
    },
    {
        img: "assets/img/blog/4.jpg"
    },
    {
        img: "assets/img/blog/5.jpg"
    },
    {
        img: "assets/img/blog/6.jpg"
    },
    {
        img: "assets/img/blog/8.jpg"
    }
];


class Ordercta extends Component {
    componentDidMount(){
        function popup() {
            $('.gallery-thumb').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                },
            });
        }
        popup()
    }
    render() {
        const settings = {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2000,
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
                }
            }
            ]
        };
        
        return (
            <div className="section">
                <div className="container">
                    <div className="section text-center cta-2 cta bg-cover bg-center dark-overlay dark-overlay-2 bg-parallax" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/bg/cta-2.jpg)" }}>
                        <div className="section-title-wrap section-header text-center">
                            <h5 className="custom-primary">Get Crafty</h5>
                            <h2 className="title text-white">Build Your Own Pizza Today</h2>
                            <p className="subtitle text-white">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                            </p>
                        </div>
                        <Link to="/menu-item-v2/1" className="btn-custom shadow-none">Build Your Pizza</Link>
                    </div>
                    <div className="container">
                        <Slider className="gallery-slider row" {...settings}>
                            {gallery.map((item, i) => (
                                <Link to={item.img} key={i} className="gallery-thumb">
                                    <img src={process.env.PUBLIC_URL + "/" + item.img} alt="post" />
                                </Link>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ordercta;