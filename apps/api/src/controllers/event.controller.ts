import prisma from "@/prisma";
import { Request, Response } from "express";

interface IEvent {
  eventName: string,
  eventCategory: string,
  eventDate: Date,
  eventTime: string,
  eventPrice: number,
  eventImg: string,
  locationId: number,
  organizerId: number,
  createdAt: Date,
  updatedAt: Date
}
export class EventController {
  async createEvent(req: Request, res: Response) {
    try {
      console.log(req.file)
      if (!req.file) throw "event image not found !"
      const link = `http://localhost:8000/api/public/user/${req?.file?.filename}`
      const {
        eventName,
        eventCategory,
        eventDate,
        eventTime,
        eventPrice,
        eventImg,
        locationId,
        organizerId,
        eventCategoryId
      } = req.body
      const checkCategory = await prisma.eventCategory.findUnique({
        where: {
          categoryName: eventCategory,
        }
      })
      if (!checkCategory) throw "Category not found !"
      const checkOrganizer = await prisma.organizer.findUnique({
        where: { id: organizerId }
      })
      if (!checkOrganizer) throw "Organizer not found !"
      // const price = parseInt(eventPrice)
      // const checkOrganizer = await prisma.organizer.findUnique({
      //   where: { id: organizerId }
      // })
      // const organizer = checkOrganizer?.id!
      // const organizerIdint = parseInt(req.body.organizerId)
      // const categoryId = checkCategory
      const newEvent = await prisma.event.create({
        data: {
          eventName,
          eventDate,
          eventTime,
          eventPrice,
          eventImg: link,
          eventCategoryId: checkCategory?.id!,
          locationId: 1,
          organizerId: checkOrganizer?.id!,
        }
      })
      return res.status(200).send({
        status: 'ok',
        msg: 'Event Created',
        event: {
          data: newEvent
        }
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }

  }
  async getEvents(req: Request, res: Response) {
    try {
      const events = await prisma.event.findMany();
      return res.status(200).send({
        status: 'ok',
        msg: 'Get All Event',
        event: {
          data: events
        }
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }

  }
  async getOneEvents(req: Request, res: Response) {
    try {
      return res.status(200).send({
        status: 'ok',
        msg: 'Get One Event',
        event: {
          data: ''
        }
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async updateEvent(req: Request, res: Response) {
    try {
      return res.status(200).send({
        status: 'ok',
        msg: 'Success Update Event',
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async deleteEvent(req: Request, res: Response) {
    try {
      return res.status(200).send({
        status: 'ok',
        msg: 'Success Delete Event'
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
}