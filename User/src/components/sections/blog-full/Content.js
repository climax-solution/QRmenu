import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import blogpost from '../../../data/blog.json';
import Masonry from 'react-masonry-component';

class Content extends Component {
    render() {

        const imagesLoadedOptions = {
            itemSelector: '.masonry-item',
            percentPosition: true,
            resize: true,
            fitWidth: true
        };
        return (
            <div className="section section-padding pagination-content">
                <div className="blog-fw">
                    <Masonry className="row masonry" imagesLoadedOptions={imagesLoadedOptions}>
                        {/* Post Start */}
                        {blogpost.map((item, i) => (
                            <div key={i} className={"masonry-item " + item.fullview}>
                                <article className="post">
                                    <h3 className="post-title">
                                        <Link to={"/blog-single/" + item.id}>{item.title}</Link>
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
                    </Masonry>
                </div>
            </div>
        );
    }
}

export default Content;