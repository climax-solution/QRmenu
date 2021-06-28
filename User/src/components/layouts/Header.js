import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import HeaderComponent from '../../helper/Navigationhelper';
import Cartlist from '../layouts/Cartlist';
import Search from '../layouts/Search';
import Mobilemenu from '../layouts/Mobilemenu';
import Menu from './Menu';
import classNames from 'classnames';
import cartitem from '../../data/cartlist.json';

class Header extends HeaderComponent {
    render() {
        return (
            <Fragment>
                {/* Cart Sidebar Start */}
                <div className="cart-sidebar-wrapper">
                    <aside className={classNames("cart-sidebar", { "cart-open": this.state.cartmethod })}>
                        <div className="cart-sidebar-header">
                            <h3>Your Cart</h3>
                            <div className="close-btn cart-trigger close-dark" onClick={this.cartToggle}>
                                <span />
                                <span />
                            </div>
                        </div>
                        <Cartlist />
                    </aside>
                    <div className="cart-sidebar-overlay cart-trigger" onClick={this.cartToggle} />
                </div>
                {/* Cart Sidebar End */}
                {/* Search Form Start*/}
                <div className={classNames("search-form-wrapper", { "open": this.state.searchmethod })}>
                    <div className="search-trigger close-btn" onClick={this.searchToggle}>
                        <span />
                        <span />
                    </div>
                    <Search />
                </div>
                {/* Search Form End*/}
                {/* Aside (Mobile Navigation) */}
                <aside className={classNames("main-aside", { "open": this.state.navmethod })}>
                    <Mobilemenu />
                </aside>
                <div className="aside-overlay aside-trigger" onClick={this.toggleNav} />
                {/* Header Start */}
                <header className="main-header header-1 header-absolute">
                    <div className="top-header">
                        <div className="container">
                            <div className="top-header-inner">
                                <div className="top-header-contacts">
                                    <ul className="top-header-nav">
                                        <li> <Link className="p-0" to="/tel:+123456789"><i className="fas fa-phone mr-2" /> +123 456 789</Link> </li>
                                    </ul>
                                </div>
                                <ul className="top-header-nav header-cta">
                                    <li> <Link to="/menu-v1">Order Online</Link> </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <nav className="navbar">
                            {/* Logo */}
                            <Link className="navbar-brand" to="/">
                                <img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="logo" />
                            </Link>
                            {/* Menu */}
                            <Menu />
                            <div className="header-controls">
                                <ul className="header-controls-inner">
                                    <li className="cart-dropdown-wrapper cart-trigger" onClick={this.cartToggle}>
                                        <span className="cart-item-count">{cartitem.length}</span>
                                        <i className="flaticon-shopping-bag" />
                                    </li>
                                    <li className="search-dropdown-wrapper search-trigger" onClick={this.searchToggle}>
                                        <i className="flaticon-search" />
                                    </li>
                                </ul>
                                {/* Toggler */}
                                <div className="aside-toggler aside-trigger" onClick={this.toggleNav}>
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            </div>
                        </nav>
                    </div>
                </header>
                {/* Header End */}
            </Fragment>
        );
    }
}

export default Header;