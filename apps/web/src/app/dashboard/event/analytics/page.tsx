'use client'
import dynamic from "next/dynamic"
import { ApexOptions } from "apexcharts"
import { useEffect, useState } from "react"
import { getAllEventByOrganizerId } from "@/lib/event"
import { useAppSelector } from "@/redux/hooks"
import { IEventState } from "@/type/type"
import RoleProtection from "@/components/Form/UnauthorizedPage"
import { format } from "date-fns"
import DatePicker from 'react-datepicker' // Ensure you have react-datepicker installed
import 'react-datepicker/dist/react-datepicker.css'
import Link from "next/link"
import { IconText } from "@/components/Icons/Icon"

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type SeriesData = {
  name: string;
  data: number[];
}[];

const Analytic = () => {
  const [events, setEvents] = useState<IEventState[]>([])
  const [range, setRange] = useState<string>('year')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [filteredEvents, setFilteredEvents] = useState<IEventState[]>([])
  const [chartData, setChartData] = useState<{
    series: SeriesData,
    options: ApexOptions
  }>({
    series: [],
    options: {}
  })
  const organizer = useAppSelector((state) => state.organizer)

  const getAllEvent = async () => {
    try {
      const { allEvent } = await getAllEventByOrganizerId(organizer.id)
      setEvents(allEvent || [])
    } catch (err) {
      console.error(err)
    }
  }

  const filterEventsByDateRange = (range: string, startDate: Date | null, endDate: Date | null, events: IEventState[]): IEventState[] => {
    const currentDate = new Date()
    switch (range) {
      case 'year':
        return events.filter(event => new Date(event.eventDate).getFullYear() === currentDate.getFullYear())
      case 'month':
        return events.filter(event =>
          new Date(event.eventDate).getFullYear() === currentDate.getFullYear() &&
          new Date(event.eventDate).getMonth() === currentDate.getMonth()
        )
      case 'day':
        if (startDate && endDate) {
          const endOfDay = new Date(endDate)
          endOfDay.setHours(23, 59, 59, 999)
          return events.filter(event => {
            const eventDate = new Date(event.eventDate)
            return eventDate >= startDate && eventDate <= endOfDay
          })
        }
        return []
      default:
        return events
    }
  }


  useEffect(() => {
    getAllEvent()
  }, [])

  useEffect(() => {
    if (events.length > 0) {
      const filtered = filterEventsByDateRange(range, startDate, endDate, events)
      setFilteredEvents(filtered)

      const salesData = filtered.map((event) => ((event.ticketPrice)) * (event.ticketSold))
      const eventNames = filtered.map((event) => event.eventName)

      const seriesData: SeriesData = [
        {
          name: "Total Sales",
          data: salesData
        }
      ]

      const chartOptions: ApexOptions = {
        chart: {
          type: 'line',
          height: 350
        },
        xaxis: {
          categories: eventNames
        },
        title: {
          text: `Event Sales Analytics (${range})`
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return `Rp ${val.toLocaleString()}`
            }
          }
        }
      }

      setChartData({
        series: seriesData,
        options: chartOptions
      })
    }
  }, [range, startDate, endDate, events])

  return (
    <section className="flex flex-col items-center w-full h-screen p-3">
      <div className="flex w-full gap-3 sm:flex-col lg:flex-row">
        <div className="flex flex-col items-start sm:w-full lg:w-1/5">
          <div className="w-full p-3 rounded-md cursor-pointer hover:bg-yellow-500">
            <Link href={`/dashboard/event`}>
              <IconText icon="calendar_month" text="Daftar Event" />
            </Link>
          </div>
          <div className="w-full p-3 text-white bg-yellow-500 rounded-md cursor-pointer hover:bg-yellow-500">
            <Link href={`event/analytics`}>
              <IconText icon="show_chart" text="Analitik Event" />
            </Link>
          </div>
        </div>
        <div className="w-full p-5 space-y-5 rounded-md shadow-md">
          <h1 className="text-2xl font-semibold">Event Sales Analytics</h1>

          {/* date range*/}
          <div className="mb-4">
            <label htmlFor="range" className="mr-2">Select Range:</label>
            <select id="range" value={range} onChange={(e) => {
              setRange(e.target.value)
              if (e.target.value !== 'day') {
                setStartDate(null)
                setEndDate(null)
              }
            }}>
              <option value="year">Year</option>
              <option value="month">Month</option>
              <option value="day">Day</option>
            </select>
          </div>

          {/* Date Range Picker */}
          {range === 'day' && (
            <div className="mb-4">
              <label htmlFor="startDate" className="mr-2">Start Date:</label>
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="p-2 mr-4 border border-gray-300 rounded"
              />
              <label htmlFor="endDate" className="mr-2">End Date:</label>
              <DatePicker
                id="endDate"
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          )}

          {/* Chart */}
          <div className="w-full">
            {chartData.series.length > 0 ? (
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={350}
              />
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RoleProtection(Analytic)
