import { FormikProps } from "formik";
import { useState } from "react";

interface Option {
  value: string
  label: string
}
interface FormDropDownProps {
  fieldname?: string;
  options: Option[];
  selectedOption?: string;
  className?: string;
  formik: FormikProps<any>
  name: string
}
export const FormDropDown: React.FC<FormDropDownProps> = ({
  fieldname = '',
  options = [],
  selectedOption = '',
  className = '',
  formik,
  name
}) => {

  const [isOpen, setIsOpen] = useState(false)
  const toogle = () => {
    setIsOpen(!isOpen)
    console.log(`is open is ${!isOpen}`);
  }
  const handleSelect = (value: string) => {
    formik.setFieldValue(name, value)
    setIsOpen(false)
    console.log(formik.setFieldValue(fieldname, value))
  }
  const optionSelectLabel = options.find(option =>
    option.value === formik.values[fieldname])?.label ||
    'Select an option'

  return (
    <div className={className}>
      {
        fieldname &&
        <span className="w-full px-4 text-sm">{fieldname}
        </span>
      }
      {/* Form */}
      <div className="w-full p-2 pl-5 border rounded cursor-pointer" onClick={toogle}>
        <div className="flex flex-row items-center justify-between">
          <span>{optionSelectLabel}</span>
          <span className="text-2xl font-material-symbols-outlined">expand_more</span>
        </div>
      </div>
      {/* Dropdown Form Select */}
      <div className={` w-full border rounded ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-start justify-between gap-3 list-none">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="w-full p-3 pl-5 cursor-pointer hover:bg-blue-400"
            >
              {option.label}
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}