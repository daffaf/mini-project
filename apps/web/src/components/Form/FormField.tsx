import { FormikProps } from "formik"

interface FormFieldProps {
  name: string
  fieldname?: string
  type?: string
  formik: FormikProps<any>
  className?: string
  placeholder?: string
}
export const FormField: React.FC<FormFieldProps> = (
  {
    fieldname,
    placeholder,
    name,
    type = "text",
    className,
    formik
  }) => {
  return (
    <div className="w-full">
      {
        fieldname ?
          <span className="w-full px-4 text-sm">{fieldname}</span>
          : ''
      }
      <input
        className="w-full p-3 pl-5 border rounded"
        type={type}
        style={{ fontSize: '14px' }}
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        placeholder={placeholder}
      />
    </div>
  )
}