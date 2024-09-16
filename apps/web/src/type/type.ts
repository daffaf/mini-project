export interface IUserReg {
  firstname: string
  lastname: string
  email: string
  password: string
  role: string
  userImg?: File
  referallCode?: string

  // organizer
  organizerName?: string
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
  id: number
  organizerName: string
  organizerImg: string
  userId: number
}

export interface IEventState {
  id: number
  eventName: string
  eventDate: string
  eventTime: string
  eventImg: string
  eventDescription: string
  eventStatus: string
  ticketPrice: number
  ticketQuantity: number
  ticketSold: number
  location: {
    city: string
  }
  organizer: {
    organizerName: string
  }
  category: string
}
export interface IEventReduxState {
  id: number
  eventName: string
  eventDate: string
  eventStart: string
  eventEnd: string
  eventImg: string
  eventDescription: string
  eventStatus: string
  ticketPrice: number
  ticketQuantity: number
  ticketSold: number
  location: {
    city: string
  }
  category: string
}

