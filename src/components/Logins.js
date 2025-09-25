import { useState,useRef } from "react"
import Headers from "./Headers"
import { checkValidData } from "../utills/validate";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utills/firebase";
import {useNavigate } from "react-router-dom";


const Logins = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage]= useState(null);
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data

    console.log(email.current.value);
    console.log(password.current.value);

    const message = checkValidData(email.current.value, password.current.value);  
    setErrorMessage(message);

    if (message) return;
    
    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/112851100?v=4",
            }).then(() => {
              navigate("/browse");
            }).catch((error) => {
              setErrorMessage(error.message);
            });
                       
     })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });

    }
    else {
      // Sign In Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
    }
    
  };
  
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
      <Headers />
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/0b0dad79-ad4d-42b7-b779-8518da389976/web/IN-en-20250908-TRIFECTA-perspective_0647b106-80e1-4d25-9649-63099752b49a_large.jpg" alt="logo"/>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="w-[30%] absolute p-12 bg-black my-24 mx-auto right-0 left-0 text-white bg-opacity-75">
        <h1 className="font-bold text-3xl py-4">{isSignInForm? "Sign In": "Sign Up"}</h1>
        {!isSignInForm && (<input type="text" placeholder="Full Name" required className="p-4 my-3 w-full rounded bg-zinc-900 border" />)}
        <input ref={email} type="text" placeholder="Email or mobile number" className="p-4 my-3 w-full rounded bg-zinc-900 border"/>
        <input ref={password} type="password" placeholder="Password" className="p-4 my-3 w-full rounded bg-zinc-900 border"/>
        <p className="text-red-500 text-lg py-2">{errorMessage}</p>
        <button className="p-2 my-3 bg-red-700 font-bold w-full rounded" onClick={handleButtonClick}>{isSignInForm? "Sign In": "Sign Up"}</button>
        <p className="py-6 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm? "New to Netflix? Sign Up Now.":"Already registerd? Sign In Now." }</p>
      </form>
    </div>
    
  )
}

export default Logins;
