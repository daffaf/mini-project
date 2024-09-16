export const DashboardOutlineCard = ({ children }: any) => {
  return (
    <div className="p-5 my-5 border border-gray-200 rounded-xl">
      <div className="flex flex-row items-center gap-5">
        {children}
      </div>
    </div>
  )
}
export const OutlineCard = ({ children }: any) => {
  return (
    <div className="p-5 my-5 border border-gray-200 rounded-xl">
      <div className="flex flex-col items-center gap-5">
        {children}
      </div>
    </div>
  )
}