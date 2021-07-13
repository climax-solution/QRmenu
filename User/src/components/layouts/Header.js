import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import HeaderComponent from '../../helper/Navigationhelper';
import Cartlist from '../layouts/Cartlist';
import Search from '../layouts/Search';
import Mobilemenu from '../layouts/Mobilemenu';
import Menu from './Menu';
import classNames from 'classnames';
import { connect } from 'react-redux';


class Header extends HeaderComponent {
    render() {
        let cart_list = this.props.cart_list;
        cart_list = JSON.parse(cart_list);
        let cart_count = 0;
        if (cart_list && cart_list[window.location.host]) {
            cart_list[window.location.host].map(item => {
                cart_count += Number(item.qty);
            })
        }
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
                    <div className="container">
                        <nav className="navbar">
                            {/* Logo */}
                            <Link className="navbar-brand" to="/">
                                <img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="logo" />
                            </Link>
                            {/* Menu */}
                            <Menu />
                            {
                                cart_count > 0 && <div className="header-controls">
                                <ul className="header-controls-inner">
                                    <li className="cart-dropdown-wrapper cart-trigger" onClick={this.cartToggle}>
                                        <span className="cart-item-count">{cart_count}</span>
                                        <i className="flaticon-shopping-bag" />
                                    </li>
                                </ul></div>
                            }
                                {/* Toggler */}
                                <div className="aside-toggler aside-trigger" onClick={this.toggleNav}>
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            
                        </nav>
                    </div>
                </header>
                {/* Header End */}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    cart_list: state.content.cart_list
})
export default connect(mapStateToProps, null)(Header);