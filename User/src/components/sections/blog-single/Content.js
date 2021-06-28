import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getBlog } from '../../../helper/Bloghelper';
import Sidebar from '../../layouts/Blogsidebar';
import blogtags from '../../../data/blogtags.json';
import $ from 'jquery';
import 'magnific-popup';
import Relatedblog from '../../layouts/Relatedblog';

class Content extends Component {
    componentDidMount() {
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
        const blogId = this.props.blogId;
        const item = getBlog(blogId);
        return (
            <div className="post-single">
                <div className="post-subheader dark-overlay dark-overlay-2" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + item.image + ")" }}>
                    <div className="container">
                        <h1>{item.title}</h1>
                        <div className="post-meta">
                            <span> <i className="far fa-calendar" /> <Link to="#">{item.postdate}</Link> </span>
                            <span> <i className="far fa-user" /> Posted by <Link to="#">{item.author.name}</Link> </span>
                            <span> <i className="fas fa-hashtag" />
                                {item.tags.slice(0, 2).map((tag) => (
                                    blogtags.filter(item => {
                                        return item.id === tag
                                    }).map((tags, i) => (
                                        <Link key={i} to={"/blog/tag/" + tags.id}>{tags.title}, </Link>
                                    ))
                                ))}
                            </span>
                        </div>
                    </div>
                </div>
                {/* Content & Sidebar Start */}
                <div className="section">
                    <div className="container">
                        <div className="row">
                            {/* Content Start */}
                            <div className="col-lg-8">
                                <div className="post-content-wrapper">
                                    <div className="post-content" dangerouslySetInnerHTML={{ __html: item.longdescription }} />
                                    {/* About Author Start */}
                                    <div className="section">
                                        <div className="about-author">
                                            <div className="about-author-inner">
                                                <img src={process.env.PUBLIC_URL + "/" + item.author.img} alt={item.author.name} />
                                                <div className="about-author-content">
                                                    <h5> <Link to="#" title={item.author.name}>{item.author.name}</Link> </h5>
                                                    <p>{item.author.aboutauthor}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* About Author End */}
                                    {/* Comment List Start */}
                                    <div className="section pt-0">
                                        <h4>{item.reviews.length} Comments</h4>
                                        <div className="comments-list">
                                            <ul>
                                                {item.reviews.map((review, i) => (
                                                    <li key={i} className="comment-item">
                                                        <img src={process.env.PUBLIC_URL + "/" + review.img} alt={review.name} />
                                                        <div className="comment-body">
                                                            <h5>{review.name}</h5>
                                                            <span>Posted on: {review.date}</span>
                                                            <p>{review.comment}College in Virginia</p>
                                                            <Link to="#" className="reply-link"> Reply </Link>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    {/* Comment List End */}
                                    {/* Comment Form Start */}
                                    <div className="comment-form section pt-0">
                                        <h4>Leave a Comment</h4>
                                        <p>Your email address will not be published. Required fields are marked *</p>
                                        <form method="post">
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <input type="text" className="form-control" placeholder="Full Name*" name="fname" />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <input type="email" className="form-control" placeholder="Email Address*" name="email" />
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <textarea className="form-control" placeholder="Type your comment..." name="comment" rows={7} />
                                                </div>
                                            </div>
                                            <button type="submit" className="btn-custom primary shadow-none" name="button">Post comment</button>
                                        </form>
                                    </div>
                                    {/* Comment Form End */}
                                    {/* Related Posts Start */}
                                    <Relatedblog/>
                                    {/* Related Posts End */}
                                </div>
                            </div>
                            {/* Content End */}
                            {/* Sidebar Start */}
                            <div className="col-lg-4">
                                <Sidebar />
                            </div>
                            {/* Sidebar End */}
                        </div>
                    </div>
                </div>
                {/* Content & Sidebar End */}
            </div>
        );
    }
}

export default Content;