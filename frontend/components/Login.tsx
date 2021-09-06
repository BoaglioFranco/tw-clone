import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/Login.module.scss";

interface Props {}

interface FormValues {
  username: string;
  password: string;
}

const Login: React.FC<Props> = (props) => {
  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <div className={styles.inputContainer}>
      <div className="field">
        <label className="label">Username</label>
        <div className="control has-icons-left">
          <input
            className="input"
            placeholder="Username"
            type="text"
            {...register("username", { required: true })}
          />
          <span className="icon is-left">
            <i className="bi bi-person-fill"></i>
          </span>
        </div>
        {/* <p className="help is-success">This username is available</p> */}
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left">
          <input
            className="input"
            placeholder="Username"
            type="text"
            {...register("password", { required: true })}
          />
          <span className="icon is-left">
            <i className="bi bi-key-fill"></i>
          </span>
        </div>
        {/* <p className="help is-success">This username is available</p> */}
      </div>

      <button className={`button is-primary ${styles.loginBtn}`}>Log In</button>
    </div>
  );
};

export default Login;
