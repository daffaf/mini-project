import { FormikProps } from "formik";
import React from "react";

interface ErrorMsgProps {
  formik: FormikProps<any>
  name: string
}
export const ErrorMsg: React.FC<ErrorMsgProps> = ({ formik, name }) => {
  const error = formik.errors[name]
  const touched = formik.touched[name]

  if (!touched || !error) {
    return null
  }
  if (typeof error === 'string') {
    return <div className="text-base text-red-500">{error}</div>
  }

  return null
}