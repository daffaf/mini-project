import Link from "next/link"
import { IconText } from "../Icons/Icon"
import React from "react"

export default function Card({ children }: any) {
  return (
    <div className="w-11/12 p-5 my-5 space-y-3 rounded-md shadow-md">{children}</div>
  )
}
interface CardEventProps {
  id: number
  name: string
  date: string
  location: string
  eventImg: string
  status: string,
  ticketPrice: number,
  ticketQty?: number,
  ticketSold?: number,
  statusColor?: string
}
export const CardEvent: React.FC<CardEventProps> = ({
  id = 0,
  name = '',
  date = '',
  eventImg = '',
  location = '',
  ticketPrice = '',
  ticketQty = '',
  ticketSold = '',
  status = '',
  statusColor = ''
}) => {
  return (
    <div className="flex flex-col max-w-full gap-0 my-5 border rounded-md sm:w-full lg:w-fit ">
      <div className="relative p-0 mx-0">
        <span className="absolute flex items-center justify-center w-6 h-6 text-white bg-blue-400 rounded-full font-material-symbols-outlined top-2 left-2">videocam</span>
        <span className="absolute flex items-center justify-center w-6 h-6 text-white bg-blue-400 rounded-full font-material-symbols-outlined top-2 left-9">lock</span>
        <span className={`absolute flex items-center justify-center px-1 font-semibold rounded-md h-fit w-fit top-2 right-2 text-white ${statusColor}`}>{status}</span>
      </div>
      {/* <Image src="" width={80} height={80} alt="user-profile" /> */}
      <img
        src={eventImg}
        alt="event-image"
        className="bg-cover rounded-tl-md rounded-tr-md"
      />

      <div className="p-3 space-y-2">
        <p className="text-xl font-semibold">{name}</p>
        <IconText icon="date_range" text={date} />
        <IconText icon="location_on" text={location} />
        <IconText icon="payments" text={`Rp. ${ticketPrice}`} />
        <IconText icon="confirmation_number" text={`${ticketSold} / ${ticketQty} Tiket Sold`} />
        <div className="flex flex-row">
          <IconText icon="edit_square" iconClass="text-xl" color="text-blue-500" text="" />
          <IconText icon="check" iconClass="text-xl" color="text-teal-500" text="" />
        </div>
      </div>
    </div>

  )
}