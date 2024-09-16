import prisma from "@/prisma";
import { Request, Response } from "express";

export class CategoryController {
  async createCategory(req: Request, res: Response) {
    try {
      const { categoryName } = req.body;
      const checkCategory = await prisma.eventCategory.findUnique({
        where: { categoryName: categoryName }
      })
      if (checkCategory) throw 'This Category Already Exist !'
      const newCategory = await prisma.eventCategory.create({
        data: {
          categoryName
        }
      })
      res.status(201).send({
        status: 'ok',
        eventCategory: {
          data: newCategory
        }
      })
    } catch (err) {
      res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async getCategories(req: Request, res: Response) {
    try {
      const categories = await prisma.eventCategory.findMany();
      res.status(200).send({
        status: 'ok',
        eventCategory: {
          data: categories
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