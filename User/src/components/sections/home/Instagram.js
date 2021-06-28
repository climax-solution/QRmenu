import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import insta from '../../../data/insta.json';

class Instagram extends Component {
    render() {
        return (
            <div className="row no-gutters">
                {insta.slice(0, 6).map((item, i) => (
                    <div key={i} className="col-lg-2 col-md-4 col-sm-4 col-6 p-0">
                        <Link to="#" className="ct-ig-item">
                            <img src={process.env.PUBLIC_URL + "/" + item.img} alt="insta" />
                        </Link>
                    </div>
                ))}
            </div>
        );
    }
}

export default Instagram;