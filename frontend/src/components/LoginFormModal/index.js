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
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
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
        {errors.credential && <p>{errors.credential}</p>}
        <div>
        <button onClick={demouser1handleSubmit}>Demo User 1</button>
        <button onClick={demouser2handleSubmit}>Demo User 2</button>
        </div>
        
      </form>
    </>
  );
}

export default LoginFormModal;
