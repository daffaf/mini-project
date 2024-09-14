'use client'
import { ButtonFill, ButtonOutline } from "@/components/Button/Button";
import { DashboardOutlineCard, OutlineCard } from "@/components/Card/dashboardOutlineCard";
import { DateForm, FormTextArea } from "@/components/Form/Form";
import { FormField } from "@/components/Form/FormField";
import { IconText, RoundedIcon } from "@/components/Icons/Icon";
import { Sidebar, SidebarContent } from "@/components/Sidebar/sidebar";
import { getEventById } from "@/lib/event";
import { useAppSelector } from "@/redux/hooks";
import { IEventState } from "@/type/type";
import { DatePicker } from "@nextui-org/react";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const kategoriOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export default function DetailEvent() {
  const [selectedOption, setSelectedOption] = useState('')
  const [event, setEvent] = useState<IEventState>()
  const [date, setDate] = useState<string | null>(null)
  const { id } = useParams()
  const organizer = useAppSelector((state) => state.organizer)

  useEffect(() => {
    if (id) {
      getData(+id)
    }
  }, [id])
  const getData = async (eventId: number) => {
    try {
      const { result, ok, event } = await getEventById(eventId)
      if (!ok) throw 'failed get event data'
      setEvent(event)
      if (event.eventDate) {
        const dateEvent = `${event.eventDate}`
        setDate(format(new Date(dateEvent), 'yyyy-MM-dd'))
      }
    } catch (err) {
      console.log(`event err : ${err}`)
    }
  }
  console.log(event)
  console.log(date)

  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
  }

  console.log(date)
  const handleDropdownChange = (value: string) => {
    setSelectedOption(value);
  };
  return (
    <section className="p-3">
      {
        event ?
          <div key={event.id}>
            <Sidebar
              eventName={event.eventName}
              eventStatus={event.eventStatus}
            />
            {/* <DateForm fieldname="" className="w-full" value={date ? formatDate(new Date(date)) : null} /> */}

            <input
              type="date"
              value={date || ''}
              className="w-full p-3 border border-gray-500 rounded-md"
              onChange={handleDate}
            />
          </div>
          : ''
      }
    </section >




  )
}
{/* <SidebarContent title="INFORMASI EVENT">
        <div className="w-full my-3 space-y-5">
          <FormField fieldname="Nama Event" />
          <FormTextArea fieldname="Deskripsi Event" />
          <FormField fieldname="Kategori" />
          <FormField fieldname="Email" />
          <FormField fieldname="Link Event Anda" />
          <FormDropDown
            fieldname="Kategori"
            options={kategoriOptions}
            selectedOption={selectedOption}
            onChange={handleDropdownChange}
          />
        </div>
        <div className="w-full my-3 space-y-5">
          <h1 className="font-semibold"></h1>
          <FormDropDown
            fieldname="Lokasi"
            options={kategoriOptions}
            selectedOption={selectedOption}
            onChange={handleDropdownChange}
          />
          <FormDropDown
            fieldname="Wilayah"
            options={kategoriOptions}
            selectedOption={selectedOption}
            onChange={handleDropdownChange}
          />
        </div>
        <div className="space-y-5">
          <h1 className="font-semibold">Sesi</h1>
          <span className="w-full px-4 text-sm">Tanggal dan Jam Mulai</span>
          <div className="flex flex-col justify-between gap-2">
            <DateForm fieldname="" className="w-full" value={date ? new Date(date) : null} />
            <FormDropDown
              options={kategoriOptions}
              selectedOption={selectedOption}
              onChange={handleDropdownChange}
              className="w-full"
            />
          </div>
        </div>
        <div className="my-5">
          <ButtonFill>Simpan</ButtonFill>
        </div>
      </SidebarContent> */}