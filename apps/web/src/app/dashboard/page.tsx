import { ButtonFill, ButtonOutline } from "@/components/Button/Button";
import Card from "@/components/Card/card";
import { DashboardOutlineCard } from "@/components/Card/dashboardOutlineCard";
import { IconText, RoundedIcon } from "@/components/Icons/Icon";
import Image from "next/image";

export default function Dashboard() {
  return (
    <section className="flex flex-col items-center w-full h-screen">
      <Card>
        <div className="flex flex-row items-center gap-5">
          <div className="bg-gray-500 rounded-full">
            <Image src="" width={80} height={80} alt="user-profile" />
          </div>
          <div>
            <p className="text-2xl">organizer name</p>
            <p className="text-xl">organizer name</p>
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
            <div className="text-base">
              <p>Butuh bantuan untuk mengelola aktivitas anda ?</p>
              <p className="font-semibold underline">Hubungi kami</p>
            </div>
          </div>
        </DashboardOutlineCard>
      </div>
      <Card>
        <div className="flex flex-row items-center gap-5">
          <span className="text-4xl font-material-symbols-outlined">kid_star</span>
          <h1 className="text-3xl font-bold">Ringkasan Event</h1>
        </div>
        <h2 >Ringkasan performa semua event Anda sepanjang waktu.</h2>
        <DashboardOutlineCard>
          <RoundedIcon>campaign</RoundedIcon>
          <div className="text-lg">
            <p >Event Ditayangkan</p>
            <p >0 Event</p>
          </div>
        </DashboardOutlineCard>
        <DashboardOutlineCard>
          <RoundedIcon>payments</RoundedIcon>
          <div className="text-lg">
            <p>Total Penjualan</p>
            <p>IDR &#177; 0</p>
          </div>
        </DashboardOutlineCard>
        <DashboardOutlineCard>
          <RoundedIcon>confirmation_number</RoundedIcon>
          <div className="text-lg">
            <p>Total Penjualan Tiket</p>
            <p>Tiket &#177; 0</p>
          </div>
        </DashboardOutlineCard>
      </Card>
      <Card>
        <div className="flex flex-row items-center gap-5">
          <span className="text-5xl font-material-symbols-outlined">campaign</span>
          <h1 className="text-3xl font-bold">Event List</h1>
        </div>
        <DashboardOutlineCard>
          <div className="flex flex-col gap-3">
            <Image src="" width={80} height={80} alt="user-profile" />
            <p className="text-xl font-semibold">Nama Event</p>
            <IconText icon="date_range" text="2022-01-01" />
            <IconText icon="location_on" text="Nama Lokasi" />
            <IconText icon="confirmation_number" text="0 Tiket Terjual" />
            <IconText icon="person" text="0 Dilihat" />
          </div>
        </DashboardOutlineCard>
        <div className="flex flex-row items-center justify-center text-2xl">
          <p>Lihat Semua Event</p>
          <span className="text-3xl font-material-symbols-outlined">chevron_right</span>
        </div>
      </Card>
    </section>
  )
}
