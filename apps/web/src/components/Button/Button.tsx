export const ButtonFill = ({ children }: any) => {
  return (
    <button className="w-full p-2 text-lg font-bold text-white bg-yellow-300 rounded-3xl ">{children}</button>
  )
}
export const IconButtonFill = ({ icon = "", text = "", color = "bg-yellow-300" }: any) => {
  return (
    <div>
      <button className={`flex items-center justify-center w-full gap-2 p-2 text-lg font-bold text-white rounded-3xl ${color}`}>
        <span className="font-material-symbols-outlined">{icon}</span>
        <span>{text}</span>
      </button>
    </div>
  )
}
export const ButtonOutline = ({ children }: any) => {
  return (
    <button className="w-full p-2 my-3 text-lg font-bold bg-white outline-yellow-300 outline outline-2 rounded-3xl">{children}</button>
  )
}