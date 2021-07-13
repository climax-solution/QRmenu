import { ADD_CART, EMPTY_CART, REMOVE_CART } from "./types";

export const addCart = (product) => (dispatch, getState) =>{
    let { cart_list } = getState().content;
    let list = JSON.parse(cart_list);
    if ( list == null ) {
        let specify = window.location.host;
        list = {};
        list[specify] = [
            {
                id: product.id,
                price:product.price,
                qty: 1,
                img_url: product.img_url,
                name: product.title
            }
        ]
    }
    else {
        let flag = 0;
        list[window.location.host].map(item => {
            let exist = item.id == product.id;
            if (exist) {
                if (item.price == product.price) {
                    item.qty ++;
                    flag = 1;
                }
                else flag = 0;
            }
        })
        if (!flag) {
            list[window.location.host].push({
                id: product.id,
                price: product.price,
                qty: 1,
                img_url: product.img_url,
                name: product.title
            })
        }
        
    }
    dispatch({
        type: ADD_CART,
        payload: JSON.stringify(list)
    })
}

export const removeCart = (key) => (dispatch, getState) => {
    let cart_list = JSON.parse(getState().content.cart_list);
    cart_list[window.location.host].splice(key, 1);
    console.log('CART_LIST=>',cart_list[window.location.host], key);
    dispatch({
        type: REMOVE_CART,
        payload: JSON.stringify(cart_list)
    })
}