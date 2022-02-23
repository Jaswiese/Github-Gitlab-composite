import {createSlice} from '@reduxjs/toolkit';
// default initial state declared
const initialState = {
  username: '',
};
// targetUsername slice declared (handles user search input state)
export const targetUsernameSlice = createSlice({
  name: 'targetUsername',
  initialState,
  reducers: {
    // setTargetUsername action - sets username to payload value
    setTargetUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});
// action exported
export const {setTargetUsername} = targetUsernameSlice.actions;
// slices reducer exported
export default targetUsernameSlice.reducer;
