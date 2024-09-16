import * as yup from "yup";

import { InitialValues } from "./types";

import { REGEX } from "constants/constants";

const useValidationSchema = () => {
  const initialValues: InitialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("This field is required")
      .matches(REGEX.passwordAndUsername, "Must contain 5 characters or more"),
    password: yup
      .string()
      .required("This field is required")
      .matches(REGEX.passwordAndUsername, "Must contain 5 characters or more"),
  });

  return { validationSchema, initialValues };
};

export default useValidationSchema;
