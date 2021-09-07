import { NextPage } from "next";
import { RegisterOptions, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { registerUser } from "../services/user";
import styles from "../styles/Login.module.scss";

interface RegisterFormValues {
  username: string;
  password: string;
  email: string;
}

const Register: NextPage = () => {
  const mutation = useMutation((user: RegisterFormValues) =>
    registerUser(user)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormValues>();

  const usernameValidation: RegisterOptions = {
    required: "Username is required.",
    minLength: { value: 2, message: "Username is too short." },
    maxLength: { value: 20, message: "Maximum length is 20 characters." },
  };

  const emailValidation: RegisterOptions = {
    required: "Email is required.",
    validate: (v: string) => v.includes("@") || "Please enter a valid email.",
  };

  const passwordValidation: RegisterOptions = {
    required: "Password is required.",
    minLength: { value: 4, message: "Password is too short." },
    maxLength: { value: 20, message: "Maximum length is 20 characters." },
  };

  if (mutation.data?.data) {
    console.log(mutation.data.data);
  }

  return (
    <>
      <h2 className="is-size-2 has-text-weight-bold m-4">Register</h2>

      <form
        className={styles.content}
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
              className={`input  ${errors.username ? "is-danger" : ""}`}
              placeholder="Username"
              type="text"
              {...register("username", usernameValidation)}
            />
            <span className="icon is-left">
              <i className="bi bi-at"></i>
            </span>
          </div>
          <p className="help is-danger">
            {errors.username && errors.username.message}
          </p>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left">
            <input
              className={`input  ${errors.email ? "is-danger" : ""}`}
              placeholder="Username"
              type="text"
              {...register("email", emailValidation)}
            />
            <span className="icon is-left">
              <i className="bi bi-envelope-fill"></i>
            </span>
          </div>
          <p className="help is-danger">
            {errors.email && errors.email.message}
          </p>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left">
            <input
              className={`input  ${errors.password ? "is-danger" : ""}`}
              placeholder="Username"
              type="text"
              {...register("password", passwordValidation)}
            />
            <span className="icon is-left">
              <i className="bi bi-key-fill"></i>
            </span>
          </div>
          <p className="help is-danger">
            {errors.password && errors.password.message}
          </p>
        </div>

        <button className={`button is-primary ${styles.loginBtn}`}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default Register;
