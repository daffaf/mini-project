import Link from "next/link"
import { IconText } from "../Icons/Icon"

export default function Card({ children }: any) {
  return (
    <div className="w-11/12 p-5 my-5 space-y-3 rounded-md shadow-md">{children}</div>
  )
}
export const CardEvent = ({ id, name, date, location, total_tiket, total_view }: any) => {
  return (
    <Link href={`dashboard/event/${1}`}>
      <div className="flex flex-col max-w-full gap-0 border rounded-md">
        <div className="relative p-0 mx-0">
          <span className="absolute flex items-center justify-center w-6 h-6 text-white bg-blue-400 rounded-full font-material-symbols-outlined top-2 left-2">videocam</span>
          <span className="absolute flex items-center justify-center w-6 h-6 text-white bg-blue-400 rounded-full font-material-symbols-outlined top-2 left-9">lock</span>
          <span className="absolute flex items-center justify-center px-1 font-semibold text-blue-500 bg-blue-100 rounded-md h-fit w-fit top-2 right-2">Draf</span>
        </div>
        {/* <Image src="" width={80} height={80} alt="user-profile" /> */}
        <img
          src="https://www.elementalproduction.com/wp-content/uploads/2021/05/corporate-events.jpg"
          alt="event-image"
          className="bg-cover rounded-tl-md rounded-tr-md"
        >
        </img>
        <div className="p-3 space-y-2">
          <p className="text-xl font-semibold">{name}</p>
          <IconText icon="date_range" text={date} />
          <IconText icon="location_on" text={location} />
          <IconText icon="confirmation_number" text={`${total_tiket} Tiket Terjual`} />
          <IconText icon="person" text={`${total_view} Pengunjung}`} />
          <div className="flex flex-row">
            <IconText icon="edit_square" color="teal" text="" />
            <IconText icon="check" color="teal" text="" />
          </div>
        </div>
      </div>
    </Link>

  )
}