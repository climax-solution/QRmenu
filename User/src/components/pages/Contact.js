import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerthree';
import Footer from '../layouts/Footer';
import Content from '../sections/contact/Content';

const pagelocation = 'Contact Us'

class Contact extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>{pagelocation}</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags> 
                <Header/>
                <Content/>
                <Footer footer={{ style:"ct-footer footer-dark", logo:"assets/img/qrcode.png" }} />
            </Fragment>
        );
    }
}

export default Contact;