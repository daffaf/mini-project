import { addOneYear, addThreeMonth } from "@/helper/date";
import prisma from "@/prisma";
import { Request, Response } from "express";
import { customAlphabet } from "nanoid";
import { compare, genSalt, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars'
import { transporter } from "@/helper/nodemailer";
export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      // validate user image
      console.log(req.file)
      if (!req.file) throw "user image not found !"
      const link = `http://localhost:8000/api/public/user/${req?.file?.filename}`

      const {
        firstname,
        lastname,
        email,
        password,
        role,
        referallCode,
        referallInput,
        referallUsed,
        organizerName,
        organizerImg,
      } = req.body
      const transactionPrisma = await prisma.$transaction(async (tx) => {
        // check if referall code exist
        let referallCodeExist = null;
        if (referallInput) {
          referallCodeExist = await tx.user.findFirst({
            where: { referallCode: referallInput, referallUsed: false }
          })
          if (referallCodeExist?.referallUsed === true) throw 'referall code already used !'
          if (!referallCodeExist) throw 'referall code not found !'
        }
        // check if email already exist
        const emailExist = await tx.user.findUnique({
          where: { email: req.body.email }
        })
        if (emailExist) throw 'email already exist !'

        // hash password
        const salt = await genSalt(10)
        const hashPassword = await hash(password, salt)
        // create new user
        const newUser = await tx.user.create({
          data: {
            firstname,
            lastname,
            email,
            password: hashPassword,
            role,
            userImg: link,
            referallCode,
            referallInput: referallInput,
            referallUsed,
          }
        })
        // create organizer
        if (newUser.role === 'Organizer') {

        }
        // check if there no duplicate referal code
        let generateReferallCode = ''
        if (role != "Organizer") {
          const randomcode = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)
          let isUnique = false
          while (isUnique == false) {
            const tempCode = randomcode(6)
            const checkCode = await tx.user.findFirst({
              where: { referallCode: tempCode }
            })

            if (!checkCode) {
              generateReferallCode = tempCode
              isUnique = true
            }
          }
        } else {
          const defaultImage = `http://localhost:8000/api/public/user/default.png`
          const newOrganizer = await tx.organizer.create({
            data: {
              organizerName,
              organizerImg: defaultImage,
              userId: newUser.id
            }
          })
          console.log(newOrganizer);

        }
        const updateUser = await tx.user.update({
          where: { id: newUser.id },
          data: {
            referallCode: generateReferallCode
          }
        })
        const payload = { id: newUser.id }
        const token = await sign(payload, process.env.SECRET_JWT!, { expiresIn: '1h' })

        const walletExist = await tx.wallet.findUnique({
          where: { userId: newUser.id }
        })

        if (walletExist) throw 'wallet already exist !'
        const newWallet = await tx.wallet.create({
          data: {
            userId: newUser.id,
            pointExpired: new Date()
          }
        })
        // referall code used by user
        if (referallCodeExist) {
          // update owner referall code (user model)
          const updateOwnerReferall = await tx.user.update({
            where: {
              id: referallCodeExist.id
            },
            data: {
              referallUsed: true
            }
          })
          // update referall owner point (wallet model)
          let rewardPoints = 10000
          const updateWallet = await tx.wallet.update({
            where: {
              userId: referallCodeExist.id
            },
            data: {
              point: rewardPoints,
              pointExpired: addThreeMonth
            }
          })
          let rewardCoupon = "firstdiscount10%"
          var newCoupon = await tx.coupon.create({
            data: {
              code: rewardCoupon,
              userId: newUser.id,
              expiredCode: addOneYear
            }
          })
        }
        const getCoupon = await tx.coupon.findUnique({
          where: { userId: newUser.id }
        })
        // nodemailer 
        const templatePath = path.join(__dirname, "../templates", "verification.hbs")
        const templateSrc = fs.readFileSync(templatePath, "utf-8")
        const compiledTemplate = handlebars.compile(templateSrc)
        let fullname = newUser.firstname + ' ' + newUser.lastname
        const html = compiledTemplate({
          name: fullname,
          link: `http://localhost:3000/verify/${token}`
        })

        await transporter.sendMail({
          from: process.env.MAIL_USER,
          to: newUser.email,
          subject: 'Email Verification',
          html: html
        })
        return { newUser, token, newWallet, getCoupon }
      })

      return res.status(200).send({
        status: 'ok',
        msg: 'User Created',
        user: {
          token: transactionPrisma.token,
          data: transactionPrisma.newUser
        },
        wallet: {
          data: transactionPrisma.newWallet
        },
        coupon: {
          data: transactionPrisma.getCoupon
        }
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const existingEmail = await prisma.user.findUnique({
        where: { email: email }
      })
      if (!existingEmail) throw 'email not found !'

      const isValidPassword = await compare(password, existingEmail.password)
      if (!isValidPassword) throw 'incorect password !'

      const isVerify = await prisma.user.findUnique({
        where: { id: existingEmail.id },
      })
      if (!isVerify) throw 'please verify your email !'

      const payload = { id: existingEmail.id, role: existingEmail.role }
      const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '2h' })

      res.status(200).send({
        status: 'ok',
        msg: 'Login Success',
        user: {
          token,
          data: existingEmail
        }
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async getUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany()
      res.status(200).send({
        status: 'ok',
        msg: 'Get All Users',
        users: {
          data: users
        }
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async getOneUser(req: Request, res: Response) {
    try {
      const id = +req.params.id
      const findUser = await prisma.user.findUnique({
        where: { id: id }
      })
      res.status(200).send({
        status: 'ok',
        msg: 'Get One User',
        user: {
          data: findUser
        }
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const user = await prisma.user.findFirst(
        { where: { id: +req.params.id } }
      )
      if (!user) throw 'user not found !'

      const updateUser = await prisma.user.update({
        where: {
          id: user?.id
        },
        data: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          userImg: req.body.user_img,
        }
      })
      res.status(200).send({
        status: 'ok',
        msg: 'user updated',
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async sendVerifyMail(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: +req.body.user?.id }
      })

      const payload = { id: user?.id, role: user?.role }
      const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '2h' })

      const templatePath = path.join(__dirname, "../helper/templates", "verification.hbs")
      const template = fs.readFileSync(templatePath, "utf-8")
      const compiledTemplate = handlebars.compile(template)
      const html = compiledTemplate({
        name: user?.firstname! + user?.lastname!,
        link: `http://localhost:3000/verify/${token}`
      })

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: user?.email,
        subject: "Email Verification",
        html: html
      })
      res.status(200).send({
        status: 'ok',
        msg: "Success send email verification"
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async verifyUser(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: +req.body.user?.id }
      })
      if (user?.isVerify) throw 'invalid link !'
      await prisma.user.update({
        where: { id: user?.id },
        data: { isVerify: true }
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async useReferallCode(req: Request, res: Response) {
    try {
      // const code = req.body.referallInput
      // const referallCode = await prisma.user.findUnique({
      //   where: { referallCode: code }
      // })
      // const referallUsed = await prisma.user.findFirst({
      //   where: {
      //     referallCode: code,
      //     referallUsed: false
      //   }
      // })
      // if (!referallCode) throw 'referall code not found !'
      // if (!referallUsed) throw 'referall code already used !'
      // const updateReferallCode = await prisma.user.update({
      //   where: {
      //     referallCode: referallCode?.referallCode,
      //     referallUsed: false
      //   },
      //   data: {
      //     referallUsed: true
      //   }
      // })
      // const updateUserReferallInput = await prisma.user.update({
      //   where: {
      //     id: +req.params.id
      //   },
      //   data: {
      //     referallInput: req.body.referallInput
      //   }
      // })

      return res.status(200).send({
        status: 'ok',
        msg: 'referall code used successfully',
        // updateReferallCode,
        // updateUserReferallInput
      })
    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const id = +req.params.id
      const deleteUser = await prisma.user.delete({
        where: { id: id }
      })

      return res.status(200).send({
        status: 'ok',
        msg: 'Success Delete User'
      })

    } catch (err) {
      return res.status(400).send({
        status: 'fail',
        msg: err
      })
    }
  }

}