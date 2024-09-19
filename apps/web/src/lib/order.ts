import { ok } from "assert"
import { getToken } from "./server"

export const getOrderByUserId = async (
  userId: number
) => {
  const res = await fetch(`http://localhost:8000/api/orders/user/${userId}`)
  const resultUser = await res.json()
  return {
    resultUser,
    ok: res.ok
  }
}
interface IEventOrder {
  order: any[]
}
export const getOrderByOrganizerId = async (
  organizerId: number,
) => {
  const token = await getToken()
  const res = await fetch(`http://localhost:8000/api/orders/organizer/${organizerId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const resultOrganizer = await res.json()
  return {
    result: resultOrganizer.order.data,
    order: resultOrganizer.order.data,
    ok: res.ok
  }
}

// export const getOrderByUserId = async (
//   userId: number
// )=>{
//   const token = await getToken()
// }