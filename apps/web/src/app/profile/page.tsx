'use client'

import Card from "@/components/Card/card"
import { DashboardOutlineCard } from "@/components/Card/dashboardOutlineCard"
import { RoundedIcon } from "@/components/Icons/Icon"
import { getOrderByOrganizerId, getOrderByUserId } from "@/lib/order"
import { getToken } from "@/lib/server"
import { getWalletByUserId } from "@/lib/wallet"
import { useAppSelector } from "@/redux/hooks"
import { IEventState } from "@/type/type"
import { event } from "cypress/types/jquery"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type IOrder = {


  id: number
  eventId: number
  eventName: string
  userId: number
  order: {
    id: number
  }
  total: number
}
type IWallet = {
  userId: number
  saldo: number
  point: number
  pointExpired: number
}
const Profile = () => {
  const user = useAppSelector((state) => state.user)
  const organizer = useAppSelector((state) => state.organizer)
  const [listOrder, setListOrder] = useState<IOrder[]>([])
  const [eventSales, setEventSales] = useState([])
  const [userWallet, setUserWallet] = useState<IWallet>()
  const router = useRouter()

  const getData = async () => {
    try {
      const token = await getToken();
      if (!token) {
        router.push('/login')
      }
      console.log("Token:", token);

      const { result } = await getWalletByUserId(user.id)
      setUserWallet(result)
      if (user.role === "Attendees") {
        const { resultUser } = await getOrderByUserId(user.id)
        setListOrder(resultUser)
      }
      if (user.role === "Organizer") {
        const { result, order } = await getOrderByOrganizerId(organizer.id)
        setListOrder(result)
        setEventSales(order)
      }
    } catch (err) {
      console.log(err)
    }
  }
  console.log(listOrder)
  console.log(eventSales)
  console.log(userWallet)

  useEffect(() => {
    getData()
  }, [])
  return (
    <section>
      <div className="flex flex-row justify-center w-full ">
        <div className="w-1/4">
          <Card>
            <div className="space-y-3">
              <img className="object-cover w-32 h-32 overflow-hidden rounded-full cursor-pointer"
                src={user.userImg}
                alt="" />
              <p className="text-2xl font-semibold capitalize">{`${user.firstname} ${user.lastname}`}</p>
              <p>{user.email}</p>
              <p>{user.role}</p>
            </div>
            <div>
              <button className="w-full p-3 bg-yellow-500 rounded-md cursor-pointer">Edit Profile</button>
            </div>
          </Card>
        </div>
        <div className="w-3/4">
          <div>
            <Card>
              <h1 className="text-2xl font-semibold">Informasi Wallet</h1>
              <div className="border border-b-1"></div>
              <div className="grid sm:gap-0 lg:gap-3 sm:grid-cols-1 lg:grid-cols-3">
                <DashboardOutlineCard>
                  <RoundedIcon>payments</RoundedIcon>
                  <div>
                    <p>Saldo</p>
                    <p>{`Rp.${userWallet?.saldo}`}</p>

                  </div>
                </DashboardOutlineCard>
                <DashboardOutlineCard>
                  <RoundedIcon>payments</RoundedIcon>
                  <div>
                    <p>Points</p>
                    <p>
                      {
                        userWallet?.point != 0 ?
                          <div className="flex flex-col text-xs">
                            <span >{userWallet?.point}</span>
                            <span className="text-red-500 ">{userWallet?.pointExpired}</span>
                          </div>
                          :
                          0
                      }
                    </p>
                    {/* <p className="text-xs text-red-500">Point will expired at</p>
                    <p className="text-xs text-red-500">{userWallet?.pointExpired}</p> */}
                  </div>
                </DashboardOutlineCard>
                <DashboardOutlineCard>
                  <RoundedIcon>payments</RoundedIcon>
                  <div>
                    <p>Referall Code</p>
                    <p>{
                      user.referallCode && user.referallUsed === false ?
                        user.referallCode : " "
                    }</p>
                  </div>
                </DashboardOutlineCard>
              </div>
            </Card>
          </div>
          <div>
            <Card>
              <h1 className="text-2xl font-semibold">
                {
                  user.role === "Organizer" ?
                    "History Tiket Sold" :
                    "History Order"
                }
              </h1>
              <div className="border border-b-1"></div>
              <div className="w-full">
                <table className="w-full overflow-x-hidden">
                  <thead className="w-full text-left uppercase">
                    <tr>
                      <th className="px-6 py-3" scope="col">Order ID</th>
                      <th className="px-6 py-3" scope="col">Event Name</th>
                      <th className="px-6 py-3" scope="col">Total Pembayaran</th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {
                      listOrder.map((list, num) => {
                        num + 1
                        return (
                          <tr key={list.id} className="border-gray-300 rounded-md border-b-1 odd:bg-white even:bg-gray-100">
                            <td className="px-6 py-4 font-semibold">{num}</td>
                            <td className="px-6 py-4">{list.eventName}</td>
                            <td className="px-6 py-4">{
                              // list.order.id
                            }</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>

    </section>
  )
}
export default Profile