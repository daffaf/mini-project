'use client'
import { ButtonFill, ButtonOutline } from "@/components/Button/Button";
import Card, { CardEvent } from "@/components/Card/card";
import { DashboardOutlineCard } from "@/components/Card/dashboardOutlineCard";
import { IconText, RoundedIcon } from "@/components/Icons/Icon";
import Navbar from "@/components/Navbar";
import { getEventsByOrganizerId } from "@/lib/event";
import { useAppSelector } from "@/redux/hooks";
import { IEventState } from "@/type/type";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [events, setEvents] = useState<IEventState[]>([])

  const organizer = useAppSelector((state) => state.organizer)
  const user = useAppSelector((state) => state.user)
  const getEvent = async () => {
    try {
      const { events, ok, organizerRes } = await getEventsByOrganizerId(organizer.id);
      if (!ok) throw 'failed get event'
      console.log(events);
      setEvents(events)
    } catch (err) {
      console.log(`event err : ${err}`)
    }
  }
  useEffect(() => {
    getEvent()
  }, [])

  return (
    <section className="flex flex-col items-center w-full h-screen">
      <Navbar />

      <Card>
        <div className="flex flex-row items-center gap-5">
          <div className="bg-gray-500 rounded-full">
            <img src={organizer.organizerImg}></img>
          </div>
          <div>
            <p className="text-xl">{organizer.organizerName}</p>
          </div>
        </div>
        <div className="space-y-3">
          <ButtonOutline>Setting</ButtonOutline>
          <div className="w-full border-b-2 border-gray-200"></div>
          <ButtonFill>Create Event</ButtonFill>
        </div>
      </Card>
      <div className="w-11/12">
        <DashboardOutlineCard>
          <div className="flex flex-row items-center gap-5">
            <span className="text-4xl font-material-symbols-outlined">mail</span>
            <div className="text-xs">
              <p>Butuh bantuan untuk mengelola aktivitas anda ?</p>
              <p className="font-semibold underline">Hubungi kami</p>
            </div>
          </div>
        </DashboardOutlineCard>
      </div>
      <Card>
        <div className="flex flex-row items-center gap-5">
          <span className="text-4xl font-material-symbols-outlined">kid_star</span>
          <h1 className="text-2xl font-bold">Ringkasan Event</h1>
        </div>
        <h2>Ringkasan performa semua event Anda sepanjang waktu.</h2>
        <DashboardOutlineCard>
          <RoundedIcon>campaign</RoundedIcon>
          <div className="text-base text-gray-500">
            <p >Event Ditayangkan</p>
            <p >0 Event</p>
          </div>
        </DashboardOutlineCard>
        <DashboardOutlineCard>
          <RoundedIcon>payments</RoundedIcon>
          <div className="text-base text-gray-500">
            <p>Total Penjualan</p>
            <p>IDR &#177; 0</p>
          </div>
        </DashboardOutlineCard>
        <DashboardOutlineCard>
          <RoundedIcon>confirmation_number</RoundedIcon>
          <div className="text-base text-gray-500">
            <p>Total Penjualan Tiket</p>
            <p>Tiket &#177; 0</p>
          </div>
        </DashboardOutlineCard>
      </Card>
      <Card>
        <div className="flex flex-row items-center gap-3">
          <span className="text-5xl font-material-symbols-outlined">campaign</span>
          <h1 className="text-xl font-semibold">Event Terupdate</h1>
        </div>
        {/* <CardEvent /> */}
        {

          events.map((event) => {
            return (
              <CardEvent
                id={event.id}
                name={event.eventName}
                date={event.eventDate}
                location={event.organizer}
                status={event.eventStatus}
                key={event.id}
                statusColor={
                  `${event.eventStatus === "Inactive" ? 'bg-red-500' : 'bg-green-400'}`
                }
              />
            )
          })
        }
        <div className="flex flex-row items-center justify-center text-xl">
          <Link href="/dashboard/event">
            <p className="text-base">Lihat Semua Event</p>
          </Link>
          <span className="text-3xl font-material-symbols-outlined">chevron_right</span>
        </div>
      </Card>
    </section>
  )
}
