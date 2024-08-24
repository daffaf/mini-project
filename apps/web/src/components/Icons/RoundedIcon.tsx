export const RoundedIcon = ({ children }: any) => {
  return (
    <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full">
      <span className="text-5xl text-gray-500 font-material-symbols-outlined">{children}</span>
    </div>

  )
}