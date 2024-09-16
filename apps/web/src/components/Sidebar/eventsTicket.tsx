'use client'
import React, { useState } from "react";
import { IconText } from "../Icons/Icon";
interface Ticket{
  name : string,
  status : string,
  tanggal_tayang : string,
  link : string,
  price : string
  sold_ticket : string,
  total_ticket : string,
  total_price : string
}
export const EventsTicket = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toogle = () => {
    setIsOpen(!isOpen)
    console.log(`is open is ${!isOpen}`);
  }
  return (
    <div className="p-3 border border-gray-300 rounded-md">
      <div >
        <div className="flex flex-row gap-3">
          <h1 className="text-lg font-semibold">Nama Tiket </h1>
          <span className="px-1 font-semibold text-yellow-500 rounded-md bg-yellow-50">Status Tiket</span>
        </div>
        <div className="w-full text-right">
          pengaturan
        </div>
        <div>tanggal dan jam</div>
        <IconText icon="calendar_month" text="24 Agt 24, 07:00-09:00 WIB" />
        <div
          className="flex flex-row items-center gap-2 text-yellow-500"
          onClick={toogle}
        >
          <p>Lihat Detail Event</p>
          <span className="text-xl font-material-symbols-outlined">expand_more</span>
        </div>
        {/* Detail Tiket */}
        <div className={`flex flex-col gap-3 my-3 text-sm ${isOpen ? "block" : "hidden"}`}>
          <div>
            <div className="grid grid-cols-2">
              <p>Mulai Penjualan</p>
              <p>Akhir Penjualan</p>
            </div>
            <div className="grid grid-cols-2 ">
              <p>24 Agt 24</p>
              <p>24 Agt 25</p>
            </div>
          </div>
          <div>
            <p>Minmax pembelian</p>
            <p>0/0 tiket</p>
          </div>
          <div>
            <p>link live streaming</p>
            <p>Link</p>
          </div>
          <div>
            <p>syarat dan ketentuan</p>
            <p>syarat</p>
          </div>
          <div>
            <p>harga</p>
            <p>IDR 00</p>
          </div>
        </div>
        {/* Detail Tiket */}
        <div className="mt-4 mb-2 border border-gray-200 border-b-1"></div>
      </div>
      <div className="flex flex-row justify-between font-semibold">
        <p>0/0 Tiket Terjual</p>
        <p>IDR 150.000</p>
      </div>

    </div>
  )
}