import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";
import { Link } from "react-router";

const Login = () => {

    const [success, setSuccess] = useState(false)
    const [errMeassage, setErrMessage] = useState('');

    const handleLogin = (e) =>{
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        setSuccess(false)
        setErrMessage('');

        signInWithEmailAndPassword(auth, email, password)
        .then(res =>{
            console.log(res);
            setSuccess(true)
        })
        .catch(err =>{
            console.log(err);
            setErrMessage(err.message)
        })

    }

  return (
    
        <div className="card bg-base-100 w-full max-w-sm mx-auto mt-16 shrink-0 shadow-2xl">
          <div className="card-body">
          <h1 className="text-3xl font-bold">Login now!</h1>
            <form onSubmit={handleLogin} className="fieldset">
              <label className="label">Email</label>
              <input type="email" name="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" name="password" className="input" placeholder="Password" />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </form>

            <p>new to this website? Please <Link className="text-blue-500 underline" to="/register">Register</Link></p>

            {
                success && <p className="text-green-500">Login Successfully</p>
            }


            {
                errMeassage && <p className="text-red-500">{errMeassage}</p>
            }
          </div>
        </div>
      
  );
};

export default Login;
<h2>login</h2>;
