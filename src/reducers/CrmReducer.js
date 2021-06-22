/**
 * CRM Reducer
 */
//action types
import {
   ADD_NEW_CLIENT,
   DELETE_CLIENT,
   UPDATE_CLIENT
} from '../actions/types';

import {
   clientsData
} from '../routes/crm/clients/data';

const INITIAL_STATE = {
   clientsData: clientsData
}

export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      // add product to cart 
      case ADD_NEW_CLIENT:
         let client = action.payload;
         let newClient = {
            image: "profile.jpg",
            name: client.name,
            e_mail: client.email,
            phone_number: client.mobile,
            country: client.location,
            type: "recently_added"
         }
         return {
            ...state,
            clientsData: [...state.clientsData, newClient]
         }
      // remove client to cart	
      case DELETE_CLIENT:
         let removeClient = action.payload;
         let newData = state.clientsData.filter((clientItem) => clientItem.id !== removeClient.id)
         return {
            ...state,
            clientsData: newData
         }
      // update client
      case UPDATE_CLIENT:
         let updateClient = action.payload;
         let newclientsData = [];
         for (const item of state.clientsData) {
            if (item.id === updateClient.ID) {
               item.name = updateClient.data.name;
               item.e_mail = updateClient.data.email;
               item.phone_number = updateClient.data.phoneNumber;
               item.country = updateClient.data.location;
            }
            newclientsData.push(item)
         }
         return {
            ...state,
            clientsData: newclientsData
         }
      // default case	
      default:
         return { ...state }
   }
}