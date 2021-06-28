import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import blogpost from '../../data/blog.json';
import Slider from 'react-slick';

class Relatedblog extends Component {
    render() {
        const settings = {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            responsive: [{
                breakpoint: 575,
                settings: {
                    slidesToShow: 1
                }
            }]
        }
        return (
            <div className="section p-0">
                <h4>Related Posts</h4>
                <Slider className="related" {...settings}>
                    {/* Post Start */}
                    {blogpost.map((item, i) => (
                        <article key={i} className="post">
                            <h3 className="post-title">
                                <Link to={"/blog-single/" + item.id}>{item.title.slice(0, 30)}...</Link>
                            </h3>
                            <div className="post-meta">
                                <span> <i className="far fa-calendar" /> <Link to={"/blog-single/" + item.id}>{item.postdate}</Link> </span>
                                <span> <i className="far fa-user" /> <Link to={"/blog-single/" + item.id}>{item.author.name}</Link> </span>
                            </div>
                            <div className="post-thumbnail">
                                <Link to={"/blog-single/" + item.id}>
                                    <img src={process.env.PUBLIC_URL + "/" + item.image} alt={item.title} />
                                </Link>
                            </div>
                            <div className="post-desc">
                                <p>{item.shortdesc}</p>
                            </div>
                            <Link to={"/blog-single/" + item.id} className="read-more">Read More</Link>
                        </article>
                    ))}
                    {/* Post End */}
                </Slider>
            </div>
        );
    }
}

export default Relatedblog;