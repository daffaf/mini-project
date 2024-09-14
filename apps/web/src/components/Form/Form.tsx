'use client'
import { DatePicker } from "@nextui-org/react"
import React, { useState } from "react"
import { DatePicker as CustomDatePicker } from "@/components/nextui/datepicker";
import { FormikProps } from "formik";

interface FormInputSearchProps {
  icon: string
  placeholder: string
  onChange?: () => void
}
export const FormInputSearch = React.forwardRef<HTMLInputElement, FormInputSearchProps>(
  ({ icon, placeholder, }, ref) => {
    return (
      <div className="relative">
        {/* <input
          className="w-full p-3 pl-5 border rounded"
          type="search"
          ref={ref}
          placeholder={placeholder}
          onChange={onchange}
          style={{ fontSize: '14px' }}
        />
        <span className="absolute text-gray-400 transform -translate-y-1/2 font-material-symbols-outlined right-3 top-1/2">
          {icon}
        </span> */}
      </div>
    )
  })

export const FormTextArea = ({ fieldname = '', placeholder = '' }) => {
  return (
    <div>
      <span className="w-full px-4 text-sm">{fieldname}</span>
      <div className="flex flex-col gap-2">
        <div className="w-full p-3 px-5 border rounded ">
          <div className="flex flex-row gap-5">
            <button className="flex items-center w-10 h-10 p-2 px-2 text-2xl rounded-md outline outline-1 outline-gray-400 font-material-symbols-outlined">format_bold</button>
            <button className="flex items-center w-10 h-10 p-2 text-2xl rounded-md outline outline-1 outline-gray-400 font-material-symbols-outlined">format_italic</button>
            <button className="flex items-center w-10 h-10 p-2 text-2xl rounded-md outline outline-1 outline-gray-400 font-material-symbols-outlined">format_underlined</button>
          </div>
        </div>
        <textarea
          className="w-full h-32 p-3 px-5 border rounded pl-"
          style={{ fontSize: '14px' }}
          placeholder={placeholder}
          name="textarea"
        />
      </div>
    </div>
  )
}


type IDateForm = {
  fieldname: string
  className: string
  value: Date | null
}
export const DateForm = ({ fieldname = "", className = "", value = null }: IDateForm) => {
  return (
    <div className={className}>
      {
        fieldname && (
          <span className="w-full px-4 text-sm">{fieldname}</span>
        )}
      <div className="w-full p-3 px-5 border rounded ">
        {/* <CustomDatePicker color="stone" value={value} /> */}
      </div>
    </div>
  )
}