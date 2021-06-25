//admin
import Dashboard from 'Routes/dashboard';
import Crm from 'Routes/crm';
import UsersManagement from 'Routes/users-management';
import UsersPackage from 'Routes/userspackage';
import Payment from 'Routes/payment';
import AdminSetting from 'Routes/adminsetting';
import BackUpDB from 'Routes/backupdb';
import LiveOrder from 'Routes/liveorder';
//vendor
import Subscription from 'Routes/subscription';
import ManageFeature from 'Routes/managefeature';
export default [
   {
      path: 'dashboard',
      component: Dashboard
   },
   {
      path: 'subscription',
      component: Subscription
   },
   {
      path: 'crm',
      component: Crm
   },
   {
      path: 'users-management',
      component: UsersManagement
   },
   {
      path: "userspackage",
      component: UsersPackage
   },
   {
      path: "payment",
      component: Payment
   },
   {
      path: "adminsetting",
      component: AdminSetting
   },
   {
      path: "backupdb",
      component: BackUpDB
   },
   //vendor
   {
      path: 'liveorder',
      component: LiveOrder
   },
   {
      path: 'managefeature',
      component: ManageFeature
   }
]