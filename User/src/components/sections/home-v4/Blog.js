import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import blogpost from '../../../data/blog.json'

class Blog extends Component {
    render() {
        return (
            <div className="section section-padding pt-0">
                <div className="container">
                    <div className="section-title-wrap section-header text-center">
                        <h5 className="custom-primary">Latest News</h5>
                        <h2 className="title">From Our Blog</h2>
                        <p className="subtitle">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                        </p>
                    </div>
                    <div className="row">
                        {/* Post Start */}
                        {blogpost.slice(0, 3).map((item, i) => (
                            <div key={i} className="col-lg-4">
                                <article className="post">
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
                            </div>
                        ))}
                        {/* Post End */}
                    </div>
                </div>
            </div>

        );
    }
}

export default Blog;