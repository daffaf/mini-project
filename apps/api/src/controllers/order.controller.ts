import { Request, Response } from "express";
import prisma from "@/prisma";
import { check } from "express-validator";
export class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const {
        eventId,
        userId,
        voucherId,
        total
      } = req.body
      let voucher = null
      if (voucherId) {
        const checkVoucher = await prisma.voucher.findUnique({
          where: { id: voucherId }
        })
        if (!checkVoucher) throw 'Voucher Not Found'
        if (checkVoucher.totalUsed === checkVoucher.maxUsed) throw 'Vouchers Already Run out'
      }
      const newOrder = await prisma.order.create({
        data: {
          eventId,
          userId,
          voucherId,
          total,
        }
      })
      return res.status(200).send({
        order: {
          data: newOrder
        }
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
}