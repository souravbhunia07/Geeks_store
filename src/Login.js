import React, { useState } from 'react';
import './Login.css';
import pic from "./images/geeks-store-logos_black.png";
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';

function Login() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                history.push('/')
            })
            .catch(error => alert(error.message))

        // Firebase Signin/Login
    }

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // It will successfully create a new user with email and password
                // console.log(auth);
                if(auth) {
                    history.push('/');
                }
            })
            .catch(error => alert(error.message))

        // Firebase register
    }

  return (
    <div className='login'>

        <Link to='/'>
            <img className='login_logo' src = {pic} alt = "Logo"/>
        </Link>

        <div className='login_container'>
            <h1>Sign-In</h1>

            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange = {e => setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type='password' value={password} onChange = {e => setPassword(e.target.value)}/>

                <button type='submit' onClick={signIn} className='login_signInButton'>Sign In</button>

                <button onClick={register} className='login_registerButton'>Create Your Account</button>
            </form>
        </div>
    </div>
  )
}

export default Login;