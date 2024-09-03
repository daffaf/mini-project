export const IconText = ({ icon, iconClass = "", text, textClass= "text-sm",  color = "black", onClick = undefined }: any) => {
  return (
    <div className="flex flex-row items-center gap-3" onClick={onClick}>
      <span className={`font-bold font-material-symbols-outlined ${color} ${iconClass}`}>{icon}</span>
      <p className={textClass}>{text}</p>
    </div>
  )
}

export const RoundedIcon = ({ children }: any) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 rounded-full h-14 w-14">
      <span className="text-4xl text-gray-300 font-material-symbols-outlined">{children}</span>
    </div>
  )
}