import { DashboardOutlineCard, OutlineCard } from "@/components/Card/dashboardOutlineCard";
import { IconText, RoundedIcon } from "@/components/Icons/Icon";
import { Sidebar, SidebarContent } from "@/components/Sidebar/sidebar";

export default function Analitycs() {
  return (
    <section className="p-3">
      <Sidebar />
      <SidebarContent title="ANALITIK EVENT">
        <div className="p-5 my-5 border border-gray-200 rounded-xl">
          <div className="flex flex-col items-start gap-2">
            <IconText icon="kid_star" text="Ringkasan Aktivitas" iconClass="text-2xl" textClass="text-xl font-semibold" />

            <div className="flex flex-row items-center gap-5 text-gray-500">
              <RoundedIcon>visibility</RoundedIcon>
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-semibold">0</h1>
                <span>Kali Dilihat</span>
              </div>
            </div>

            <div className="flex flex-row items-center gap-5 text-gray-500">
              <RoundedIcon>confirmation_number</RoundedIcon>
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-semibold">0</h1>
                <span>Tiket Terjual</span>
              </div>
            </div>

            <div className="flex flex-row items-center gap-5 text-gray-500">
              <RoundedIcon>visibility</RoundedIcon>
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-semibold">0</h1>
                <span>Kali Dilihat</span>
              </div>
            </div>

          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          <IconText icon="kid_star" text="Analitik Tiket" iconClass="text-2xl" textClass="text-xl font-semibold" />
        </div>
        <div className="flex flex-col items-start gap-2">
          <IconText icon="kid_star" text="Analitik Attendance" iconClass="text-2xl" textClass="text-xl font-semibold" />
        </div>
      </SidebarContent>

    </section>
  )
}