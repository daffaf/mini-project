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