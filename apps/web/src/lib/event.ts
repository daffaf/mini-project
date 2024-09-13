export const getEventsByOrganizerId = async (organizerId: number) => {
  const res = await fetch(`http://localhost:8000/api/events/${organizerId}?page=1&limit=3&sortBy=eventStatus&sortOrder=asc`)
  const result = await res.json()

  return {
    result,
    events: result.event.data,
    total: result.event.total,
    organizerRes: result.event.data.organizer,
    ok: res.ok
  }
}