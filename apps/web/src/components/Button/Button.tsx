export const ButtonFill = ({ children }: any) => {
  return (
    <button className="w-full p-2 text-lg font-bold text-white bg-yellow-300 rounded-3xl ">{children}</button>
  )
}
export const ButtonOutline = ({ children }: any) => {
  return (
    <button className="w-full p-2 my-3 text-lg font-bold bg-white outline-yellow-300 outline outline-2 rounded-3xl">{children}</button>
  )
}