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
import {
  atom,
  RecoilRoot,
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
} from 'recoil';
import { admin } from '../Atom';
// import Router from 'next/navigation';
import { useGlobalState } from '../createContext';
import { recoilPersist } from 'recoil-persist';
import { useRouter } from 'next/router';
import AdminDash from './AdminDash';

/**
 * Defines settings and display for Google authentication.
 * @param props authProps
 * @returns firebase auth ui component
 */
export default function Page() {
  // const { isAdmin, setAdmin } = useGlobalState();

  // var isAdmin = useRecoilValue(admin);
  // var setAdmin = useSetRecoilState(admin);
  const [isAdmin, setAdmin] = useRecoilState(admin);

  const [name, setName] = useState<string>('');

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

  const Auth = () => {
    return <AuthEmail auth={auth}></AuthEmail>;
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        //User is signed in
        const userId = user.uid;
        const email = user.email;
        const name = user.displayName;
        if (name) {
          setName(name);
        }
        if (email) {
          const document = doc(firestore, 'users', email);
          getDoc(document).then((gotDoc) => {
            if (gotDoc.exists()) {
              setAdmin(gotDoc.data().admin);
            }
          });
          // const data = {
          //   userID: user.uid,
          //   userEmail: user.email,
          //   admin: true,
          // };
          // setDoc(document, data);
        }
      } else {
        console.log('Authentication error:', user);
      }
    });
  }, [auth]);

  // useEffect(() => {
  //   console.log(isAdmin);
  // }, [isAdmin]);

  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.getElementById('header');
      if (header) {
        setHeaderHeight(header.offsetHeight + 50);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return (
    <div>
      <div style={{ minHeight: `${headerHeight}px` }}></div>
      {isAdmin ? (
        <AdminDash/>
      ) : (
        // Render this block if isAdmin is false
        <div>
          {/* <div>Sign in here for admin access.</div> */}
          <div className="firebase-auth-container">{Auth()}</div>
        </div>
      )}
    </div>
    // <div>
    //   <div style={{ minHeight: `${headerHeight}px` }}></div>
    //   <div className="firebase-auth-container">{Auth()}</div>
    // </div>
  );
}
