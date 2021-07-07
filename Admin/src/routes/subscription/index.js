/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 import { connect } from 'react-redux';
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
 import PricingBlockV2 from 'Components/Pricing/PricingBlockV2';
 
 // intl messages
 import IntlMessages from 'Util/IntlMessages';
 import Axios from 'axios';
class Subscription extends Component {
     state = {
        premiumPlan: 300,
        packages: [],
     }
     componentWillMount() {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
         }
        Axios.get('http://localhost:8000/api/pkglist',{},{headers: headers}).then(res=>{
            this.setState({
                packages: res.data.data
            })
        })
     }
    handleClickOpen = (arg = false) => {
    };
     render() {
         const { packages } = this.state;
         const { user, activedpkg } = this.props;
         console.log(user);
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Subscription</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.subscription" />} match={this.props.match} />
                 <div className="price-list m-10">
                    <div className="row row-eq-height">
                    `   {
                            packages.map(item=>{
                                return <PricingBlockV2
                                    planType="premium"
                                    type={`${item.package_name}`}
                                    color={item.id == activedpkg  ? 'success' : 'primary'}
                                    description="Secure file sharing and collaboration. Ideal for small teams."
                                    price={item.price}
                                    users={1}
                                    editPackage = {()=>this.editPackage(item.id)}
                                    features={[
                                        'Velkommen side',
                                        `Meny (${item.order_limit < 0 ? 'Unlimited' : item.order_limit} items)`,
                                        'Pakker',
                                        'Spesialiteter',
                                        'QR kode',
                                        'Whatsapp bestilling',
                                        `Online bestilling (${item.order_limit < 0 ? 'Unlimited' : item.order_limit + 'items'})`,
                                        'Reservasjon',
                                        'Kontakter',
                                        'Digital betaling'
                                    ]}
                                    id={item.id}
                                    deletePackage = {() => this.deletePackage(item.id) }
                                    ability={item.package_ability}
                                    status={item.id == activedpkg  ? true : false}
                                />
                            })
                        }
                    </div>
                </div>
                
             </div>
         );
     }
 }
 const mapStateToProps = ({ authUser }) => {
    const { user, activedpkg } = authUser;
    return { user, activedpkg };
 };
 export default connect(
    mapStateToProps,
 
 )(Subscription);