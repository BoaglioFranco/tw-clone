import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { login } from "../services/user";
import { useStore } from "../store/store";
import stl from "../styles/Login.module.scss";

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

  /// FRANCO """"PROGRAMADOR"""""
  /// const setToken = useStore((store) => store.setToken);
  const store = useStore();

  const router = useRouter();

  if (mutation.isSuccess) {
    console.log(mutation.data?.data);
  }

  return (
    <form
      className={stl.inputContainer}
      onSubmit={handleSubmit((formValues) => {
        mutation.mutate(formValues, {
          onSuccess: (res) => {
            store.setToken(res.data.token, res.data.expiresIn);
            store.setUser(res.data.user);
            router.replace("/home");
          },
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

      <button className={`button is-primary ${stl.loginBtn}`}>Log In</button>
    </form>
  );
};

export default Login;
