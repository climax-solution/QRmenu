/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import settings from './settings';
import sidebarReducer from './SidebarReducer';
import authUserReducer from './AuthUserReducer';
import feedbacksReducer from './FeedbacksReducer';
import pkgmanagement from './PkgManagement';

const reducers = combineReducers({
  settings,
  // chatAppReducer,
  // emailApp: emailAppReducer,
  sidebar: sidebarReducer,
  // todoApp: todoAppReducer,
  authUser: authUserReducer,
  feedback: feedbacksReducer,
  pkgmange: pkgmanagement,
});
export default reducers;
