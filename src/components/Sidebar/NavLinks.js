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
   ],
   category7:[
      {
         "menu_title": "sidebar.subscription",
         "menu_icon":"zmdi zmdi-wrench",
         "path": "/app/subscription",
         "child_routes": null
      }
   ],
   category8:[
      {
         "menu_title": "sidebar.menu",
         "menu_icon": 'zmdi zmdi-home',
         "type_multi": null,
         "child_routes": [
            {
               "path": "/app/menu/category",
               "menu_title": "sidebar.category"
            },
            {
               "path": "/app/menu/package",
               "menu_title": "sidebar.package"
            },
            {
               "path": "/app/menu/qrbuilder",
               "menu_title": "sidebar.qrbuilder"
            }
         ]
      }
   ],
   category9:[
      {
         "menu_title": "sidebar.liveorder",
         "menu_icon":"zmdi zmdi-file-text",
         "path": "/app/liveorder",
         "child_routes": null
      }
   ],
   category10: [
      {
         "menu_title": "sidebar.profile",
         "menu_icon":"zmdi zmdi-account",
         "type_multi": null,
         "child_routes": [
            {
               "path": "/app/profile/profile",
               "menu_title": "sidebar.profile"
            },
            {
               "path": "/app/menu/avaible",
               "menu_title": "sidebar.avaible"
            }
         ]
      }
   ],
   category11:[
      {
         "menu_title": "sidebar.managefeature",
         "menu_icon": "zmdi zmdi-layers",
         "path": "/app/managefeature",
         "child_routes": null
      }
   ],
   category12: [{
      "menu_title": "sidebar.paymenthistory",
      "menu_icon": "zmdi zmdi-card",
      "path": "/app/paymenthistory",
      "child_routes": null
   }],
   category13: [{
      "menu_title": "sidebar.deactive",
      "menu_icon": "zmdi zmdi-block",
      "path": "/app/deactiveaccount",
      "child_routes": null
   }]
}
