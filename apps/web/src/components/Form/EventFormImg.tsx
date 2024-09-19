import { useRef, useState } from "react";

interface FormFieldImageProps {
  name: string;
  formik: any;
  imageUrl?: string;  // Add this prop for the fetched image URL
}

export const EventFieldImage: React.FC<FormFieldImageProps> = ({ name, formik, imageUrl }) => {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(imageUrl || null); // Start with the fetched image URL if available

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]; // Safely check for the file
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      formik.setFieldValue(name, file); // Set file in formik
    }
  };

  return (
    <div>
      <label htmlFor={name}></label>
      <input
        type="file"
        id={name}
        name={name}
        ref={imgRef}
        className="hidden"
        onChange={handleChange}
      />

      <div
        onClick={() => imgRef.current?.click()}
        className="rounded-md cursor-pointer "
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="object-cover w-full h-64 rounded-md" />
        ) : (
          <div className="flex items-center justify-center w-full h-64 text-gray-500">
            <span>Click to upload image</span>
          </div>
        )}
      </div>
    </div>
  );
};
