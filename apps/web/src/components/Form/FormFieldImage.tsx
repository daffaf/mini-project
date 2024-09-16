"use client"

import { FormikProps } from "formik"
import Image from "next/image"
import React, { useRef, useState } from "react"

interface FieldImageProps {
  name: string
  label?: string
  formik: FormikProps<any>
  className?: string
}

export const FormFieldImage: React.FC<FieldImageProps> = ({ name, label, formik, className }) => {
  const imgRef = useRef<HTMLInputElement | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    console.log(file)
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewUrl(imageUrl)
      formik.setFieldValue(name, file)
    }
  }
  const handleResetImg = () => {
    if (imgRef.current) {
      imgRef.current.value = ""
    }
  }
  return (
    <div>
      <label htmlFor={name} className="">{label}</label>
      <input
        type="file"
        id={name}
        name={name}
        className={`hidden`}
        ref={imgRef}
        onChange={handleChange}
      />
      {!previewUrl && (
        <div
          onClick={() => imgRef.current?.click()}
          className="flex w-[100px] justify-center items-center border border-gray-500 border-dashed rounded-md cursor-pointer"
        >
          +
        </div>
      )}
      {previewUrl && (
        <div
          onClick={() => imgRef.current?.click()}
          className="flex w-[100px] justify-center items-center border border-gray-500 border-dashed rounded-md cursor-pointer"
        >
          <Image
            src={previewUrl}
            alt="preview"
            width={150}
            height={150}
            layout="responsive"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  )
}