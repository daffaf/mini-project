import { OrderController } from "@/controllers/order.controller";
import { verifyToken } from "@/middleware/token";
import { Router } from "express";

export class OrderRouter {
  private router: Router;
  private orderController: OrderController;

  constructor() {
    this.router = Router();
    this.orderController = new OrderController()
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.post('/',
      verifyToken,
      this.orderController.createOrder
    );
    this.router.get('/event/:id',
      verifyToken,
      this.orderController.getOrderDataByEvent
    );
    this.router.get('/user/:id',
      verifyToken,
      this.orderController.getOrderDataByUser
    );
    this.router.get('/organizer/:id',
      verifyToken,
      this.orderController.getOrderDataByOrganizer
    );
  }
  getRouter(): Router {
    return this.router
  }
}