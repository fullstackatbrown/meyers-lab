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

  var uiConfig = {
    signInSuccessUrl: '/adminDashboard',
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: GoogleAuthProvider.PROVIDER_ID,
        clientId: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
        requireDisplayName: false,
      },
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false,
      },
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
    tosUrl: 'your terms of service url',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
      window.location.assign('<your-privacy-policy-url>');
    },
    // callbacks: {
    //   signInSuccessWithAuthResult: (
    //     authObject: firebase.auth.UserCredential,
    //     redirectURL?: string,
    //   ) => {
    //     window.setTimeout(() => {
    //       window.location.assign('/adminDashboard');
    //     }, 2000);

    //     return false;
    //   },
    // },
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
