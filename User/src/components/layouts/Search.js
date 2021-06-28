import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <form className="search-form" method="post">
                <input type="text" placeholder="Search..." />
                <button type="submit" className="search-btn">
                    <i className="flaticon-magnifying-glass" />
                </button>
            </form>
        );
    }
}

export default Search;