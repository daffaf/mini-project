'use client'
import { DatePicker } from "@nextui-org/react"
import React, { useState } from "react"
import { DatePicker as CustomDatePicker } from "@/components/nextui/datepicker";

export const FormInputSearch = ({ icon, placeholder }: any) => {
  return (
    <div className="relative">
      <input
        className="w-full p-3 pl-5 border rounded"
        type="text"
        placeholder={placeholder}
        style={{ fontSize: '14px' }}
      />
      <span className="absolute text-gray-400 transform -translate-y-1/2 font-material-symbols-outlined right-3 top-1/2">
        {icon}
      </span>
    </div>
  )
}
export const FormField = ({ fieldname = '', placeholder = '' }) => {
  return (
    <div>
      <span className="w-full px-4 text-sm">{fieldname}</span>
      <input
        className="w-full p-3 pl-5 border rounded"
        type="text"
        style={{ fontSize: '14px' }}
        placeholder={placeholder}
      />
    </div>
  )
}
export const FormTextArea = ({ fieldname = '', placeholder = '' }) => {
  return (
    <div>
      <span className="w-full px-4 text-sm">Deskripsi Event</span>
      <div className="flex flex-col gap-2">
        <div className="w-full p-3 px-5 border rounded ">
          <div className="flex flex-row gap-5">
            <button className="p-3 px-2 rounded-md outline outline-1 outline-gray-400">b</button>
            <button className="p-3 rounded-md outline outline-1 outline-gray-400">i</button>
            <button className="p-3 rounded-md outline outline-1 outline-gray-400">u</button>
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
interface FormDropDownProps {
  fieldname?: string;
  options: { value: string; label: string }[];
  selectedOption: string;
  onChange: (value: string) => void;
  className?: string;
}
export const FormDropDown: React.FC<FormDropDownProps> = ({
  fieldname = '',
  options,
  selectedOption,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toogle = () => {
    setIsOpen(!isOpen)
    console.log(`is open is ${!isOpen}`);
  }
  const handleSelect = (value: string) => {
    onChange(value)
    setIsOpen(false)
  }
  return (
    <div className={className}>
      {
        fieldname &&
        <span className="w-full px-4 text-sm">{fieldname}
        </span>
      }
      <div className="w-full p-3 pl-5 border rounded cursor-pointer" onClick={toogle}>
        <div className="flex flex-row items-center justify-between">
          <span>
            {
              options.find(option => option.value === selectedOption)?.label || 'Select an option'
            }
          </span>
          <span className="text-2xl font-material-symbols-outlined">expand_more</span>
        </div>
      </div>
      <div className={` w-full p-3 pl-5 border rounded ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-start justify-between gap-3 list-none">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}
export const DateForm = ({ fieldname = "", className = "" }) => {
  return (
    <div className={className}>
      {
        fieldname && (
          <span className="w-full px-4 text-sm">{fieldname}</span>
        )}
      <div className="w-full p-3 px-5 border rounded ">
        <CustomDatePicker />
      </div>
    </div>
  )
}