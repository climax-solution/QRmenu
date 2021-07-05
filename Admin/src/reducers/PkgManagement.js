const PackageItem = {
    package_name: '',
    slug: '',
    package_type: '',
    order_limit: '',
    price:'',
    item_limit: '',
    package_ability:[]
}

export default (state = PackageItem, action) => {
    switch (action.type) {
        case 'CHANGE_PKG':
            return { ...state };
        default:
            return { ...state };
    }
}