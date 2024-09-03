'use client'
import { ButtonFill } from "@/components/Button/Button"
import Card, { CardEvent } from "@/components/Card/card"
import { FormInputSearch } from "@/components/Form/Form"
import { IconText } from "@/components/Icons/Icon"
import { useState } from "react"

export default function Event() {
  const [isOpen, setIsOpen] = useState(false)
  const toogle = () => {
    setIsOpen(!isOpen)
    console.log(`is open is ${!isOpen}`);
  }
  const toogleMenu = ["Semua Event", "Draf", "Tayang", "Berakhir"]
  return (
    <section className="flex flex-col items-center w-full h-screen p-3">
      <div className="flex flex-col items-start w-full">
        <div className="w-full p-3 text-white bg-yellow-500 rounded-md">
          <IconText icon="calendar_month" text="Daftar Event" />
        </div>
        <div className="p-3 rounded-sm">
          <IconText icon="calendar_month" text="Analitik Event" />
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
        <ButtonFill>&#43; Buat Event</ButtonFill>
        <FormInputSearch icon="search" placeholder="Cari Event" />
        <CardEvent
          name="Event 1"
          date="2022-01-01"
          location="Location 1"
          total_tiket="10"
          total_view="10" />
        <CardEvent
          name="Event 2"
          date="2022-01-01"
          location="Location 1"
          total_tiket="10"
          total_view="10" />
      </div>
      <div className="w-full text-right">Pagination 1,2..5</div>
    </section>
  )
}
