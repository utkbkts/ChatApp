import React, { useState } from "react";
import Button from "../../ui/Button";
import "../signup/signup.scss";
import { Link } from "react-router-dom";
import useLogin from "../../hook/useLogin";
const SignIn = () => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const {createLogin}=useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
     createLogin(trimmedName,trimmedEmail,trimmedPassword)
  }
  return (
    <div className="Signup">
      <div className="__a">
        <h1>Sign In</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="__b">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" required value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="__b">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="__b">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div className="__b">
            <Button type={"submit"} text={"Sign In"}></Button>
          </div>
          <div className="__c">
            <span>
              Don't have an account ? <Link to={"/signup"}>Sign up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
