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
import PaymentHistory from 'Routes/paymenthistory';
import Profile from 'Routes/profile';
import Menu from 'Routes/menu';
import Login from 'Routes/signin';
import SignUp from 'Routes/signup';
import OrderConfig from 'Routes/orderconfig';
import Reservation from 'Routes/reservation';
import KDS from 'Routes/kds';
import OrderItem from 'Routes/orderitem';

export default [
   //Login
   {
      path: 'login',
      component: Login
   },
   {
      path: 'signup',
      component: SignUp
   },
   //
   {
      path: 'dashboard',
      component: Dashboard,
      divide: ['/admin','/vendor']
   },
   {
      path: 'crm',
      component: Crm,
      divide: ['/admin','/vendor']
   },
   {
      path: 'users-management',
      component: UsersManagement,
      divide: ['/admin']
   },
   {
      path: "userspackage",
      component: UsersPackage,
      divide: ['/admin']
   },
   {
      path: "payment",
      component: Payment,
      divide: ['/admin']
   },
   {
      path: "adminsetting",
      component: AdminSetting,
      divide: ['/admin']
   },
   {
      path: "backupdb",
      component: BackUpDB,
      divide: ['/admin']
   },
   //vendor
   {
      path: 'liveorder',
      component: LiveOrder,
      divide: ['/vendor']
   },
   {
      path: 'orderitem/:id',
      component: OrderItem,
      divide: ['/vendor']
   },
   {
      path: 'reservationitem/:id',
      component: OrderItem,
      divide: ['/vendor']
   },
   {
      path: 'reservation',
      component: Reservation,
      divide: ['/vendor']
   },
   {
      path: 'kds',
      component: KDS,
      divide: ['/vendor']
   },
   {
      path: 'managefeature',
      component: ManageFeature,
      divide: ['/vendor']
   },
   {
      path: 'paymenthistory',
      component: PaymentHistory,
      divide: ['/vendor']
   },
   {
      path: 'profile',
      component: Profile,
      divide: ['/vendor']
   },
   {
      path: 'menu',
      component: Menu,
      divide: ['/vendor']
   },
   {
      path: 'orderconfiguration',
      component: OrderConfig,
      divide: ['/vendor']
   },
   {
      path: 'overviewprofile',
      component: Subscription,
      divide: ['/vendor']
   },
   {
      path: 'subscription',
      component: Subscription,
      divide: ['/vendor']
   }
]