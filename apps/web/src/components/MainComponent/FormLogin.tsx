'use client'
import { FormikHelpers, useFormik } from "formik"
import { FormField } from "../Form/FormField"
import { IOrgazinerState, IUserLogin } from "@/type/user"
import { loginUser } from "@/lib/user"
import * as yup from 'yup'
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { OutlineCard } from "../Card/dashboardOutlineCard"
import { useAppDispatch } from "@/redux/hooks"
import { loginAction } from "@/redux/slice/userSlice"
import { createToken } from "@/lib/server"
import { getOrganizerAction } from '@/redux/slice/organizerSlice'
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("email required"),
  password: yup.string()
    .min(8, "password must be at least 8 character")
    .required("password required")
})
export const LoginForm = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleLogin = async (data: IUserLogin, action: FormikHelpers<IUserLogin>) => {
    try {
      const { result, ok } = await loginUser(data)
      if (!ok) throw result.msg
      action.resetForm()
      toast.success(result.msg)
      if (result.ok) {
        dispatch(loginAction(result.user))
      }
      console.log(result, ok)
      createToken(result.token)
      router.push('/dashboard')
      console.log(formik.values)
    } catch (err) {
      console.log(err)
      toast.error(err as string)
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    } as IUserLogin,
    onSubmit: (values, action) => {
      handleLogin(values, action)
    },
    validationSchema: loginSchema
  })
  console.log(formik.values)
  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit}>
        <OutlineCard>
          <FormField
            name="email"
            formik={formik}
            fieldname="Email"
            placeholder="Input Your Email"
          />
          <FormField
            name="password"
            formik={formik}
            fieldname="Password"
            placeholder="Min 8 Characters"
            type="password"
          />
          <button
            type="submit"
            className="w-full p-3 bg-yellow-500 rounded-md cursor-pointer"
          >
            Login
          </button>
        </OutlineCard>
      </form>
    </div>
  )
}