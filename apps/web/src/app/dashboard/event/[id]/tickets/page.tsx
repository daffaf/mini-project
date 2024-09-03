'use client'
import { FormDropDown, FormInputSearch } from "@/components/Form/Form";
import { IconText } from "@/components/Icons/Icon";
import { EventsTicket } from "@/components/Sidebar/eventsTicket";
import { Sidebar, SidebarContent } from "@/components/Sidebar/sidebar";
import { useState } from "react";

export default function Tickets() {
  const [filterTicket, setFilterTicket] = useState("")

  const filterTicketOptions = [
    { value: "Pilih Semua", label: "Pilih Semua" },
    { value: "Siap Tayang", label: "Siap Tayang" },
    { value: "Batal Tayang", label: "Batal Tayang" },
    { value: "Tiket Habis", label: "Tiket Habis" },
    { value: "Sedang Dijual", label: "Sedang Dijual" },
  ]
  const handleTicketFilter = (value: string) => {
    setFilterTicket(value)
  }

  return (
    <section className="p-3">
      <Sidebar />
      <SidebarContent title="TIKET EVENT">
        <div className="flex flex-col w-full gap-3">
          <FormInputSearch icon="search" placeholder="Cari Nama Tiket" />
          <FormDropDown
            onChange={handleTicketFilter}
            options={filterTicketOptions}
            selectedOption={filterTicket}
          />
        </div>
        <h1>Daftar Tiket</  h1>
        <EventsTicket />
      </SidebarContent>
    </section>
  )
}