import { IOrgazinerState } from "@/type/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IOrgazinerState = {
  id: 0,
  organizerName: '',
  organizerImg: '',
  userId: 0
}

export const organizerSlice = createSlice({
  name: 'organizer',
  initialState,
  reducers: {
    getOrganizerAction: (state, action: PayloadAction<IOrgazinerState>) => {
      const { id, organizerName, organizerImg, userId } = action.payload

      state.id = id
      state.organizerName = organizerName
      state.organizerImg = organizerImg
      state.userId = userId
    }
  }
})
export const { getOrganizerAction } = organizerSlice.actions
export default organizerSlice.reducer