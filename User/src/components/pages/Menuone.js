import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerinner';
import Breadcrumbs from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/menu/Content';

const pagelocation = 'Menu'

class Menuone extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Slices - React Template | {pagelocation}</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags> 
                <Header/>
                <Breadcrumbs breadcrumb={{ pagename: pagelocation }} />
                <Content/>
                <Footer footer={{ style:"ct-footer footer-dark", logo:"assets/img/qrcode.png" }} />
            </Fragment>
        );
    }
}

export default Menuone;