import { FormInputSearch } from "@/components/Form/Form";
import { IconText } from "@/components/Icons/Icon";
import { Sidebar, SidebarContent } from "@/components/Sidebar/sidebar";

export default function Attendees() {
  return (
    <section className="p-3">
      <Sidebar />
      <SidebarContent title="DAFTAR PESERTA">
        <div>
          <FormInputSearch icon="search" placeholder="Cari Nama Peserta" />
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-3 p-5 border rounded-md">
          <IconText icon="groups" text={`Total Peserta`} iconClass="text-3xl" color="text-yellow-500" />
          <IconText icon="person" text={`Total Peserta`} iconClass="text-3xl" color="text-blue-500" />
          <IconText icon="person" text={`Total Peserta`} iconClass="text-3xl" color="text-red-500" />
        </div>
      </SidebarContent>
    </section>
  )
}