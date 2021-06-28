import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerinner';
import Footer from '../layouts/Footer';
import Content from '../sections/blog-single/Content';

const pagelocation = 'Blog Details'

class Blogsingle extends Component {
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
                <Content blogId={this.props.match.params.id}/>
                <Footer footer={{ style:"ct-footer footer-dark", logo:"assets/img/logo-light.png" }} />
            </Fragment>
        );
    }
}

export default Blogsingle;