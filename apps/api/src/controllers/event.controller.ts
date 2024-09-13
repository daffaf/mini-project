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
      const link = `http://localhost:8000/api/public/event/${req?.file?.filename}`
      const {
        eventName,
        eventDate,
        eventCategory,
        eventStart,
        eventEnd,
        eventStatus,
        eventDescription,
        eventImg,
        ticketPrice,
        ticketQuantity,
        ticketSold,
        locationId,
        organizerId,
        eventCategoryId
      } = req.body

      const price = +ticketPrice
      const qty = +ticketQuantity
      const soldTicket = +ticketSold
      const idLocation = +locationId
      const idOrganizer = +organizerId
      const idCategory = +eventCategoryId

      const checkCategory = await prisma.eventCategory.findUnique({
        where: {
          categoryName: eventCategory,
          // id: eventCategoryId
        }
      })
      if (!checkCategory) throw "Category not found !"
      const checkOrganizer = await prisma.organizer.findUnique({
        where: { id: +organizerId }
      })

      if (!checkOrganizer) throw "Organizer not found !"

      const newEvent = await prisma.event.create({
        data: {
          eventName,
          eventDate,
          eventDescription,
          eventImg: link,
          eventStart,
          eventEnd,
          eventStatus,
          ticketPrice: price,
          ticketQuantity: qty,
          ticketSold: 0,
          locationId: idLocation,
          eventCategoryId: checkCategory?.id,
          organizerId: checkOrganizer?.id,
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
  async paginateEvents(req: Request, res: Response) {
    try {
      // get pagination by query parameter
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 1;
      const skip = (page - 1) * limit; // Calculate how many records to skip

      const totalRecords = await prisma.event.count();

      // get paginated events
      const events = await prisma.event.findMany({
        skip: skip,      // Skip the records for previous pages
        take: limit,     // Limit the number of records returned
      });

      const totalPages = Math.ceil(totalRecords / limit);

      return res.status(200).send({
        status: 'ok',
        msg: 'Get All Events',
        event: {
          data: events,
          meta: {
            totalRecords,
            totalPages,
            currentPage: page,
            perPage: limit,
          }
        }
      });
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      });
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
  async getOneEventsById(req: Request, res: Response) {
    try {
      const id = +req.params.id

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 1;
      const skip = (page - 1) * limit;
      const sortBy = req.query.sortBy as string || 'eventStatus';
      const sortOrder = req.query.sortOrder as string || 'desc';
      const eventByOrganizerId = await prisma.event.findMany({
        where: { organizerId: id },
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          organizer: true,
          eventCategory: true
        }
      })

      const totalEventById = await prisma.event.count({
        where: { organizerId: id }
      })
      return res.status(200).send({
        status: 'ok',
        msg: 'Get One Event',
        event: {
          data: eventByOrganizerId,
          total: totalEventById,
          page,
          totalPages: Math.ceil(totalEventById / limit),
        },
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
      const id = +req.params.id
      await prisma.event.delete({
        where: { id: id }
      })
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