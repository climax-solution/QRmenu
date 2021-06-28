/**
 * Blank Page
 */
 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 // page title bar
 import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
 import PricingBlockV2 from 'Components/Pricing/PricingBlockV2';
 
 // intl messages
 import IntlMessages from 'Util/IntlMessages';
 
 export default class Subscription extends Component {
     state = {
        premiumPlan: 300,
     }
    handleClickOpen = (arg = false) => {
    };
     render() {
         return (
             <div className="blank-wrapper">
                 <Helmet>
                     <title>Subscription</title>
                     <meta name="description" content="Reactify Blank Page" />
                 </Helmet>
                 <PageTitleBar title={<IntlMessages id="sidebar.subscription" />} match={this.props.match} />
                 <div className="price-list m-10">
                    <div className="row row-eq-height">
                        <PricingBlockV2
                            planType="free"
                            type="widgets.freemember"
                            color="success"
                            description="Secure file sharing and collaboration. Ideal for small teams."
                            price="widgets.free"
                            users={1}
                            handleClickOpen = {()=>this.handleClickOpen(false)}
                            features={[
                                'Velkommen side',
                                'Meny (50 items)',
                                'Pakker',
                                'Spesialiteter',
                                'QR kode',
                                'Whatsapp bestilling',
                                'Online bestilling (50)',
                                'Reservasjon',
                                'Kontakter',
                                'Digital betaling'
                            ]}
                            status={true}
                        />
                        <PricingBlockV2
                            planType="premium"
                            type="widgets.paymentmember"
                            color="primary"
                            description="Secure file sharing and collaboration. Ideal for small teams."
                            price={this.state.premiumPlan}
                            users={1}
                            handleClickOpen = {()=>this.handleClickOpen(false)}
                            features={[
                                'Velkommen side',
                                'Meny (Unlimited items)',
                                'Pakker',
                                'Spesialiteter',
                                'QR kode',
                                'Whatsapp bestilling',
                                'Online bestilling (Unlimited)',
                                'Reservasjon',
                                'Kontakter',
                                'Digital betaling'
                            ]}
                            status={false}
                        />
                    </div>
                </div>
                
             </div>
         );
     }
 }
 