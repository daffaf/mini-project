export const ButtonFill = ({ children }: any) => {
  return (
    <button className="w-full p-3 text-xl font-bold text-white bg-yellow-300 rounded-3xl ">{children}</button>
  )
}
export const ButtonOutline = ({ children }: any) => {
  return (
    <button className="w-full p-3 my-3 text-xl font-bold bg-white outline-yellow-300 outline rounded-3xl">{children}</button>
  )
}