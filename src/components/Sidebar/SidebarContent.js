/**
 * Sidebar Content
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import IntlMessages from 'Util/IntlMessages';

import NavMenuItem from './NavMenuItem';

// redux actions
import { onToggleMenu } from 'Actions';

class SidebarContent extends Component {

    toggleMenu(menu, stateCategory) {
        let data = {
            menu,
            stateCategory
        }
        this.props.onToggleMenu(data);
    }

    render() {
        const { sidebarMenus } = this.props.sidebar;
        const { match } = this.props;
        if (match.url == '/vendor') {
            sidebarMenus.category1.map((menu,key)=>{
                const item = menu.path.split('/');
                menu.path = '/vendor/' + item[2];
            })
        }
        
        return (
            <div className="rct-sidebar-nav">
                <nav className="navigation">
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={
                            <ListSubheader className="side-title" component="li">
                                <IntlMessages id="sidebar.general" />
                            </ListSubheader>}
                    >
                        {sidebarMenus.category1.map((menu, key) => (
                            <NavMenuItem
                                menu={menu}
                                key={key}
                            />
                        ))}
                    </List>
                    {
                        match.url == "/app" &&
                        <div>
                            <List
                                className="rct-mainMenu p-0 m-0 list-unstyled"
                            >
                                {sidebarMenus.category2.map((menu, key) => (
                                    <NavMenuItem
                                        menu={menu}
                                        key={key}
                                        onToggleMenu={() => this.toggleMenu(menu, 'category2')}
                                    />
                                ))}
                            </List>
                            <List
                                className="rct-mainMenu p-0 m-0 list-unstyled"
                            >
                                {sidebarMenus.category3.map((menu, key) => (
                                    <NavMenuItem
                                        menu={menu}
                                        key={key}
                                    />
                                ))}
                            </List>
                            <List
                                className="rct-mainMenu p-0 m-0 list-unstyled"
                            >
                                {sidebarMenus.category4.map((menu, key) => (
                                    <NavMenuItem
                                        menu={menu}
                                        key={key}
                                        onToggleMenu={() => this.toggleMenu(menu, "category4")}
                                    />
                                ))}
                            </List>
                            <List
                                className="rct-mainMenu p-0 m-0 list-unstyled"
                            >
                                {sidebarMenus.category5.map((menu, key) => (
                                    <NavMenuItem 
                                        menu={menu}
                                        key={key}
                                    />
                                ))}
                            </List>
                            <List
                                className="rct-mainMenu p-0 m-0 list-unstyled"
                            >
                                {sidebarMenus.category6.map((menu, key) => (
                                    <NavMenuItem 
                                        menu={menu}
                                        key={key}
                                    />
                                ))}
                            </List>
                        </div>
                    }
                    {
                        match.url == '/vendor' &&
                        <div>
                            <List
                                className="rct-mainMenu p-0 m-0 list-unstyled"
                                
                            >
                                {sidebarMenus.category7.map((menu, key) => (
                                    <NavMenuItem 
                                        menu={menu}
                                        key={key}
                                    />
                                ))}
                            </List>
                            <List
                                className="rct-mainMenu p-0 m-0 list-unstyled"
                            >
                                {sidebarMenus.category8.map((menu, key) => (
                                    <NavMenuItem
                                        menu={menu}
                                        key={key}
                                        onToggleMenu={() => this.toggleMenu(menu, "category8")}
                                    />
                                ))}
                            </List>
                            <List
                                className="rct-mainMenu p-0 m-0 list-unstyled"
                            >
                                {sidebarMenus.category9.map((menu, key) => (
                                    <NavMenuItem 
                                        menu={menu}
                                        key={key}
                                    />
                                ))}
                            </List>
                            <List
                                className="rct-mainMenu p-0 m-0 list-unstyled"
                            >
                                {sidebarMenus.category10.map((menu, key) => (
                                    <NavMenuItem
                                        menu={menu}
                                        key={key}
                                        onToggleMenu={() => this.toggleMenu(menu, "category10")}
                                    />
                                ))}
                            </List>
                            <List
                                className="rct-mainMenu p-0 m-0 list-unstyled"
                            >
                                {sidebarMenus.category11.map((menu, key) => (
                                    <NavMenuItem
                                        menu={menu}
                                        key={key}
                                    />
                                ))}
                            </List>
                            <List
                                className="rct-mainMenu p-0 m-0 list-unstyled"
                            >
                                {sidebarMenus.category14.map((menu,key) => (
                                    <NavMenuItem
                                        menu={menu}
                                        key={key}
                                    />
                                ))}
                            </List>
                            <List
                                className="rct-mainMenu p-0 m-0 list-unstyled"
                            >
                                {sidebarMenus.category12.map((menu, key) => (
                                    <NavMenuItem
                                        menu={menu}
                                        key={key}
                                    />
                                ))}
                            </List>
                            <List
                                className="rct-mainMenu p-0 m-0 list-unstyled"
                            >
                                {sidebarMenus.category13.map((menu, key) => (
                                    <NavMenuItem
                                        menu={menu}
                                        key={key}
                                    />
                                ))}
                            </List>
                        </div>
                    }
                </nav>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ sidebar }) => {
    return { sidebar };
};

export default withRouter(connect(mapStateToProps, {
    onToggleMenu
})(SidebarContent));
