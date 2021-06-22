/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import firebase from 'firebase/app';
import 'firebase/auth';
import { NotificationManager } from 'react-notifications';
import {
   LOGIN_USER,
   LOGIN_USER_SUCCESS,
   LOGIN_USER_FAILURE,
   LOGOUT_USER,
   SIGNUP_USER,
   SIGNUP_USER_SUCCESS,
   SIGNUP_USER_FAILURE
} from 'Actions/types';

/**
 * Redux Action To Sigin User With Firebase
 */
export const signinUserInFirebase = (user, history) => (dispatch) => {
   dispatch({ type: LOGIN_USER });
   firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((user) => {
         localStorage.setItem("user_id", "user-id");
         dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
         history.push('/');
         NotificationManager.success('User Login Successfully!');
      })
      .catch((error) => {
         dispatch({ type: LOGIN_USER_FAILURE });
         NotificationManager.error(error.message);
      });
}

/**
 * Redux Action To Signout User From  Firebase
 */
export const logoutUserFromFirebase = () => (dispatch) => {
   firebase.auth().signOut()
      .then(() => {
         dispatch({ type: LOGOUT_USER });
         localStorage.removeItem('user_id');
         NotificationManager.success('User Logout Successfully');
      })
      .catch((error) => {
         NotificationManager.error(error.message);
      })
}

/**
 * Redux Action To Signup User In Firebase
 */
export const signupUserInFirebase = (user, history) => (dispatch) => {
   dispatch({ type: SIGNUP_USER });
   firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((success) => {
         localStorage.setItem("user_id", "user-id");
         dispatch({ type: SIGNUP_USER_SUCCESS, payload: localStorage.getItem('user_id') });
         history.push('/');
         NotificationManager.success('Account Created Successfully!');
      })
      .catch((error) => {
         dispatch({ type: SIGNUP_USER_FAILURE });
         NotificationManager.error(error.message);
      })
}

/**
 * Redux Action To Signin User In Firebase With Facebook
 */
export const signinUserWithFacebook = (history) => (dispatch) => {
   dispatch({ type: LOGIN_USER });
   const provider = new firebase.auth.FacebookAuthProvider();
   firebase.auth().signInWithPopup(provider).then(function (result) {
      localStorage.setItem("user_id", "user-id");
      dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
      history.push('/');
      NotificationManager.success(`Hi ${result.user.displayName}!`);
   }).catch(function (error) {
      dispatch({ type: LOGIN_USER_FAILURE });
      NotificationManager.error(error.message);
   });
}

/**
 * Redux Action To Signin User In Firebase With Google
 */
export const signinUserWithGoogle = (history) => (dispatch) => {
   dispatch({ type: LOGIN_USER });
   const provider = new firebase.auth.GoogleAuthProvider();
   firebase.auth().signInWithPopup(provider).then(function (result) {
      localStorage.setItem("user_id", "user-id");
      dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
      history.push('/');
      NotificationManager.success(`Hi ${result.user.displayName}!`);
   }).catch(function (error) {
      dispatch({ type: LOGIN_USER_FAILURE });
      NotificationManager.error(error.message);
   });
}

/**
 * Redux Action To Signin User In Firebase With Github
 */
export const signinUserWithGithub = (history) => (dispatch) => {
   dispatch({ type: LOGIN_USER });
   const provider = new firebase.auth.GithubAuthProvider();
   firebase.auth().signInWithPopup(provider).then(function (result) {
      localStorage.setItem("user_id", "user-id");
      dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
      history.push('/');
      NotificationManager.success(`Hi ${result.user.displayName}!`);
   }).catch(function (error) {
      dispatch({ type: LOGIN_USER_FAILURE });
      NotificationManager.error(error.message);
   });
}

/**
 * Redux Action To Signin User In Firebase With Twitter
 */
export const signinUserWithTwitter = (history) => (dispatch) => {
   dispatch({ type: LOGIN_USER });
   const provider = new firebase.auth.TwitterAuthProvider();
   firebase.auth().signInWithPopup(provider).then(function (result) {
      localStorage.setItem("user_id", "user-id");
      dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
      history.push('/');
      NotificationManager.success('User Login Successfully!');
   }).catch(function (error) {
      dispatch({ type: LOGIN_USER_FAILURE });
      NotificationManager.error(error.message);
   });
}