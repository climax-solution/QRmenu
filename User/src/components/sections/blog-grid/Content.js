import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import blogpost from '../../../data/blog.json';
import Sidebar from '../../layouts/Blogsidebar';
import { getFilteredPosts } from '../../../helper/Bloghelper';
import Loader from '../../layouts/Loader';
import classNames from 'classnames';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.getPosts(),
            currentPage: 1,
            itemsPerPage: 4,
            loading: false
        }; 
        this.handleClick = this.handleClick.bind(this);
    }

    getPosts() {
        var tag = this.props.tagId ? this.props.tagId : '';
        var filteredItems = getFilteredPosts(blogpost, tag);
        //this.setState( { items: filteredItems } );
        return filteredItems
    }
    handleClick(event) {
        var paginationContent = event.target.closest('.pagination-content');

        if (paginationContent) {
            paginationContent.scrollIntoView();
        }

        this.setState({
            loading: true
        });
        setTimeout(() => {
            this.setState({
                currentPage: Number(event.target.getAttribute('data-page')),
                loading: false
            });
        }, 2000);

    }
    render() {
        const { items, currentPage, itemsPerPage } = this.state;

        // Logic for displaying items
        const indexOfLastitem = currentPage * itemsPerPage;
        const indexOfFirstitem = indexOfLastitem - itemsPerPage;
        const currentitems = items.slice(indexOfFirstitem, indexOfLastitem);

        const renderitems = currentitems.map((item, i) => {
            return <div key={i} className="col-lg-6">
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
        });
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPagination = pageNumbers.map(number => {
            const activeCondition = this.state.currentPage === number ? 'active' : ''
            return (
                <Fragment key={number}>
                    {pageNumbers.length > 1 ? <li className={classNames("page-item", { "active": activeCondition })}>
                        <Link className="page-link" to="#" data-page={number} onClick={this.handleClick}>{number}</Link>
                    </li> : ''}
                </Fragment>
            );
        });
        return (
            <div className="section section-padding pagination-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                {/* Post Start */}
                                {this.state.loading === false ? renderitems : <Loader />}
                                {/* Post End */}
                            </div>
                            {/* Pagination Start */}
                            {pageNumbers.length > 1 ?
                                <ul className="pagination mb-0">
                                    {/* Prev */}
                                    {/* to show previous, we need to be on the 2nd or more page */}
                                    {pageNumbers.length > 1 && this.state.currentPage !== 1 ?
                                        <li className="page-item">
                                            <Link className="page-link" to="#" data-page={this.state.currentPage - 1} onClick={this.handleClick}>
                                                <span aria-hidden="true">«</span>
                                                <span className="sr-only">Previous</span>
                                            </Link>
                                        </li>
                                        : ''}
                                    {/* Prev */}
                                    {renderPagination}
                                    {/* Next */}
                                    {/* to show next, we should not be on the last page */}
                                    {pageNumbers.length > 1 && this.state.currentPage !== pageNumbers.length ? <li className="page-item">
                                        <Link className="page-link" to="#" data-page={parseInt(this.state.currentPage + 1)} onClick={this.handleClick}>
                                            <span aria-hidden="true">»</span>
                                            <span className="sr-only">Next</span>
                                        </Link>
                                    </li>
                                        : ''}
                                    {/* Next */}
                                </ul> : ''}
                            {/* Pagination End */}
                        </div>
                        {/* Sidebar Start */}
                        <div className="col-lg-4">
                            <Sidebar />
                        </div>
                        {/* Sidebar End */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;