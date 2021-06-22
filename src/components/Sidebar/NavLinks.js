// sidebar nav links
export default {
   category1: [
      {
         "menu_title": "sidebar.dashboard",
         "menu_icon": "zmdi zmdi-view-dashboard",
         "path": "/app/dashboard",
         "type_multi": null,
         "child_routes": null
      }
   ],
   category2: [
      {
         "menu_title": "sidebar.users",
         "menu_icon": "zmdi zmdi-accounts-alt",
         "type_multi": null,
         "child_routes": [
            {
               "path": "/app/users-management/addnew",
               "menu_title": "sidebar.newuser"
            },
            {
               "path": "/app/users-management/restaurantlist",
               "menu_title": "sidebar.restaurantlist"
            }
         ]
      }
   ],
   category3: [
      {
         "menu_title": "sidebar.userpackage",
         "menu_icon": "zmdi zmdi-format-list-bulleted",
         "path": "/app/userspackage",
         "child_routes": null
      }
   ],
   category4: [
      {
         "menu_title": "sidebar.payment",
         "menu_icon": "zmdi zmdi-card",
         "type_multi": null,
         "child_routes": [
            {
               "path": "/app/payment/transaction-history",
               "menu_title": "sidebar.transactionhistory"
            },
            {
               "path": "/app/payment/offline-payment",
               "menu_title": "sidebar.offlinepayment"
            },
            {
               "path": "/app/payment/payment-setting",
               "menu_title": "sidebar.paymentsetting"
            }
         ]
      }
   ],
   category5: [
      {
         "menu_title": "sidebar.adminsetting",
         "menu_icon": "zmdi zmdi-settings",
         "path": "/app/adminsetting",
         "child_routes": null
      }
   ],
   category6: [
      {
         "menu_title": "sidebar.backupdb",
         "menu_icon": "zmdi zmdi-download",
         "path": "/app/backupdb",
         "child_routes": null
      }
   ]
}
