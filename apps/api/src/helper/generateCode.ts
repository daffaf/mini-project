import prisma from "@/prisma"
import { customAlphabet } from "nanoid"


export const generateCode = async () => {
  const randomcode = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)
  let isUnique = false
  while (isUnique == false) {
    const tempCode = randomcode(6)
    const checkCode = await prisma.user.findUnique({
      where: { referallCode: tempCode }
    })

    if (!checkCode) {
      let code = tempCode
      isUnique = true
      return code
    }
  }

  return
}