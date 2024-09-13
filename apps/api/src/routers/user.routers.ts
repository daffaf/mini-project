import { OrganizerController } from "@/controllers/organizer.controller";
import { UserController } from "@/controllers/user.controller";
import { uploader } from "@/middleware/uploader";
import { Router } from "express";

export class UserRouter {
  private router: Router
  private userController: UserController
  private organizerController: OrganizerController
  constructor() {
    this.router = Router()
    this.userController = new UserController();
    this.organizerController = new OrganizerController();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {

    this.router.post('/',
      uploader('avatar-', '/avatar').single('userImg'),
      this.userController.createUser);
    this.router.post('/login', this.userController.loginUser);
    this.router.get('/', this.userController.getUsers);
    // this.router.get('/:id', this.userController.getOneUser);
    this.router.delete('/:id', this.userController.deleteUser);
    this.router.patch('/:id', this.userController.updateUser);
    // this.router.post('/referall/:id', this.userController.useReferallCode);

    // this.router.post('/',
    //   uploader('organizer-', '/organizer').single('organizerImg'),
    //   this.organizerController.createOrganizer);
    this.router.get('/organizer/:id', this.organizerController.getOrganizerByUserId);
  }

  getRouter(): Router {
    return this.router
  }
}