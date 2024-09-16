import { ChangeEvent } from "react";
import { FormikValues, FormikErrors } from "formik";

export interface FieldProps<Values> {
  value: string;
  name: string;
  multiple?: boolean | undefined;
  checked?: boolean | undefined;
  onChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => Promise<FormikErrors<Values & FormikValues>> | Promise<void>;
  onBlur: () => Promise<FormikErrors<Values & FormikValues>> | Promise<void>;
  onFocus: () => Promise<FormikErrors<Values & FormikValues>> | Promise<void>;
}
