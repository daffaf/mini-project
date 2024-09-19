'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect, useState } from "react"
import { deleteToken, getToken } from "@/lib/server"
import Link from "next/link"
import { getOrganizerById } from "@/lib/organizer"
import { IOrgazinerState } from "@/type/type"
import { FormikHelpers } from "formik"
import { getOrganizerAction } from "@/redux/slice/organizerSlice"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
export default function Navbar() {
  const [token, setToken] = useState('')
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }
  const getOrganizerData = async () => {
    if (user.role === "Organizer" && user.id) {
      const response = await getOrganizerById(user.id)
    } else {
      return
    }
  }
  const getDataOrganizer = async () => {
    try {
      const { result, ok } = await getOrganizerById(user.id)
      if (ok) {
        dispatch(getOrganizerAction(result.organizer.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
  const getData = async () => {
    const res = await getToken()
    console.log(res)
    setToken(res as string)
  }
  const user = useAppSelector((state) => state.user)
  const handleLogout = async () => {
    toast.success('Logout success')
    await deleteToken()
    setToken('')
  }
  useEffect(() => {
    getData(),
      getDataOrganizer()
  }, [])

  return (
    <div className="flex items-center w-full h-16 bg-yellow-400">
      <div className="flex flex-row items-center justify-between w-full p-5">
        <h1>Name/Logo</h1>
        {
          token ?
            <div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-row items-center gap-5">
                  <div className="flex items-center justify-center w-32 h-10 font-semibold bg-white rounded-md">Create Event</div>
                </div>
                <div onClick={handleIsOpen} className="rounded-full cursor-pointer h-11 w-11">
                  <img className="object-cover overflow-hidden rounded-full cursor-pointer h-11 w-11" src={user.userImg} alt="" />
                </div>
              </div>

              <div className={`absolute overflow-x-hidden p-3 space-y-3 bg-yellow-400 rounded-md top-20 right-5 z-30 ${isOpen ? 'block' : 'hidden'}`}>
                <div className="flex flex-row items-center gap-3">
                  <div className="">
                    <img className="object-cover overflow-hidden rounded-full cursor-pointer h-11 w-11" src={user.userImg} alt="" />
                  </div>
                  <div>
                    <p className="text-xl">{user.firstname} {user.lastname}</p>
                    <p>{user.role}</p>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="border border-gray-200 border-b-1"></div>
                <p className="p-2 hover:bg-white hover:rounded-md">
                  <Link href={'/dashboard'}>Dashboard</Link>
                </p>
                <p className="p-2 hover:bg-white hover:rounded-md">
                  <Link href={'/profile'}>Profile</Link>
                </p>
                <div className="border border-gray-200 border-b-1"></div>
                <p className="p-2 hover:bg-white hover:rounded-md" onClick={handleLogout}>
                  <Link href={'/login'}>Logout</Link>
                </p>
              </div>
            </div>
            :
            <div className="flex flex-row gap-3">
              <div className="flex items-center justify-center w-20 h-10 font-semibold bg-white rounded-md">
                <Link href={'/login'}>Login</Link>
              </div>
              <div className="flex items-center justify-center w-20 h-10 font-semibold bg-white rounded-md">
                <Link href={'/register'}>Register</Link>
              </div>
            </div>
        }
      </div>
    </div>
  )
}


{/* {
            user && user.role === "Organizer" ?
              <div className="flex flex-row gap-3">
                <Link href={''}>
                  <p>Create Event</p>
                </Link>
                <Link href={'/dashboard'} onClick={getData}>
                  <p>Dashboard</p>
                </Link>
              </div>
              : ''
          }
           */}