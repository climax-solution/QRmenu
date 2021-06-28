import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import navigationmenu from '../../data/navigation.json';

class Menu extends Component {
    render() {
        return (
            <ul className="navbar-nav">
                {navigationmenu.length > 0 ? navigationmenu.slice(0, 3).map((item, i) => (
                    <li key={i} className={`menu-item ${item.child ? 'menu-item-has-children' : ''} `} onClick={this.triggerChild}>
                        {item.child ? <Link onClick={e => e.preventDefault()} to="/"> {item.linkText} </Link> : <Link to={item.link}> {item.linkText} </Link>}
                        {item.child ?
                            <ul className="submenu" role="menu">
                                {item.submenu.map((sub_item, i) => (
                                    <li key={i} className={`menu-item ${sub_item.child ? 'menu-item-has-children' : ''} `}>
                                        {sub_item.child ? <Link onClick={e => e.preventDefault()} to="/"> {sub_item.linkText} </Link> : <Link to={sub_item.link}> {sub_item.linkText} </Link>}
                                        {sub_item.submenu ?
                                            <ul className="submenu">
                                                {sub_item.submenu.map((third_item, i) => (
                                                    <li className="menu-item" key={i}><Link
                                                        to={third_item.link}>{third_item.linkText}</Link>
                                                    </li>
                                                ))}
                                            </ul> : null}
                                    </li>
                                ))}
                            </ul>
                            : null
                        }
                    </li>
                )) : null}
                <li className="menu-item menu-item-has-children mega-menu-wrapper">
                    <Link to="#">Menu</Link>
                    <ul className="submenu">
                        <li>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="mega-menu-item">
                                            <h5>Building a Pizza</h5>
                                            <p>
                                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,
                                                making it over 2000 years old.
                      </p>
                                            <Link to="/menu-item-v2" className="btn-custom secondary shadow-none btn-sm">Build your Pizza</Link>
                                        </div>
                                    </div>
                                    <div className="offset-lg-1 col-lg-3">
                                        <div className="mega-menu-item">
                                            <h5>Menu Pages</h5>
                                            <Link to="/menu-v1">Menu v1</Link>
                                            <Link to="/menu-v2">Menu v2</Link>
                                            <Link to="#" className="coming-soon">Menu v3 <span>Coming Soon</span> </Link>
                                            <Link to="#" className="coming-soon">Menu v4 <span>Coming Soon</span> </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="mega-menu-item">
                                            <h5>Menu Item Pages</h5>
                                            <Link to="/menu-item-v1/1">Menu Item v1</Link>
                                            <Link to="/menu-item-v2/1">Menu Item v2</Link>
                                            <Link to="#" className="coming-soon">Menu Item v3 <span>Coming Soon</span></Link>
                                        </div>
                                    </div>
                                    <div className="col-12 mega-menu-promotion-wrapper">
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="mega-menu-promotion">
                                                    <Link to="/menu-item-v1/1"><img src={process.env.PUBLIC_URL + "/assets/img/prods-sm/1.png"} alt="pizza" /></Link>
                                                    <div className="mega-menu-promotion-text">
                                                        <h4><Link to="/menu-item-v1/1">Pepperoni</Link></h4>
                                                        <span>$12.99</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="mega-menu-promotion">
                                                    <Link to="/menu-item-v1/1"><img src={process.env.PUBLIC_URL + "/assets/img/prods-sm/2.png"} alt="pizza" /></Link>
                                                    <div className="mega-menu-promotion-text">
                                                        <h4><Link to="/menu-item-v1/1">Vegetarian</Link></h4>
                                                        <span>$9.99</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="mega-menu-promotion">
                                                    <Link to="/menu-item-v1/1"><img src={process.env.PUBLIC_URL + "/assets/img/prods-sm/3.png"} alt="pizza" /></Link>
                                                    <div className="mega-menu-promotion-text">
                                                        <h4><Link to="/menu-item-v1/1">Ham &amp; Cheese</Link></h4>
                                                        <span>$13.99</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="mega-menu-promotion">
                                                    <Link to="/menu-item-v1/1"><img src={process.env.PUBLIC_URL + "/assets/img/prods-sm/4.png"} alt="pizza" /></Link>
                                                    <div className="mega-menu-promotion-text">
                                                        <h4><Link to="/menu-item-v1/1">Specialty</Link></h4>
                                                        <span>$13.99</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                {navigationmenu.length > 0 ? navigationmenu.slice(4, 10).map((item, i) => (
                    <li key={i} className={`menu-item ${item.child ? 'menu-item-has-children' : ''} `} onClick={this.triggerChild}>
                        {item.child ? <Link onClick={e => e.preventDefault()} to="/"> {item.linkText} </Link> : <Link to={item.link}> {item.linkText} </Link>}
                        {item.child ?
                            <ul className="sub-menu" role="menu">
                                {item.submenu.map((sub_item, i) => (
                                    <li key={i} className={`menu-item ${sub_item.child ? 'menu-item-has-children' : ''} `}>
                                        {sub_item.child ? <Link onClick={e => e.preventDefault()} to="/"> {sub_item.linkText} </Link> : <Link to={sub_item.link}> {sub_item.linkText} </Link>}
                                        {sub_item.submenu ?
                                            <ul className="sub-menu">
                                                {sub_item.submenu.map((third_item, i) => (
                                                    <li className="menu-item" key={i}><Link
                                                        to={third_item.link}>{third_item.linkText}</Link>
                                                    </li>
                                                ))}
                                            </ul> : null}
                                    </li>
                                ))}
                            </ul>
                            : null
                        }
                    </li>
                )) : null}
            </ul>

        );
    }
}

export default Menu;