import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
/**
 * getGithubUser asyncThunk declared
 * Retrieves the github user
 * async function has one param username
 * response assigned the value of the fetch call to the backend api
 * data assigned the parsed response from json and returned
 */
export const getGithubUser = createAsyncThunk('githubUser/getGithubUser',
    async (username) => {
      const response = await fetch(`/github/${username}`);
      const data = response.json();
      return data;
    });
/**
 * githubUserSlice created
 * default initial state declared,
 * githubUser - empty array
 * status - empty string
 * error as null value
 * ExtraReducers (thunks promises handled)
 * .pending
 * sets status to loading
 * .fulfilled
 * sets status to success
 * githubUser is assigned the value of the payload
 * .rejected
 * sets status to rejected
 * error set to payload
 */
const githubUserSlice = createSlice({
  name: 'githubUser',
  initialState: {
    githubUser: [],
    status: '',
    error: null,
  },
  extraReducers: {
    [getGithubUser.pending]: (state) => {
      state.status = 'loading';
    },
    [getGithubUser.fulfilled]: (state, action) => {
      state.status = 'success';
      state.githubUser = action.payload;
    },
    [getGithubUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
// slices reducer exported
export default githubUserSlice.reducer;
