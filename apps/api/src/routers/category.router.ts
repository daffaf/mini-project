import { CategoryController } from "@/controllers/category.controller";
import { checkIsOrganizer, verifyToken } from "@/middleware/token";
import { uploader } from "@/middleware/uploader";
import { Router } from "express";

export class CategoryRouter {
  private router: Router;
  private categoryController: CategoryController;

  constructor() {
    this.router = Router();
    this.categoryController = new CategoryController();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get('/', this.categoryController.getCategories);
    this.router.post('/',
      verifyToken,
      checkIsOrganizer,
      this.categoryController.createCategory);
  }

  getRouter(): Router {
    return this.router
  }
}