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
import AuthEmail from './AuthEmail';

/**
 * Defines settings and display for Google authentication.
 * @param props authProps
 * @returns firebase auth ui component
 */
export default function Page() {
  //from App class
  const firebaseConfig = {
    apiKey: 'AIzaSyAnwyqSptqqUos34NJztFiGTolGW9cHlvw',
    authDomain: 'meyers-lab.firebaseapp.com',
    projectId: 'meyers-lab',
    storageBucket: 'meyers-lab.appspot.com',
    messagingSenderId: '689766815747',
    appId: '1:689766815747:web:6bb8bd81c44a3aa9649636',
    measurementId: 'G-2R8JVH7SQM',
  };
  var app = firebase.initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const auth = firebase.auth();

  const Auth = () => {
    return <AuthEmail auth={auth}></AuthEmail>;
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="firebase-auth-container">{Auth()}</div>
    </div>
  );
}
