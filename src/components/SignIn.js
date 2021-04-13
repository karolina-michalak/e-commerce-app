import React, { useState } from "react";
import FormInput from "../components/FormInput";
import "../scss/SignIn.styles.scss";
import CustomButton from "./CustomButton";
import { auth, signInWithGoogle } from "../firebase/firebase.utils.js";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    try{
      await auth.signInWithEmailAndPassword(email, password)
      setEmail('')
      setPassword('')
    } catch(error){
      console.log(error)
    }
  };

  const handleEmailChange = (e) => {
    // const { value, name } = e.target;
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="sign-in">
      <h2>I already have account</h2>
      <span>Sign in with your e-mail and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          handleChange={handleEmailChange}
          name="email"
          value={email}
          type="email"
          required
          label="email"
        ></FormInput>
        <FormInput
          handleChange={handlePasswordChange}
          name="password"
          value={password}
          type="password"
          required
          label="password"
        ></FormInput>
        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>

          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
