'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect, useState } from "react"
import { deleteToken, getToken } from "@/lib/server"
import Link from "next/link"
import { getOrganizerById } from "@/lib/organizer"
import { IOrgazinerState } from "@/type/type"
import { FormikHelpers } from "formik"
import { getOrganizerAction } from "@/redux/slice/organizerSlice"
import { stat } from "fs"
export default function Navbar() {
  const [token, setToken] = useState('')
  const dispatch = useAppDispatch()

  const getOrganizerData = async () => {
    if (user.role === "Organizer" && user.id) {
      const response = await getOrganizerById(user.id)
      console.log(response);
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
      console.log(ok)
    } catch (err) {
      console.log(err)
    }
  }
  const getData = async () => {
    const res = await getToken()
    setToken(res || '')
  }
  const user = useAppSelector((state) => state.user)
  const handleLogout = async () => {
    await deleteToken()
    setToken('')
  }
  useEffect(() => {
    getData(),
      getDataOrganizer()
  }, [])
  console.log(user)
  console.log(`${token}`)
  return (
    <div className="flex items-center w-full h-16 bg-yellow-400">
      <div className="flex flex-row items-center justify-between w-full p-5">
        <h1>Name/Logo</h1>
        <div>
          <div className="rounded-full cursor-pointer h-11 w-11 bg-yellow-50">
          </div>
          {
            user.role === "Organizer" ?
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
          {
            token ?
              <div className="absolute p-3 overflow-x-hidden top-16 right-5 bg-yellow-50">
                <ul>
                  <li>{user.firstname} {user.lastname}</li>
                  <li>{user.role}</li>
                  <li>Setting</li>
                  <Link onClick={handleLogout} href={'/login'}>
                    <li className="cursor-pointer">Logout</li>
                  </Link>
                </ul>
              </div>
              : ''
          }

        </div>
      </div>
    </div>
  )
}