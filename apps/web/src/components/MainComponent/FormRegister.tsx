'use client'
import { ButtonFill } from "@/components/Button/Button";
import { OutlineCard } from "@/components/Card/dashboardOutlineCard";
import { FormDropDown } from "@/components/Form/FormDropDown";
import { FormField } from "@/components/Form/FormField";
import { FormFieldImage } from "@/components/Form/FormFieldImage";
import { registerUser } from "@/lib/user";
import { IUserReg } from "@/type/type";
import { first, values } from "cypress/types/lodash";
import { ErrorMessage, FormikHelpers, useFormik } from "formik";
import React from "react";
import * as yup from 'yup'
import { ErrorMsg } from "../Form/ErrorMsg";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const validationRegister = yup.object().shape({
  firstname: yup.string().required("firstname is required"),
  lastname: yup.string().required("lastname is required"),
  email: yup.string().email().required("email is required").max(50),
  password: yup.string().min(8).required("password must be at least 8 characters"),
  role: yup.string().required("role is required"),
  userImg: yup.string().required(),
  referallCode: yup.string().min(6),
  organizerName: yup.string(),
  organizerImg: yup.string(),
})
const initialValues: IUserReg = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  role: "",
  userImg: undefined,
  referallCode: "",
  organizerName: "",
}
export const RegisterForm = () => {
  const router = useRouter()

  const handleRegister = async (data: IUserReg, action: FormikHelpers<IUserReg>) => {
    try {
      const { result, ok } = await registerUser(data)
      if (!ok) throw result
      router.push('/login')
      action.resetForm()
      toast.success(result.msg)
    } catch (err) {
      toast.error(err as string)
      console.log(err);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: validationRegister,
    onSubmit: (values, action) => {
      handleRegister(values, action)
    }
  });



  console.log(formik.values)
  return (
    <div className="sm:w-full lg:w-1/4">
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
          <FormField
            name="referallInput"
            type="text"
            fieldname="Referall Code"
            placeholder="Insert Referall Code here" formik={formik} />
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

          {
            formik.values.role == "Organizer" ?
              <div className="flex flex-col items-center w-full">
                <FormField
                  name="organizerName"
                  fieldname="Organizer Name"
                  formik={formik}
                  placeholder="Input your organizer name"
                />
              </div>

              : ''
          }
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