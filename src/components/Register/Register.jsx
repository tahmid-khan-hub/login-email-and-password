import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [errMeassage, setErrMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleRegister = (e) => {

    e.preventDefault();


    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    console.log(email, password);

    setSuccess(false);
    setErrMessage("");

    if(terms === false){
        setErrMessage('please accept our terms and condition');
        return;
    }

    // const passwordRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    const passwordDigit = /(?=.*\d)/;
    const passwordLowerCase = /(?=.*[a-z])/;
    const passwordUpperCase = /(?=.*[A-Z])/;

    if (password.length < 8) {
      setErrMessage("password must have a length of 8 characters or longer");
      return;
    } else if (passwordDigit.test(password) === false) {
      setErrMessage("password must have one digit");
      return;
    } else if (passwordLowerCase.test(password) === false) {
      setErrMessage("password must have one (a-z) lowercase letter");
      return;
    } else if (passwordUpperCase.test(password) === false) {
      setErrMessage("password must have one (A-Z) uppercase letter");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        // setSuccess(true);


        // email verify
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            setSuccess(true);
            alert('we sent you verify email. Please check it');
        })

        // update profile
        const profile = {
          displayName: name,
          photoURL: photo
        }

        updateProfile(auth.currentUser, profile)
        .then(()=>{
          console.log('user profile uploaded');
        })
        .catch((err)=>{
          console.log(err);
        })

      })
      .catch((err) => {
        console.log(err);
        setErrMessage(err.message);
      });
  };

  return (
    <div className="max-w-sm p-4 border mx-auto rounded-xl mt-12">
      <h2 className="mb-5 text-2xl font-semibold">Please Register</h2>
      <form className="" onSubmit={handleRegister}>


        {/* name */}
        <input type="text" name="name" className="input" placeholder="your name" />

        {/* photo url */}
        <input type="text" name="photo" className="input my-5" placeholder="your photo URL" />

        {/* email */}
        <div className="mb-5">
          <div>
            <label className="input validator join-item">
              
              <input
                type="email"
                name="email"
                placeholder="mail@site.com"
                required
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>
        </div>

        {/* password */}
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            name="password"
            className="input"
            placeholder="Password"
          />
          <button
            onClick={() => setShow(!show)}
            className="btn btn-xs absolute top-1.5 right-8"
          >
            {show ? <FaRegEye></FaRegEye> : <FaRegEyeSlash></FaRegEyeSlash>}
          </button>
        </div>

        <label className="label mt-5">
          <input type="checkbox" name="terms" className="checkbox" />
          accept terms and conditions
        </label> <br />

        {/* submit */}
        <input className="btn btn-primary mt-5" type="submit" value="submit" />
      </form>

        <p className="mt-5">Already have an account? Please <Link className="text-blue-500 underline" to="/login">Login</Link> </p>

      {errMeassage && <p className="text-red-400 mt-5">{errMeassage}</p>}
      {success && (
        <p className="text-green-500 mt-5">User has created Successfully</p>
      )}
    </div>
  );
};

export default Register;
