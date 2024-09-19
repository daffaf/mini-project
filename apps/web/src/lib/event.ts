export const getEventsByOrganizerId = async (
  organizerId: number,
  page: number,
  limitPage: number | 1,
  sortBy: string,
  search?: string
) => {

  const res = await fetch(`http://localhost:8000/api/events/${organizerId}?page=${page}&sortBy=${sortBy}&limit=${limitPage}&sortOrder=asc&search=${search}`)
  const result = await res.json()
  return {
    result,
    events: result.event.data,
    total: result.event.total,
    organizerRes: result.event.data.organizer,
    ok: res.ok
  }
}
export const getAllEventByOrganizerId = async (organizerId: number) => {
  const res = await fetch(`http://localhost:8000/api/events/${organizerId}`)
  const result = await res.json()

  return {
    allEvent: result.event.allEvent,
    ok: res.ok
  }
}
export const getEventById = async (id: number) => {
  const res = await fetch(`http://localhost:8000/api/events/detail/${id}`)
  const result = await res.json()

  return {
    result,
    ok: res.ok,
    event: result.event.data
  }
}