import { IUserState } from '@/type/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IUserState = {
  id: 0,
  firstname: '',
  lastname: '',
  email: '',
  role: '',
  userImg: '',
  referallCode: '',
  referallUsed: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<IUserState>) => {
      const { id, firstname, lastname, email, role, userImg, referallCode, referallUsed } = action.payload

      state.id = id
      state.firstname = firstname
      state.lastname = lastname
      state.email = email
      state.role = role
      state.userImg = userImg
      state.referallCode = referallCode,
        state.referallUsed = referallUsed
    },
    logoutAction: (state) => {
      state.id = 0
      state.firstname = ''
      state.lastname = ''
      state.email = ''
      state.role = ''
      state.userImg = ''
      state.referallCode = ''
      state.referallUsed = false
    }
  }
})

export const { loginAction, logoutAction } = userSlice.actions
export default userSlice.reducer