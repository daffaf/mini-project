import { IOrgazinerState, IUserLogin, IUserReg } from "@/type/user"

const BASE_URL = process.env || 'localhost:8000/api/'

export const registerUser = async (data: IUserReg) => {
  const formData = new FormData()

  formData.append('firstname', data.firstname);
  formData.append('lastname', data.lastname);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('role', data.role);
  if (data.userImg) {
    formData.append('userImg', data.userImg);
  }
  const res = await fetch(`http://localhost:8000/api/users`, {
    method: 'POST',
    // body: JSON.stringify(data),
    body: formData

  })
  const result = await res.json()
  return { result, ok: res.ok }
}

export const loginUser = async (data: IUserLogin) => {
  const res = await fetch(`http://localhost:8000/api/users/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const result = await res.json()
  if (result.ok) {
    const userId = result.data.id
    const res = await fetch(`http://localhost:8000/api/users/organizers/1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const organizerRes = await res.json()
    console.log(organizerRes)
    return { result, ok: res.ok, organizer: organizerRes }
  } else {
    return { result, ok: res.ok }
  }
}

export const getOrganizer = async (data: IOrgazinerState) => {
  const res = await fetch(`http://localhost:8000/api/organizers/${data.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
