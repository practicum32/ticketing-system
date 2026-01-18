export type Ticket = {
  ticketId: number
  userId: number
  subject: string
  description: string
  isClosed: boolean
}

export type NewTicket = {
  subject: string
  description: string
  userId: number
}
