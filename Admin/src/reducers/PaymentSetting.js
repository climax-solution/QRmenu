const Setting = {
    paypal:{
        paypal_payment: false,
        paypal_status: false,
        paypal_email: ''
    },
    stripe:{
        stripe_gateway: false,
        stripe_public_key: '',
        stripe_secret_key: ''
    },
    razor: {
        razor_payment: false,
        razor_key: ''
    },
    bambora: {
        bambora_gateway: false,
        bambora_access_key: '',
        bambora_merchat_key: '',
        bambora_secret_key: ''
    }
}

export default (state = Setting, action) => {
    switch (action.type) {
        case 'CHANGE_PKG':
            return { ...state };
        default:
            return { ...state };
    }
}