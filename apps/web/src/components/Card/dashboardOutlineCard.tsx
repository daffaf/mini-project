export const DashboardOutlineCard = ({children} : any)=>{
  return (
    <div className="p-5 my-5 border border-yellow-200 rounded-xl">
      <div className="flex flex-row items-center gap-5">
        {children}
      </div>
    </div>
  )
}