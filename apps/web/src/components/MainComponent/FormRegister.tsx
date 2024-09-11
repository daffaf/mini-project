'use client'
import { ButtonFill } from "@/components/Button/Button";
import { OutlineCard } from "@/components/Card/dashboardOutlineCard";
import { FormDropDown } from "@/components/Form/FormDropDown";
import { FormField } from "@/components/Form/FormField";
import { FormFieldImage } from "@/components/Form/FormFieldImage";
import { registerUser } from "@/lib/user";
import { IUserReg } from "@/type/user";
import { values } from "cypress/types/lodash";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import * as yup from 'yup'

const validationRegister = yup.object().shape({
  firstname: yup.string().required("firstname is required"),
  lastname: yup.string().required("lastname is required"),
  email: yup.string().email().required("email is required").max(50),
  password: yup.string().min(8).required("password must be at least 8 characters"),
  role: yup.string(),
  userImg: yup.string(),
  referallCode: yup.string().min(6)
})

export const RegisterForm = () => {
  const handleRegister = async (data: IUserReg, action: FormikHelpers<IUserReg>) => {
    try {
      const { result, ok } = await registerUser(data)
      if (!ok) throw result.msg
      action.resetForm()
      console.log(formik.values)
    } catch (err) {
      console.log(err);
    }
  }
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
      userImg: undefined,
      referallCode: "",
    } as IUserReg,
    onSubmit: (values, action) => {
      handleRegister(values, action)
    },
    validationSchema: validationRegister
  });
  console.log(formik.values)
  return (
    <div>
      <h1 className="text-2xl font-semibold">CREATE YOUR ACCOUNT</h1>
      <form onSubmit={formik.handleSubmit}>
        <OutlineCard>
          <FormField
            name="firstname"
            fieldname="firstname"
            formik={formik}
          />
          <FormField
            name="lastname"
            fieldname="lastname"
            formik={formik} />
          <FormField
            name="email"
            type="email"
            fieldname="email"
            formik={formik} />
          <FormField
            name="password"
            type="password"
            fieldname="password"
            placeholder="min 8 character" formik={formik} />
          {/* role */}
          <FormDropDown
            fieldname="role"
            options={[
              { label: "Pilih Role", value: "" },
              { label: "Participant", value: "Participant" },
              { label: "Organizer", value: "Organizer" }
            ]}
            className="w-full"
            formik={formik}
            name="role"
          />
          <FormFieldImage
            name="userImg"
            label="input Image"
            formik={formik}
          />
          <div>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-yellow-500 rounded-md cursor-pointer"
          >
            register
          </button>
        </OutlineCard>
      </form>

    </div>
  )
}