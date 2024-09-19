import prisma from "@/prisma";
import { Request, Response } from "express";

export class OrganizerController {
  async getOrganizers(req: Request, res: Response) {
    try {
      const organizers = await prisma.organizer.findMany();
      return res.status(200).send({
        status: 'ok',
        msg: 'Get All Organizer',
        organizers: {
          data: organizers
        }
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async getOrganizer(req: Request, res: Response) {
    try {
      const id = +req.params.id
      const organizer = await prisma.organizer.findUnique({
        where: { id: id }
      })
      res.status(201).send({
        status: 'ok',
        msg: 'Get One Organizer',
        organizer: {
          data: organizer
        }
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async getOrganizerByUserId(req: Request, res: Response) {
    try {
      const userid = +req.params.id
      const organizer = await prisma.organizer.findUnique({
        where: { userId: userid },
        include: {
          user: true,
          event: true,
          voucher: true
        }
      })
      res.status(201).send({
        status: 'ok',
        msg: 'Get One Organizer',
        organizer: {
          data: organizer,
          user_firstname: organizer?.user.firstname,
          user_lastname: organizer?.user.lastname
        }
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async createOrganizer(req: Request, res: Response) {
    try {
      const {
        userId,
        organizerName,
        organizerImg,
      } = req.body
      const getUser = await prisma.user.findUnique({
        where: { id: +userId }
      })
      const newOrganizer = await prisma.organizer.create({
        data: {
          organizerName,
          organizerImg,
          userId: getUser?.id!
        }
      })
      res.status(200).send({
        status: 'ok',
        msg: 'Success Create Organizer',
        organizer: {
          data: newOrganizer
        }
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async deleteOrganizer(req: Request, res: Response) {
    try {
      const id = +req.params.id
      const deleteOrganizer = await prisma.organizer.delete({
        where: { id: id }
      })
      res.status(200).send({
        status: 'ok',
        msg: 'Success Delete Organizer'
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async updateOrganizer(req: Request, res: Response) {
    try {
      const { organizerName, organizerImg } = req.body
      const id = await prisma.organizer.findUnique({
        where: { id: +req.params.id },
      })
      const updateOrganizer = await prisma.organizer.update({
        where: { id: id?.id },
        data: {
          organizerName,
          organizerImg
        }
      })
      return res.status(200).send({
        status: 'ok',
        organizer: {
          data: updateOrganizer
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