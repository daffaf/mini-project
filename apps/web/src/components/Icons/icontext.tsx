export const IconText = ({icon , text} : any) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <span className="text-xl font-material-symbols-outlined">{icon}</span>
      <p>{text}</p>
    </div>
  )
}