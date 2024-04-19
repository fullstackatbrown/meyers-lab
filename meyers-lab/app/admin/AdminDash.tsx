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
  getDocs,
} from 'firebase/firestore';
import {
  atom,
  RecoilRoot,
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
} from 'recoil';
import { admin } from '../Atom';

export default function AdminDash() {


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

  const [addEmail, setAddEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emails, setEmails] = useState<string[]>([]);

  const handleAddEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddEmail(event.target.value);
    if (event.target.value.includes('@')) {
      setSuccessMessage('');
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid email.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // If the "Enter" key is pressed, call the submitAdmin function
      console.log('here');
      e.preventDefault();
      if (addEmail.includes('@')) {
        submitAdmin();
      }
    }
  };

  const submitAdmin = () => {
    console.log('Adding admin member with email:', addEmail);
    const document = doc(firestore, 'users', addEmail);
    const data = {
      userEmail: addEmail,
      admin: true,
    };
    setDoc(document, data).then(() => {
      console.log('user added successfully');
      setSuccessMessage('User added successfully.');
      setAddEmail('');
    });
  };

  async function getAllEmails() {
    try {
      const collectionRef = collection(firestore, 'users');
      const querySnapshot = await getDocs(collectionRef);
      const emails: string[] = [];
      querySnapshot.forEach((doc) => {
        emails.push(doc.id);
      });
      setEmails(emails);
    } catch (error) {
      console.error('Error fetching document IDs:', error);
      return [];
    }
  }

  useEffect(() => {
    getAllEmails();
  }, [emails]);

  return (
    <div className="ml-10 font-circ-std">
      <div className="mb-6">
        You have signed in successfully. Add additional admin users below.
      </div>

      {/* <button className="button-overlay focus:shadow-outline font-regular rounded border border-gray-400 bg-gray-200 px-4 py-2 text-gray-800 hover:border-gray-500 hover:bg-gray-100 focus:outline-none">
        Add Admin
      </button> */}
      <form className="mb-10 w-full max-w-md">
        <div className="flex items-center border-b border-primary-red py-2">
          <input
            className="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter email here"
            aria-label="Email"
            value={addEmail}
            onChange={handleAddEmail}
            onKeyDown={handleKeyDown}
          />
          <button
            className="flex-shrink-0 rounded border-4 border-primary-red bg-primary-red px-2 py-1 text-sm text-white hover:border-red-600 hover:bg-red-600"
            type="button"
            onClick={submitAdmin}
          >
            Add admin member
          </button>
        </div>
        {successMessage && (
          <div className="mt-2 text-green-600">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mt-2 text-red-600">{errorMessage}</div>
        )}
      </form>

      <div className="mb-4 text-lg text-primary-red">
        Current admin members:
      </div>

      <div>
        <div>
          {emails.length > 0 ? (
            emails.map((id) => (
              <div className="mb-2" key={id}>
                {id}
              </div>
            ))
          ) : (
            <div>No document IDs found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
