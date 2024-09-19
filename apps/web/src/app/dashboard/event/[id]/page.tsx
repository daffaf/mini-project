'use client'
import { ButtonFill, ButtonOutline } from "@/components/Button/Button";
import Card from "@/components/Card/card";
import { DashboardOutlineCard, OutlineCard } from "@/components/Card/dashboardOutlineCard";
import { EventFieldImage } from "@/components/Form/EventFormImg";
import { DateForm, FormTextArea } from "@/components/Form/Form";
import { FormField } from "@/components/Form/FormField";
import { FormFieldImage } from "@/components/Form/FormFieldImage";
import RoleProtection from "@/components/Form/UnauthorizedPage";
import { IconText, RoundedIcon } from "@/components/Icons/Icon";
import { DetailEventHeader } from "@/components/Sidebar/DetailEventHeader";
import { Sidebar, SidebarContent } from "@/components/Sidebar/sidebar";
import { getEventById } from "@/lib/event";
import { useAppSelector } from "@/redux/hooks";
import { IEventState } from "@/type/type";
import { format } from "date-fns";
import { Form, Formik, useFormik } from "formik";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as yup from 'yup'
const kategoriOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const validationEvent = yup.object().shape({
  eventName: yup.string().required('event name is required'),
  eventDate: yup.string().required('event date is required'),
  eventImg: yup.string().required('event image is required'),
  eventDescription: yup.string().required('event description is required'),
  eventStart: yup.string().required('event start time is required'),
  eventEnd: yup.string().required('event end time is required'),
  eventStatus: yup.string().required('event status is required'),
  eventType: yup.string().required('event type is required'),
  ticketPrice: yup.string().required('event price is required'),
  ticketQuantity: yup.string().required('event ticket must be at least 1').min(1)
})

const DetailEvent = () => {
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
      formik.setValues({
        eventName: event?.eventName || '',
        eventDate: event?.eventDate || '',
        eventImg: event?.eventImg || '',
        eventDescription: event?.eventDescription || '',
        eventStart: event?.eventStart || '',
        eventEnd: event?.eventEnd || '',
        eventStatus: event?.eventStatus || '',
        ticketPrice: event?.ticketPrice || '',
        ticketQuantity: event?.ticketQuantity || 1,
      })
    } catch (err) {
      console.log(`event err : ${err}`)
    }
  }
  console.log(event)
  console.log(date)
  const initialValues = {
    eventName: '',
    eventDate: '',
    eventImg: '',
    eventDescription: '',
    eventStart: '',
    eventEnd: '',
    eventStatus: '',
    ticketPrice: '',
    ticketQuantity: '',
  }
  const handleUpdate = async () => {

  }
  const formik = useFormik({
    initialValues,
    onSubmit: handleUpdate,
  })
  console.log(initialValues)
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
          <div key={event.id} className="w-full">
            <DetailEventHeader
              eventName={event.eventName}
              eventStatus={event.eventStatus}
            />
            <div className="flex flex-row w-full gap-3">
              <div className="w-1/5">
                <Sidebar />
              </div>
              {/* <div className="">
                
              </div> */}
              <Card>
                <form onSubmit={handleUpdate} className="space-y-5">
                  <FormField
                    name="eventName"
                    fieldname="Judul Event"
                    formik={formik}
                    value={formik.values.eventName}
                  />
                  <FormField
                    name="eventImg"
                    fieldname="Gambar Event"
                    formik={formik}
                    value={formik.values.eventImg}
                  />
                  <div className="flex flex-row items-center justify-center w-full p-3 border rounded-md">
                    {/* <FormFieldImage
                      name="eventImg"
                      formik={formik}
                      initialImage={event?.eventImg}
                    /> */}
                    <EventFieldImage
                      name="eventImg"
                      formik={formik}
                      imageUrl={event?.eventImg}  // Pass the fetched image URL here
                    />
                  </div>
                  <FormField
                    name="eventDescription"
                    fieldname="Deskripsi Event"
                    formik={formik}
                    value={formik.values.eventDescription}
                  />
                  <FormField
                    name="eventStart"
                    fieldname="Jam Mulai"
                    formik={formik}
                    value={formik.values.eventStart}
                  />
                  <FormField
                    name="eventEnd"
                    fieldname="Jam Selesai"
                    formik={formik}
                    value={formik.values.eventEnd}
                  />
                  <FormField
                    name="eventStatus"
                    fieldname="Status Event"
                    formik={formik}
                    value={formik.values.eventStatus}
                  />
                  <FormField
                    name="ticketPrice"
                    fieldname="Harga Tiket"
                    formik={formik}
                    value={formik.values.ticketPrice}
                  />
                  <FormField
                    name="ticketQuantity"
                    fieldname="Ticket Quantity"
                    formik={formik}
                    value={formik.values.ticketQuantity}
                  />
                  <input
                    type="date"
                    value={date || ''}
                    className="w-full p-3 border rounded-md"
                    onChange={handleDate}
                  />
                </form>
              </Card>
            </div>
          </div>
          : ''
      }
    </section >
  )
}
export default RoleProtection(DetailEvent)
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