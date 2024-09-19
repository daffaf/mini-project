import { IconButtonFill } from "../Button/Button"
import { IconText } from "../Icons/Icon"

type eventHeader = {
  eventName: string,
  eventStatus: string,
}
export const DetailEventHeader = ({ eventName, eventStatus }: eventHeader) => {
  return (
    <div>
      {/* event head */}
      <div className="flex flex-col items-start w-full my-6 ">
        <div className="flex flex-col items-cenounded-full justify-cente">
          <span className="flex items-center justify-center w-8 h-8 text-white bg-blue-400 rounded-full font-material-symbols-outlined">
            videocam
          </span>
        </div>
        <div className="flex flex-row justify-between w-full gap-3">
          <div className="flex flex-col w-full">
            <h1 className="text-3xl font-semibold">{eventName}</h1>
            <span className="p-1 text-white bg-blue-500 rounded-sm w-fit">{eventStatus}</span>
          </div>
          <div className="flex items-center justify-end w-full">
            <IconButtonFill icon="rocket_launch" text="Tayangkan Event" />
          </div>
        </div>
        <div className="w-full my-4">
          <p>Butuh panduan event online ?</p>
          <IconText icon="mail" text="BACA PANDUAN" textClass="font-semibold text-sm text-yellow-500" />
        </div>
      </div>
      {/* event end */}
    </div>
  )
}