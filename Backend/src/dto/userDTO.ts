import yup from "yup";

export const createUserSchema = yup.object().shape({
  body: yup.object({
    username: yup
      .string()
      .required()
      .min(3, "The username must be at least 3 characters long")
      .max(12, "The username cannot be longer than 12 characters")
      .trim(),
    password: yup
      .string()
      .required()
      .min(4, "The password must be at least 4 characters long")
      .max(20, "The password cannot be longer than 20 characters")
      .trim(),
    email: yup.string().required().email(),
  }),
  param: yup.object({}),
});

export const loginUserSchema = yup.object().shape({
  body: yup.object({
    email: yup.string().required().email().trim(),
    password: yup
      .string()
      .required()
      .min(4, "The password must be at least 4 characters long")
      .max(20, "The password cannot be longer than 20 characters")
      .trim(),
  }),
  param: yup.object({}),
});
