/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

//AddNewuser
const AsyncComponentAddNewRestaurantComponent = Loadable({
   loader: () => import("Routes/users-management/addnew"),
   loading: () => <RctPageLoader />,
});

//Restaurant List
const AsyncComponentRestaurantListComponent = Loadable({
   loader: () => import("Routes/users-management/restaurantlist"),
   loading: () => <RctPageLoader />,
});

//Users Package
const AsyncComponentUsersPackageComponent = Loadable({
   loader: () => import("Routes/userspackage"),
   loading: () => <RctPageLoader />
})

// dashboard
const AsyncDashboardComponent = Loadable({
   loader: () => import("Routes/dashboard"),
   loading: () => <RctPageLoader />,
});

// offline payment
const AsyncOfflinePaymentComponent = Loadable({
   loader: () => import("Routes/payment/offline-payment"),
   loading: () => <RctPageLoader />,
});

// payment setting
const AsyncPaymentSettingComponent = Loadable({
   loader: () => import("Routes/payment/payment-setting"),
   loading: () => <RctPageLoader />,
});

// Transaction History
const AsyncTransactionHistoryComponent = Loadable({
   loader: () => import("Routes/payment/transaction-history"),
   loading: () => <RctPageLoader />,
});

//Subscription
const AsyncSubscriptionComponent = Loadable({
   loader: () => import("Routes/subscription"),
   loading: () => <RctPageLoader />
})

//Category
const AsyncCategoryComponent = Loadable({
   loader: () => import("Routes/menu/category"),
   loading: () => <RctPageLoader />
})

//Package
const AsyncPackageComponent = Loadable({
   loader: () => import("Routes/menu/package"),
   loading: () => <RctPageLoader />
})

//Package
const AsyncQrBuilderComponent = Loadable({
   loader: () => import("Routes/menu/qrbuilder"),
   loading: () => <RctPageLoader />
})

export {
   AsyncDashboardComponent,
   AsyncComponentAddNewRestaurantComponent,
   AsyncComponentRestaurantListComponent,
   AsyncComponentUsersPackageComponent,
   AsyncOfflinePaymentComponent,
   AsyncPaymentSettingComponent,
   AsyncTransactionHistoryComponent,
   AsyncSubscriptionComponent,
   AsyncCategoryComponent,
   AsyncPackageComponent,
   AsyncQrBuilderComponent,
};
