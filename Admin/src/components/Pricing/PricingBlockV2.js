/**
 * Pricing Block V2
 */
import React from 'react';
import IntlMessages from 'Util/IntlMessages';
import ReactTooltip from 'react-tooltip';
import { Button } from 'reactstrap';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
 
 // intl messages
 const Items = [
   'Velkommen side',
   'Meny',
   'Pakker',
   'Spesialiteter',
   'QR kode',
   'Whatsapp bestilling',
   'Online bestilling',
   'Reservasjon',
   'Kontakter',
   'Digital betaling'
];
const green = {fontWeight: 'bold', color: 'green'};
const red = {fontWeight: 'bold', color: 'red'};
 const PricingBlockV2 = ({ planType, type, price, users, features, color, ability,id,status, activePkg }) => (
    <RctCollapsibleCard customClasses="text-center" colClasses="col-md-4" id={id}>
       <div className="pricing-icon mb-40">
          <img src={require('Assets/img/pricing-icon.png')} alt="pricing icon" className="img-fluid" width="" height="" />
       </div>
       <h2 className={`text-${color} pricing-title`}>{type}</h2>
       <div className="mb-25">
          {planType === 'free' ?
             <h2 className="amount-title"><IntlMessages id={price} /></h2>
             : <h6 className="amount-title">Kr{price}/Mo</h6>
          }
          <span className="text-muted small">For {users} user</span>
       </div>
       <ul className="price-detail list-unstyled">
          {features.map((feature, key) => (
             <li key={key} className="text-left"><i className={`${!ability[key] ? 'ti-close' : 'ti-check'}`} style={ability[key] ? green : red}></i> {feature}</li>
          ))}
       </ul>
         <Button color={color} className='btn-block btn-lg' onClick={activePkg}>
            {
               status ? <IntlMessages id="widgets.runpackage" disabled/>
               : <IntlMessages id="widgets.selectpackage" />
            }
         </Button>
    </RctCollapsibleCard>
 );
 
 export default PricingBlockV2;
 