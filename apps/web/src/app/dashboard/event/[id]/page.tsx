'use client'
import { ButtonFill, ButtonOutline } from "@/components/Button/Button";
import { DashboardOutlineCard, OutlineCard } from "@/components/Card/dashboardOutlineCard";
import { DateForm, FormDropDown, FormField, FormTextArea } from "@/components/Form/Form";
import { IconText, RoundedIcon } from "@/components/Icons/Icon";
import React, { useState } from "react";

export default function DetailEvent() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const toogle = () => {
    setIsOpen(!isOpen)
    console.log(`is open is ${!isOpen}`);
  }
  const sidebarMenu = [
    { icon: "edit_square", text: "Informasi Event" },
    { icon: "groups", text: "Daftar Peserta" },
    { icon: "bar_chart_4_bars", text: "Analitik Event" },
    { icon: "chat_bubble", text: "Ulasan Event" },
    { icon: "receipt_long", text: "Laporan Penjualan" }
  ]
  const kategoriOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  const handleDropdownChange = (value: string) => {
    setSelectedOption(value);
  };
  return (
    <section className="p-3">

      <div className="flex flex-col items-start w-full">
        <div className="flex flex-col items-cenounded-full justify-cente">
          <span className="flex items-center justify-center w-8 h-8 text-white bg-blue-400 rounded-full font-material-symbols-outlined">videocam</span>
        </div>
        <div className="flex flex-col w-full gap-3">
          <h1 className="text-3xl font-semibold">Nama Event</h1>
          <span className="p-1 text-white bg-blue-500 rounded-sm w-fit">DRAF</span>
          <ButtonFill>Tayangkan Event</ButtonFill>
          <ButtonFill>Preview</ButtonFill>
        </div>
        <div className="w-full">
          <p>Butuh panduan event online ?</p>
          <IconText icon="mail" text="BACA PANDUAN" />
        </div>
      </div>
      {/* Sidebar */}
      <div className="w-full">
        <div className="flex flex-row items-center justify-between w-full p-3 font-semibold rounded-md" onClick={toogle}>
          <IconText icon="edit_square" text=" Kelola Event" />
          <span className="text-2xl font-material-symbols-outlined">expand_more</span>
        </div>
        {/* Sidebar Menu Kelola Event */}
        <div className={`list-none ${isOpen ? "block" : "hidden"}`}>
          {
            [
              "Informasi Event",
              "Tiket Event",
              "Formulir Pemesanan",
              "Informasi Tambahan"
            ].map((item) => (
              <li key={item} className="w-full p-3 text-sm ">{item}</li>
            ))
          }
        </div>
        {/* Sidebar */}
        {sidebarMenu.map((sidebar) => (
          <div className="w-full p-3 font-semibold rounded-md" >
            <IconText key={sidebar.text} icon={sidebar.icon} text={sidebar.text}></IconText>
          </div>
        ))}
      </div>
      {/* Sidebar Content */}
      <div>
        <h1>Nama Menu Sidebar</h1>
      </div>
      <div className="w-full">
        <FormField fieldname="Nama Event" />
        <FormTextArea />
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
      <div className="">
        <span className="w-full px-4 text-sm">Tanggal dan Jam Mulai</span>
        <div className="flex flex-row justify-between gap-2">
          <DateForm fieldname="" className="w-full" />
          <FormDropDown
            options={kategoriOptions}
            selectedOption={selectedOption}
            onChange={handleDropdownChange}
            className="w-full"
          />
        </div>
      </div>
      {/* Lokasi Section */}
      <div className="w-full">
        <h1>Jadwal Event</h1>
        <FormField fieldname="Wilayah" />
        <FormDropDown
          fieldname="Lokasi Event"
          options={kategoriOptions}
          selectedOption={selectedOption}
          onChange={handleDropdownChange}
        />
      </div>

      <div className="">
        <h1>Sesi #</h1>
        <FormField fieldname="Wilayah" />
        <FormField fieldname="Lokasi Event" />
      </div>
    </section>
  )
} 