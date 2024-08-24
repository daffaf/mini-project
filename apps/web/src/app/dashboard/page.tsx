import Card from "@/components/Card/card";
import DashboardCard from "@/components/Card/dashboard-card";
import { DashboardOutlineCard } from "@/components/Card/dashboardOutlineCard";
import { IconText } from "@/components/Icons/icontext";
import { RoundedIcon } from "@/components/Icons/RoundedIcon";
import Image from "next/image";

export default function Dashboard() {
  return (
    <section className="flex flex-col items-center w-full h-screen">
      <div>test</div>
      <div className="w-11/12">
        <DashboardCard />
      </div>
      <Card>
        <div className="flex flex-row items-center gap-5">
          <span className="text-4xl font-material-symbols-outlined">kid_star</span>
          <h1 className="text-3xl font-bold">Ringkasan Event</h1>
        </div>
        <h2 className="text-2xl">Ringkasan performa semua event Anda sepanjang waktu.</h2>
        <DashboardOutlineCard>
          <RoundedIcon>campaign</RoundedIcon>
          <div>
            <p className="text-2xl">Event Ditayangkan</p>
            <p className="text-2xl">0 Event</p>
          </div>
        </DashboardOutlineCard>
        <DashboardOutlineCard>
          <RoundedIcon>payments</RoundedIcon>
          <div>
            <p className="text-2xl">Total Penjualan</p>
            <p className="text-2xl">IDR &#177; 0</p>
          </div>
        </DashboardOutlineCard>
        <DashboardOutlineCard>
          <RoundedIcon>confirmation_number</RoundedIcon>
          <div>
            <p className="text-2xl">Total Penjualan Tiket</p>
            <p className="text-2xl">Tiket &#177; 0</p>
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
