import { object, ref, string } from "yup";

export const signUp = object({
  firstName: string()
    .required("First Name is required")
    .min(3, "Minimum number of characters should be 3")
    .max(20, "Exceeded maximum amount of characters"),
  lastName: string()
    .required("Last Name is required")
    .min(3, "Minimum number of characters should be 3")
    .max(20, "Exceeded maximum amount of characters"),
  email: string().required("Email is required").email("Not valid email."),
  password: string()
    .required("Password is required")
    .matches(/[0-9]/, "Must contain at least one numerical value")
    .matches(/[a-z]/, "Must contain at least one lowercase letter.")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/(\W)/, "Must contain at least one special character"),
  confirmPassword: string()
    .required("Please confirm your password")
    .oneOf([ref("password")], "Passwords do not match"),
});

export const login = object({
  email: string().required("Email is required").email("Not valid email."),
  password: string()
    .required("Password is required")
    .matches(/[0-9]/, "Must contain at least one numerical value")
    .matches(/[a-z]/, "Must contain at least one lowercase letter.")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/(\W)/, "Must contain at least one special character"),
});
