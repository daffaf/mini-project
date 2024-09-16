'use client'
import Card from "@/components/Card/card";
import { useAppSelector } from "@/redux/hooks";

export default function UsersView() {
  const user = useAppSelector((state) => state.user)
  const listSidebar = [
    { user: 'user' },
    { user: 'user' },
    { user: 'user' },
    { user: 'user' },
  ]
  return (
    <section className="px-10">
      <div className="flex flex-row w-full gap-5 mt-10 ">
        <div className="rounded-md shadow-md w-80 h-fit">
          <ul className="flex flex-col items-center justify-center w-full">
            {listSidebar.map((sidebar) => {
              return (
                <li className="w-full p-3 rounded-md cursor-pointer hover:bg-yellow-500">
                  {sidebar.user}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="w-full h-screen shadow-md">
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
        </div>
      </div>
    </section>
  )
}