import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { login } from "../services/user";
import styles from "../styles/Login.module.scss";

interface Props {}

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

const Login: React.FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const mutation = useMutation((credentials: FormValues) => login(credentials));

  if(mutation.isSuccess){
    console.log(mutation.data?.data);
  }

  return (
    <form
      className={styles.inputContainer}
      onSubmit={handleSubmit((formValues) => {
        mutation.mutate(formValues, {
          onError: (errors: any) => {
            errors.response.data.errors.forEach((err: any) => {
              setError(err.field, { type: "server", message: err.message });
            });
          },
        });
      })}
    >
      <div className="field">
        <label className="label">Username</label>
        <div className="control has-icons-left">
          <input
            className="input"
            placeholder="Username"
            type="text"
            {...register("usernameOrEmail", { required: true })}
          />
          <span className="icon is-left">
            <i className="bi bi-person-fill"></i>
          </span>
        </div>
        <p className="help is-danger">
          {errors.usernameOrEmail && errors.usernameOrEmail.message}
        </p>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left">
          <input
            className="input"
            placeholder="Username"
            type="password"
            {...register("password", { required: true })}
          />
          <span className="icon is-left">
            <i className="bi bi-key-fill"></i>
          </span>
        </div>
        <p className="help is-danger">
          {errors.password && errors.password.message}
        </p>
      </div>

      <button className={`button is-primary ${styles.loginBtn}`}>Log In</button>
    </form>
  );
};

export default Login;
