'use client'
import { ButtonFill } from "@/components/Button/Button"
import Card, { CardEvent } from "@/components/Card/card"
import { FormInputSearch } from "@/components/Form/Form"
import { IconText } from "@/components/Icons/Icon"
import { getEventsByOrganizerId } from "@/lib/event"
import { useAppSelector } from "@/redux/hooks"
import { IEventState } from "@/type/type"
import React, { useRef } from "react"
import { Pagination } from "@nextui-org/react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useDebounce } from "use-debounce"
import { useRouter, useSearchParams } from "next/navigation"
export default function Event() {
  const [isOpen, setIsOpen] = useState(false)
  const [events, setEvents] = useState<IEventState[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const searchParams = useSearchParams()
  const querySearch = searchParams.get('search')
  const [search, setSearch] = useState<string>(querySearch || '')
  const searchRef = useRef<HTMLInputElement | null>(null)
  const [value] = useDebounce(search, 1000)

  const router = useRouter()

  const organizer = useAppSelector((state) => state.organizer)
  const user = useAppSelector((state) => state.user)
  const toogle = () => {
    setIsOpen(!isOpen)
    console.log(`is open is ${!isOpen}`);
  }

  const getEvent = async (page: number) => {
    try {
      const limitPerPage = 3
      const sortBy = 'id'
      if (search) {
        router.push(`?limit=${limitPerPage}&sortBy=${sortBy}&sortOrder=asc&search=${search}`)
      }
      const { events, ok, total } =
        await getEventsByOrganizerId(organizer.id, page, limitPerPage, 'id', search);
      if (!ok) throw 'failed get event'
      setEvents(events)
      console.log(events)
      setTotalPages(Math.ceil(total / limitPerPage))
    } catch (err) {
      console.log(`event err : ${err}`)
    }
  }
  useEffect(() => {
    getEvent(currentPage)
  }, [currentPage, value])

  const handlePagination = (page: number) => {
    setCurrentPage(page)
    getEvent(page)
  }

  const handleSearch = () => {
    if (searchRef.current) {
      setSearch(searchRef.current.value)
    }
  }

  const toogleMenu = ["Semua Event", "Draf", "Tayang", "Berakhir"]
  return (
    <section className="flex flex-col items-center w-full h-screen p-3">
      <div className="flex flex-col items-start w-full">
        <div className="w-full p-3 text-white bg-yellow-500 rounded-md cursor-pointer hover:bg-yellow-500">
          <Link href={`dashboard/event`}>
            <IconText icon="calendar_month" text="Daftar Event" />
          </Link>
        </div>
        <div className="w-full p-3 rounded-md cursor-pointer hover:bg-yellow-500">
          <Link href={`dashboard/analytics`}>
            <IconText icon="calendar_month" text="Analitik Event" />
          </Link>
        </div>
      </div>
      <div className="flex flex-row w-full gap-2" onClick={toogle}>
        <p className="underline-offset-4 ">Semua Event</p>
        <span className="font-material-symbols-outlined">keyboard_arrow_down</span>
      </div>
      <div className={`w-1/2 list-none ${isOpen ? "block" : "hidden"}`}>
        {
          toogleMenu.map((item) => (
            <li key={item}>{item}</li>
          ))
        }
      </div>
      <div className="w-full space-y-5">
        <Link href={'dashboard/create-event'}>
          <ButtonFill>&#43; Buat Event</ButtonFill>
        </Link>
        {/* <FormInputSearch
          icon="search"
          placeholder="Cari Event"
          ref = {searchRef}
        /> */}
        <input
          type="search"
          onChange={handleSearch}
          ref={searchRef}
          placeholder="Search Event Name"
          defaultValue={value}
          className="w-full p-3 border border-gray-500 rounded-md"
        />
        {
          events.map((event) => {
            return (
              <CardEvent
                id={event.id}
                name={event.eventName}
                date={event.eventDate}
                location={event.location.city}
                status={event.eventStatus}
                ticketPrice={event.ticketPrice}
                ticketQty={event.ticketQuantity}
                ticketSold={event.ticketSold}
                key={event.id}
                statusColor={
                  `${event.eventStatus === "Inactive" ? 'bg-red-500' : 'bg-green-400'}`
                }
              />
            )
          })
        }
      </div>
      <div className="w-full text-right">Pagination 1,2..5</div>
      <div className="flex flex-row items-center">
        <Pagination
          variant="light"
          total={totalPages}
          initialPage={currentPage}
          onChange={(page) => handlePagination(page)}
        />
      </div>
    </section>
  )
}
