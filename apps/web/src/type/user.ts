export interface IUserReg {
  firstname: string
  lastname: string
  email: string
  password: string
  role: string
  userImg?: File
  referallCode?: string
}

export interface IUserLogin {
  email: string
  password: string
}

export interface IUserState {
  id: number
  firstname: string
  lastname: string
  email: string
  role: string
  userImg?: string
}

export interface IOrgazinerState {
  id?: number
  organizerName?: string
  organizerImg?: string
  userId?: number
}