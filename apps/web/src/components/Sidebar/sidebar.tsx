'use client'
import React, { useState } from "react"
import { ButtonFill, IconButtonFill } from "../Button/Button"
import { IconText } from "../Icons/Icon"
import Link from "next/link"
import Card from "../Card/card"


export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toogle = () => {
    setIsOpen(!isOpen)
    console.log(`is open is ${!isOpen}`);
  }
  const sidebarMenu = [
    { icon: "groups", text: "Daftar Peserta", link: "/dashboard/event/1/attendees" },
    { icon: "bar_chart_4_bars", text: "Analitik Event", link: "/dashboard/event/1/analytics" },
    { icon: "chat_bubble", text: "Ulasan Event", link: "/dashboard/event/1/review" },
    { icon: "receipt_long", text: "Laporan Penjualan", link: "/dashboard/event/1/sales-report" },
  ]
  const sidebarMenuList = [
    { name: "Informasi Event", link: "/dashboard/event/1" },
    { name: "Tiket Event", link: "/dashboard/event/1/tickets" },
    { name: "Formulir Pemesanan", link: "/" },
    { name: "Informasi Tambahan", link: "/" }
  ]

  return (
      <div className="flex flex-row gap-3">
        <div className="w-full p-3 shadow-md">
          <div className="flex flex-row items-center justify-between w-full p-3 font-semibold rounded-md cursor-pointer hover:bg-blue-300"
            onClick={toogle}
          >
            <IconText icon="edit_square" text=" Kelola Event" />
            <span className="text-2xl font-material-symbols-outlined">expand_more</span>
          </div>
          {/* Sidebar Menu Kelola Event */}
          <div className={`list-none ${isOpen ? "block" : "hidden"}`}>
            {
              sidebarMenuList.map((item) => (
                <Link key={item.name} href={item.link}>
                  <li className="w-full p-3 text-sm hover:bg-blue-300 hover:rounded-md">{item.name}</li>
                </Link>
              ))
            }
          </div>
          {
            sidebarMenu.map((sidebar) => (
              <Link href={sidebar.link} key={sidebar.link}>
                <div className="w-full p-3 font-semibold rounded-md cursor-pointer hover:bg-blue-300" key={sidebar.text}>
                  <IconText icon={sidebar.icon} text={sidebar.text}></IconText>
                </div>
              </Link>
            ))
          }
        </div >
      </div>
  )
}

export const SidebarContent = ({ children, title = "" }: any) => {
  return (
    <div className="p-3 border border-gray-300 rounded-md">
      <h1 className="text-gray-500">{title}</h1>
      <div className="w-full mt-2 mb-4 border border-gray-300 border-b-1 "></div>
      <div>{children}</div>
    </div>
  )
}