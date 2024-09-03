'use client'
import { ButtonFill, ButtonOutline } from "@/components/Button/Button";
import { DashboardOutlineCard, OutlineCard } from "@/components/Card/dashboardOutlineCard";
import { DateForm, FormDropDown, FormField, FormTextArea } from "@/components/Form/Form";
import { IconText, RoundedIcon } from "@/components/Icons/Icon";
import { Sidebar, SidebarContent } from "@/components/Sidebar/sidebar";
import Link from "next/link";
import React, { useState } from "react";

export default function DetailEvent() {
  const [selectedOption, setSelectedOption] = useState('')

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
      <Sidebar />
      <SidebarContent title="INFORMASI EVENT">
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
          <h1 className="font-semibold">Lokasi Event</h1>
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
            <DateForm fieldname="" className="w-full" />
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
      </SidebarContent>

    </section>
  )
} 