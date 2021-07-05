// sidebar nav links
export default {
   category1: [
      {
         "menu_title": "sidebar.dashboard",
         "menu_icon": "zmdi zmdi-view-dashboard",
         "path": "/admin/dashboard",
         "type_multi": null,
      }
   ],
   category2: [
      {
         "menu_title": "sidebar.users",
         "menu_icon": "zmdi zmdi-accounts-alt",
         "type_multi": null,
         "child_routes": [
            {
               "path": "/admin/users-management/addnew",
               "menu_title": "sidebar.newuser"
            },
            {
               "path": "/admin/users-management/restaurantlist",
               "menu_title": "sidebar.restaurantlist"
            }
         ]
      }
   ],
   category3: [
      {
         "menu_title": "sidebar.userpackage",
         "menu_icon": "zmdi zmdi-format-list-bulleted",
         "path": "/admin/userspackage",
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
               "path": "/admin/payment/transaction-history",
               "menu_title": "sidebar.transactionhistory"
            },
            {
               "path": "/admin/payment/offline-payment",
               "menu_title": "sidebar.offlinepayment"
            },
            {
               "path": "/admin/payment/payment-setting",
               "menu_title": "sidebar.paymentsetting"
            }
         ]
      }
   ],
   category5: [
      {
         "menu_title": "sidebar.adminsetting",
         "menu_icon": "zmdi zmdi-settings",
         "path": "/admin/adminsetting",
         "child_routes": null
      }
   ],
   category6: [
      {
         "menu_title": "sidebar.backupdb",
         "menu_icon": "zmdi zmdi-download",
         "path": "/admin/backupdb",
         "child_routes": null
      }
   ],
   category7:[
      {
         "menu_title": "sidebar.subscription",
         "menu_icon":"zmdi zmdi-wrench",
         "path": "/vendor/subscription",
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
               "path": "/vendor/menu/category",
               "menu_title": "sidebar.category"
            },
            {
               "path": "/vendor/menu/item",
               "menu_title": "sidebar.item"
            },
            {
               "path": "/vendor/menu/package",
               "menu_title": "sidebar.package"
            },
            {
               "path": "/vendor/menu/specialities",
               "menu_title": "sidebar.specialities"
            },
            {
               "path": "/vendor/menu/qrbuilder",
               "menu_title": "sidebar.qrbuilder"
            },
            {
               "path": "/vendor/menu/allergens",
               "menu_title": "sidebar.allergens"
            }
         ]
      }
   ],
   category9:[
      {
         "menu_title": "sidebar.liveorder",
         "menu_icon":"zmdi zmdi-file-text",
         "path": "/vendor/liveorder",
         "child_routes": null,
         "new_item": true
      }
   ],
   category10: [
      {
         "menu_title": "sidebar.profile",
         "menu_icon":"zmdi zmdi-account",
         "type_multi": null,
         "child_routes": [
            {
               "path": "/vendor/profile/profile",
               "menu_title": "sidebar.profile"
            },
            {
               "path": "/vendor/profile/avaible",
               "menu_title": "sidebar.avaible"
            },

         ]
      }
   ],
   category11:[
      {
         "menu_title": "sidebar.managefeature",
         "menu_icon": "zmdi zmdi-layers",
         "path": "/vendor/managefeature",
         "child_routes": null
      }
   ],
   category12: [{
      "menu_title": "sidebar.paymenthistory",
      "menu_icon": "zmdi zmdi-card",
      "path": "/vendor/paymenthistory",
      "child_routes": null
   }],
   category13: [{
      "menu_title": "sidebar.deactive",
      "menu_icon": "zmdi zmdi-block",
      "path": "/vendor/deactiveaccount",
      "child_routes": null
   }],
   category14: [{
      "menu_title": "sidebar.orderconfig",
      "menu_icon": "zmdi zmdi-settings",
      "path": "/vendor/orderconfiguration",
      "child_routes": null
   }],
   category15: [{
      "menu_title": "sidebar.reservation",
      "menu_icon": "zmdi zmdi-truck",
      "path": "/vendor/reservation",
      "child_routes": null
   }],
   category16: [{
      "menu_title": "sidebar.kds",
      "menu_icon": "zmdi zmdi-shopping-basket",
      "path": "/vendor/kds",
      "child_routes": null
   }],
   category17: [{
      "menu_title": "sidebar.overviewprofile",
      "menu_icon": "zmdi zmdi-eye",
      "exact": true,
      "path": "overviewprofile",
      "child_routes": null
   }]
}
