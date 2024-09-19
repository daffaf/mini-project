import { WalletController } from "@/controllers/wallet.controller";
import { Router } from "express";

export class WalletRouter {
  private router: Router;
  private walletController: WalletController;

  constructor() {
    this.router = Router()
    this.walletController = new WalletController();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get('/:id', this.walletController.getWalletByUserId)
  }
  getRouter(): Router {
    return this.router
  }
}