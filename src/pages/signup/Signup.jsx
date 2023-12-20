import React, { useState } from "react";
import Button from "../../ui/Button";
import "./signup.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useCreateSignUp from "../../hook/useCreateSignUp";
import Spinner from "../../ui/spinner";
const initalState = {
  name: "",
  email: "",
  password: "",
};
const Signup = () => {
  const [Form, setForm] = useState(initalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { signupCreate, loading } = useCreateSignUp();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value.trim() }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signupCreate(Form, selectedFile);
  };
  return (
    <div className="Signup">
      <div className="__a">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="__b">
            <label htmlFor="name">Name</label>
            <input
              value={Form.name}
              onChange={handleChange}
              type="text"
              name="name"
              required
            />
          </div>
          <div className="__b">
            <label htmlFor="email">Email</label>
            <input
              value={Form.email}
              onChange={handleChange}
              type="email"
              name="email"
              required
            />
          </div>
          <div className="__b">
            <label htmlFor="password">Password</label>
            <input
              value={Form.password}
              onChange={handleChange}
              type="password"
              name="password"
              required
            />
          </div>
          <div className="__b">
            <input type="file" onChange={handleFile} />
          </div>
          <div className="__b">
            {loading && <Button disabled={loading} text={<Spinner/>}></Button>}
            {!loading && <Button  text={"Sign up"}></Button>}
          </div>
          <div className="__c">
            <span>
              Already You have an account ? <Link to={"/signin"}>Sign in</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
