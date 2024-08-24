import Image from "next/image";
import ButtonFill from "../Button/ButtonFill";
import ButtonOutline from "../Button/ButtonOutline";
import Card from "./card";

export default function DashboardCard() {
  return (
    <Card>
      <div className="flex flex-row items-center gap-5">
        <div className="rounded-full bg-gray-500">
          <Image src="" width={80} height={80} alt="user-profile" />
        </div>
        <div>
          <p className="text-2xl">organizer name</p>
          <p className="text-xl">organizer name</p>
        </div>
      </div>
      <div className="space-y-3">
        <ButtonOutline>Setting</ButtonOutline>
        <div className="border-b-2 w-full border-gray-200"></div>
        <ButtonFill>Create Event</ButtonFill>
      </div>
    </Card>
  )
}