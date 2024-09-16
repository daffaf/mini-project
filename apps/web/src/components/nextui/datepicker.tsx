'use client'
import { extendVariants } from "@nextui-org/system";
import { DatePicker as NextDatePicker } from "@nextui-org/react";
export const DatePicker = extendVariants(NextDatePicker, {
  variants: {
    color: {
      stone: {
        base: [
          "bg-white-100",
          "flex",
          "flex-row",
        ],
        calendar: [
          "bg-zinc-100",
          "text-zinc-800",
          "rounded-lg",
        ],
        calendarContent: [
          "flex",
          "flex-col",
          "gap-0.5",
          "overflow-auto",
          "w-full",
          "p-5",
          "justify-center",
          "items-center"
        ],
        selectorButton: [
          "flex",
          "items-center",
          "p-0"
        ],
        inputWrapper: [
          "flex",
          "items-center",
        ],
      },
    }
  },
  defaultVariants: {
    color: "stone",
    radius: "sm",
    labelPlacement: "outside",
  },
})
export * from "@nextui-org/date-picker";
