'use client'
import { ButtonFill, ButtonOutline } from "@/components/Button/Button";
import Card, { CardEvent } from "@/components/Card/card";
import { DashboardOutlineCard } from "@/components/Card/dashboardOutlineCard";
import { IconText, RoundedIcon } from "@/components/Icons/Icon";
import Navbar from "@/components/Navbar";
import { getEventsByOrganizerId } from "@/lib/event";
import { useAppSelector } from "@/redux/hooks";
import { IEventState } from "@/type/type";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [events, setEvents] = useState<IEventState[]>([])
  const [totalEvent, setTotalEvent] = useState(0)
  const organizer = useAppSelector((state) => state.organizer)
  const user = useAppSelector((state) => state.user)

  const getEvent = async () => {
    try {
      const limitPerPage = 3
      const sortBy = 'eventStatus'
      const page = 1
      const { events, ok, total } = await getEventsByOrganizerId(organizer.id, page, limitPerPage, sortBy, '');
      if (!ok) throw 'failed get event'
      console.log(events);
      setEvents(events)
      setTotalEvent(total)
    } catch (err) {
      console.log(`event err : ${err}`)
    }
  }
  useEffect(() => {
    getEvent()
  }, [])

  return (
    <section className="flex flex-col items-center w-full h-screen ">
      <Navbar />
      <div className="flex justify-center w-11/12 gap-3 sm:flex-col lg:flex-row">
        <div className="flex flex-col items-center sm:w-11/12 lg:w-1/4">
          <Card>
            <div className="flex flex-row items-center w-1/2 gap-5">
              <div className="bg-gray-500 rounded-full">
                <img src={organizer.organizerImg}></img>
              </div>
              <div>
                <p className="text-xl">{organizer.organizerName}</p>
              </div>
            </div>
            <div className="space-y-3">
              <ButtonOutline>Profile</ButtonOutline>
              <Link href={'/dashboard/create-event'}>
                <ButtonFill>Create Event</ButtonFill>
              </Link>
            </div>
          </Card>

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
        <div className="flex flex-col items-center sm:w-full lg:w-4/5">
          <Card>
            <div className="flex flex-row items-center gap-5">
              <span className="text-4xl font-material-symbols-outlined">kid_star</span>
              <h1 className="text-2xl font-bold">Ringkasan Event</h1>
            </div>
            <h2>Ringkasan performa semua event Anda sepanjang waktu.</h2>
            <div className="grid sm:gap-0 lg:gap-3 sm:grid-cols-1 lg:grid-cols-3">
              <DashboardOutlineCard>
                <RoundedIcon>campaign</RoundedIcon>
                <div className="text-base text-gray-500">
                  <p >Event Ditayangkan</p>
                  <p>{totalEvent} Event</p>
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
            </div>

          </Card>
          <Card>
            <div className="flex flex-row items-center gap-3">
              <span className="text-5xl font-material-symbols-outlined">campaign</span>
              <h1 className="text-xl font-semibold">Event Terupdate</h1>
            </div>
            <div className="flex flex-row items-center gap-3">
              {
                events.map((event) => {
                  return (
                    <div className="flex flex-row">
                      <Link href={`dashboard/event/${event.id}`}>
                        <CardEvent
                          id={event.id}
                          name={event.eventName}
                          date={format(new Date(event.eventDate), 'yyyy-MM-dd')}
                          location={event.location.city}
                          eventImg={event.eventImg}
                          status={event.eventStatus}
                          ticketPrice={event.ticketPrice}
                          ticketQty={event.ticketQuantity}
                          ticketSold={event.ticketSold}
                          statusColor={
                            `${event.eventStatus === "Inactive" ? 'bg-red-500' : 'bg-green-400'}`
                          }
                        />
                      </Link>
                    </div>
                  )
                })
              }
            </div>

            <div className="flex flex-row items-center justify-center text-xl">
              <Link href="/dashboard/event">
                <p className="text-base">Lihat Semua Event</p>
              </Link>
              <span className="text-3xl font-material-symbols-outlined">chevron_right</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="w-5/6">


      </div>


    </section>
  )
}
