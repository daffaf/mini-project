import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

type IUser = {
  id: number
  role: string
}
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer", "").trim()
    console.log(token)
    if (!token) throw "token empty!"
    const verifiedToken = verify(token, process.env.SECRET_JWT!)
    req.user = verifiedToken as IUser

    // req.user = verifiedToken as IUser
    next()
  } catch (err) {
    return res.status(400).send({
      status: 'failed token',
      msg: err
    })
  }
}
export const checkIsOrganizer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role != 'Organizer') throw 'Unauthorized !'
    next()
  } catch (err) {
    return res.status(400).send({
      status: 'fail',
      msg: err
    })
  }
}