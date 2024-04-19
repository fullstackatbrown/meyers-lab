'use client';
import React, { useEffect, useState } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import firebase from 'firebase/compat/app';
import {
  getAuth,
  onAuthStateChanged,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  getFirestore,
  addDoc,
  collection,
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import {
  atom,
  RecoilRoot,
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
} from 'recoil';
import { admin } from '../Atom';

/**
 * Auth object that is shared between firestore authentication and database.
 */
interface authProps {
  auth: firebase.auth.Auth;
}

/**
 * Defines settings and display for Google authentication.
 * @param props authProps
 * @returns firebase auth ui component
 */
export default function AuthEmail(props: authProps) {
  const [isAdmin, setAdmin] = useRecoilState(admin);

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_LOGIN_API_KEY,
    authDomain: 'meyers-lab.firebaseapp.com',
    projectId: 'meyers-lab',
    storageBucket: 'meyers-lab.appspot.com',
    messagingSenderId: process.env.REACT_APP_MSG,
    appId: process.env.REACT_APP_APP,
    measurementId: process.env.REACT_APP_MSR,
  };


  var app = firebase.initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const auth = firebase.auth();

  var uiConfig = {
    // signInSuccessUrl: '/adminDash',
    //popup
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: GoogleAuthProvider.PROVIDER_ID,
        clientId: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
        requireDisplayName: false,
      },
      // {
      //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //   requireDisplayName: false,
      // },
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
    tosUrl: 'your terms of service url',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
      window.location.assign('<your-privacy-policy-url>');
    },
    callbacks: {
      signInSuccessWithAuthResult: (
        authResult: firebase.auth.UserCredential,
        redirectURL?: string,
      ) => {
        // You can add your own logic here if needed after a successful sign-in

        if (authResult.user) {
          const userId = authResult.user.uid;
          const email = authResult.user.email;
          if (email) {
            const document = doc(firestore, 'users', email);
            getDoc(document).then((gotDoc) => {
              if (gotDoc.exists()) {
                setAdmin(true);
                return true;
              }
            });
          }
        }
        // console.log('User signed in:', authResult.user);

        // Return false to prevent a redirect
        window.location.assign('/admin');
        return false;
      },
    },
  };

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(props.auth);
    ui.start('.firebase-auth-container', uiConfig);
  }, [props.auth]);

  return (
    <div>
      <div className="firebase-auth-container"></div>
    </div>
  );
}
