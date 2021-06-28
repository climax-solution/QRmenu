import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import blogpost from '../../data/blog.json';
import tags from '../../data/blogtags.json';

class Blogsidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-widget">
                    <form method="post">
                        <h5>Search Posts</h5>
                        <input type="text" className="form-control" placeholder="Search" name="sidebar-search" />
                    </form>
                </div>
                <div className="sidebar-widget">
                    <h5>Recent Posts</h5>
                    {blogpost.slice(0, 3).map((item, i) => (
                        <article key={i} className="media">
                            <Link to={"/blog-single/" + item.id}>
                                <img src={process.env.PUBLIC_URL + "/" + item.image} alt={item.title} />
                            </Link>
                            <div className="media-body">
                                <h6> <Link to={"/blog-single/" + item.id}>{item.title}</Link> </h6>
                                <span>{item.postdate}</span>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="sidebar-widget tags">
                    <h5>Popular Tags</h5>
                    {tags.map((tag, i) => (
                        <Link key={i} to={"/blog/tag/" + tag.id}>{tag.title}</Link>
                    ))}
                </div>
            </div>
        );
    }
}

export default Blogsidebar;