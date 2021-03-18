import React from 'react';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
} else{
  firebase.app()
}

function App() {
  const [user,setUser] = useState({})

  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var githubProvider = new firebase.auth.GithubAuthProvider();

  const handleGoogleSignIn =() =>{
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
   
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    setUser(user)
  }).catch((error) => {
    
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
      
  });

  }

  const handleFacebookSignIn =()=>{
      firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    var user = result.user;
    setUser(user)

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    

  });

  }

  const handleGithubSignIn =() =>{
    firebase
  .auth()
  .signInWithPopup(githubProvider)
  .then((result) => {
   
    var credential = result.credential;

    var token = credential.accessToken;

    var user = result.user;
   
    setUser("github user", user)
     console.log(user)

  }).catch((error) => {
   
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode,errorMessage,email)
    
  });

  }

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}> Sign in with google</button>
     
      <h2>Name: {user.email}</h2>
     <img src={user.photoURL} alt=""/>
      <h2>Name: {user.displayName}</h2>
       <button onClick={handleFacebookSignIn}> Sign in with facebook</button>
       <button onClick={handleGithubSignIn}> Sign in with github</button>
    </div>
  );
}

export default App;
