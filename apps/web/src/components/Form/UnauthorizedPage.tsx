'use client'

import { getToken } from "@/lib/server"
import { useAppSelector } from "@/redux/hooks"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const RoleProtection = (WrappedComponent: any) => {
  return (props: any) => {
    const user = useAppSelector((state) => state.user)
    const router = useRouter()
    const checkUser = async () => {
      const token = await getToken()
      if (!token) {
        router.push('/login')
      } else if (user.role !== 'Organizer') {
        router.push('/unauthorized')
      }
    }
    console.log(user)
    useEffect(() => {
      checkUser()
    }, [checkUser])

    if (user && user.role === 'Organizer') {
      return <WrappedComponent {...props} />
    }
    return null
  }
}
export default RoleProtection