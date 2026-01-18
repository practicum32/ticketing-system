import { NewTicket, Ticket } from '../models/Ticket'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5199'

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text()
    let msg = `HTTP ${res.status}`
    try {
      const j = JSON.parse(text)
      msg = j.error || msg
    } catch {}
    throw new Error(msg)
  }
  if (res.status === 204) {
    // No content
    return undefined as unknown as T
  }
  return res.json()
}

export async function getTickets(): Promise<Ticket[]> {
  const res = await fetch(`${BASE_URL}/tickets`)
  return handle<Ticket[]>(res)
}

export async function createTicket(data: NewTicket): Promise<Ticket> {
  const res = await fetch(`${BASE_URL}/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: data.userId,
      subject: data.subject,
      description: data.description,
    }),
  })
  return handle<Ticket>(res)
}

export async function closeTicket(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/tickets/${id}/close`, { method: 'PUT' })
  return handle<void>(res)
}
