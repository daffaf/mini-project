import { OutlineCard } from "@/components/Card/dashboardOutlineCard";
import { RoundedIcon } from "@/components/Icons/Icon";
import { Sidebar } from "@/components/Sidebar/sidebar";

export default function Sales() {
  return (
    <section className="p-3">
      <Sidebar />
      <div>
        <div className="flex flex-row items-center gap-5 p-4 text-gray-500 border border-gray-200 rounded-md">
          <RoundedIcon>visibility</RoundedIcon>
          <div className="flex flex-col justify-center">
            <span>Total Penjualan</span>
            <h1 className="text-2xl font-semibold">IDR 0</h1>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5 p-4 text-gray-500 border border-gray-200 rounded-md">
          <RoundedIcon>visibility</RoundedIcon>
          <div className="flex flex-col justify-center">
            <span>Tiket Terjual</span>
            <h1 className="text-2xl font-semibold">0 / 0 Tiket</h1>
          </div>
        </div>
      </div>

      <div>
        <h1>Laporan Penjualan Terkini</h1>

      </div>
    </section>
  )
}