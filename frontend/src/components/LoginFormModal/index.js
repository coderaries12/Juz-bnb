import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch} from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
    .then(closeModal)
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demouser1handleSubmit= (e) => {
   e.preventDefault()
   return dispatch(sessionActions.login({ credential:"Demo-lition", password:"password" }))
    .then(closeModal)
  }
  const demouser2handleSubmit= (e) => {
    e.preventDefault()
    return dispatch(sessionActions.login({ credential:"FakeUser1", password:"password2" }))
     .then(closeModal)
   }

  return (
    <div className="login-modal-div">
      <h1 id="login-heading">Log In</h1>
      <form id="login-form" onSubmit={handleSubmit}>
      {errors.credential && <p className="login-errors">{errors.credential}</p>}
        <label>
        Username or email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
        Password  
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        
        <div className="logins-button">
        <button className="login-button" onClick={handleSubmit}> Log In </button>
        <button className="demo-user1" onClick={demouser1handleSubmit}>Demo User 1</button>
        <button  className="demo-user2" onClick={demouser2handleSubmit}>Demo User 2</button>
        </div>
        
      </form>
    </div>
  );
}

export default LoginFormModal;
