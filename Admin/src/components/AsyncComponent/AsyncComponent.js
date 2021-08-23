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

//Item
const AsyncItemComponent = Loadable({
   loader: () => import("Routes/menu/item"),
   loading: () => <RctPageLoader />
})

//Package
const AsyncPackageComponent = Loadable({
   loader: () => import("Routes/menu/package"),
   loading: () => <RctPageLoader />
})

//Specialities
const AsyncSpecialitesComponent = Loadable({
   loader: () => import("Routes/menu/specialites"),
   loading: () => <RctPageLoader />
})

//QR Builder
const AsyncQrBuilderComponent = Loadable({
   loader: () => import("Routes/menu/qrbuilder"),
   loading: () => <RctPageLoader />
})

//Allergens
const AsyncAllergensComponent = Loadable({
   loader: () => import("Routes/menu/allergens"),
   loading: () => <RctPageLoader />
})

//Profile
const AsyncProfileComponent = Loadable({
   loader: () => import("Routes/profile/profile"),
   loading: () => <RctPageLoader />
})

//Avaible Days
const AsyncAvaibleComponent = Loadable({
   loader: () => import("Routes/profile/avaibledays"),
   loading: () => <RctPageLoader />
})

const AsyncSiteSettingComponent = Loadable({
   loader: () => import("Routes/adminsetting/site_setting"),
   loading: () => <RctPageLoader />
})

const AsyncEmainSettingComponent = Loadable({
   loader: () => import("Routes/adminsetting/email_setting"),
   loading: () => <RctPageLoader/>
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
   AsyncItemComponent,
   AsyncPackageComponent,
   AsyncSpecialitesComponent,
   AsyncQrBuilderComponent,
   AsyncAllergensComponent,
   AsyncProfileComponent,
   AsyncAvaibleComponent,
   AsyncSiteSettingComponent,
   AsyncEmainSettingComponent
};
