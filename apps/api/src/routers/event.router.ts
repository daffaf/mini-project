import { EventController } from "@/controllers/event.controller";
import { checkIsOrganizer, verifyToken } from "@/middleware/token";
import { uploader } from "@/middleware/uploader";
import { Router } from "express";

export class EventRouter {
  private router: Router;
  private eventController: EventController;
  constructor() {
    this.router = Router()
    this.eventController = new EventController();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get('/', this.eventController.getEvents)
    this.router.get('/:id', this.eventController.getOneEvents)
    this.router.post('/',
      checkIsOrganizer,
      uploader('event-images-', '/event').single('eventImg'),
      this.eventController.createEvent);
    this.router.patch('/:id',
      checkIsOrganizer,
      this.eventController.updateEvent);
    this.router.delete('/:id',
      verifyToken,
      checkIsOrganizer,
      this.eventController.deleteEvent);
  }
  getRouter(): Router {
    return this.router
  }
}