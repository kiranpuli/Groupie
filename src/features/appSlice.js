import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    groupId: null,
    groupName: null
  },
  reducers: {
    setGroup: (state,action) => {
      state.groupId=action.payload.groupId;
      state.groupName=action.payload.groupName;

    }
  }
});

export const { setGroup } = appSlice.actions;

export const selectGroupId = state => state.app.groupId;
export const selectGroupName = state => state.app.groupName;

export default appSlice.reducer;
