import prisma from "@/prisma";
import { Request, Response } from "express";

export class WalletController {
  async getWalletByUserId(req: Request, res: Response) {
    try {
      const userId = +req.params.id
      const userWallet = await prisma.wallet.findUnique({
        where: { userId: userId }
      })
      return res.status(200).send({
        status: 'ok',
        msg: 'Get User Wallet',
        wallet: {
          data: userWallet
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