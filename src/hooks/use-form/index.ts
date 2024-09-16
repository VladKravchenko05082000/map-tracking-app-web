import { ChangeEvent } from "react";
import { useFormik, FormikConfig, FormikValues } from "formik";

import { FieldProps } from "./types";

const useForm = <Values>(config: FormikConfig<Values & FormikValues>) => {
  const formik = useFormik({
    ...config,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  return {
    ...formik,
    fieldProps<T>(field: T | keyof Values): FieldProps<Values> {
      return {
        ...formik.getFieldProps(field as string),
        onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
          return formik.setFieldValue(field as string, e.target.value);
        },
        onBlur: () => {
          return formik.setFieldTouched(field as string, true);
        },
        onFocus: () => {
          return formik.setFieldTouched(field as string, false);
        },
      };
    },
  };
};

export default useForm;
