
export const getOrganizerById = async (id: number = 0) => {
  const res = await fetch(`http://localhost:8000/api/users/organizer/${id}`)
  const result = await res.json()

  return { result, ok: res.ok }
}