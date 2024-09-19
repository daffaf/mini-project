import { Request, Response } from "express";
import prisma from "@/prisma";
export class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      let {
        eventId,
        voucher,
        voucherId,
        userId,
        usePoints,
        coupon,
        total
      } = req.body
      const transactionPrisma = await prisma.$transaction(async (tx) => {

        const checkEvent = await tx.event.findUnique({
          where: { id: eventId }
        })
        if (!checkEvent) throw 'Event Not Found'
        total = checkEvent?.ticketPrice!
        if (checkEvent?.ticketQuantity === checkEvent?.ticketSold) throw 'Event Sold Out'

        const checkVoucher = await tx.voucher.findFirst({
          where: { kode: voucher }
        })
        if (voucher && !checkVoucher) throw 'Voucher Not Found';
        if (voucher && checkVoucher?.totalUsed === checkVoucher?.maxUsed) throw 'Vouchers Already Run out';

        if (coupon) {
          const checkCoupon = await tx.coupon.findFirst({
            where: { code: coupon, isUsed: false, userId: userId }
          })
          if (!checkCoupon) throw 'Coupon Not Found or Already Used'
          if (checkCoupon) {
            const updateCoupon = await tx.coupon.update({
              where: { id: checkCoupon?.id },
              data: { isUsed: true }
            })
            total = total - (total * (10 / 100))
          }
        }

        const existUser = await tx.user.findUnique({
          where: { id: userId },
        })
        if (!existUser) throw 'User Not Found'

        const checkWalletUser = await tx.wallet.findUnique({
          where: { userId: userId }
        })

        const points = checkWalletUser?.point!
        const totalUsingPoints = total - points

        if (checkWalletUser?.saldo! < total) throw 'Insufficient Balance'
        const getUserOrganizer = await tx.organizer.findUnique({
          where: { id: checkEvent?.organizerId }
        })
        console.log(getUserOrganizer)
        await tx.wallet.update({
          where: { userId: userId },
          data: {
            saldo: usePoints ?
              checkWalletUser?.saldo! - totalUsingPoints :
              checkWalletUser?.saldo! - total,
            point: usePoints ?
              checkWalletUser?.point! - checkWalletUser?.point! :
              checkWalletUser?.point!
          }
        })
        const organizerCurrentBalance = await tx.wallet.findUnique({
          where: { userId: getUserOrganizer?.userId }
        })

        await tx.event.update({
          where: { id: eventId },
          data: {
            ticketSold: checkEvent?.ticketSold + 1
          }
        })
        console.log(organizerCurrentBalance?.saldo)
        await tx.wallet.update({
          where: { userId: getUserOrganizer?.userId },
          data: {
            saldo: +organizerCurrentBalance?.saldo! + total
          }
        })
        if (!existUser || existUser?.role !== 'Attendees') throw 'User Not Found or Incorect Role'

        if (checkEvent?.isFree) {
          total *= 0
        }

        const newOrder = await tx.order.create({
          data: {
            eventId,
            userId,
            voucherId: voucher ? checkVoucher?.id : null,
            total,
          }
        })
        return {
          newOrder,
          organizerCurrentBalance, getUserOrganizer,
          points,
          usePoints
        }
      })

      return res.status(200).send({
        order: {
          data: transactionPrisma.newOrder,
          point_used: transactionPrisma.usePoints ?
            transactionPrisma.points :
            null,
          total,
          // organizer: transactionPrisma.getUserOrganizer,
          // waletorganizer: transactionPrisma.organizerCurrentBalance
        }
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async getOrderDataByEvent(req: Request, res: Response) {
    try {
      const eventId = +req.params.id
      const getData = await prisma.order.findMany({
        where: { eventId: eventId },
        include: {
          event: true,
          user: true,
          voucher: true
        }
      })
      const totalOrder = await prisma.order.count({
        where: { eventId: eventId }
      })
      res.status(200).send({
        status: 'ok',
        msg: 'Get Order Data By Event',
        order: {
          data: getData,
          total: totalOrder
        }
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async getOrderDataByUser(req: Request, res: Response) {
    try {
      const userId = +req.params.id
      const getData = await prisma.order.findMany({
        where: { userId: userId },
        include: {
          event: true,
          voucher: true,
        }
      })
      res.status(200).send({
        status: 'ok',
        msg: 'Get Order Data By User',
        order: {
          data: getData
        }
      })
    } catch (err) {
      res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async getOrderDataByOrganizer(req: Request, res: Response) {
    try {
      const organizerId = +req.params.id
      const getData = await prisma.event.findMany({
        where: { organizerId: organizerId },
        include: {
          order: true
        }
      })
      res.status(200).send({
        status: 'ok',
        msg: 'Get Order Data By User',
        order: {
          data: getData
        }
      })
    } catch (err) {
      res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
}