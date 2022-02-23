import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
/**
 * getGithubUsers asyncThunk created
 * retrieves the list of github users
 * async has one param username used within fetch call
 * data assigned the parsed response from json value
 */
export const getGithubUsers = createAsyncThunk('githubUsers/getGithubUsers',
    async (username) => {
      const response = await fetch(`/github/search/${username}`);
      const data = response.json();
      return data;
    });
/**
 * githubUsersSlice created
 * default state declared,
 * githubUsers - empty array
 * status -  empty string
 * error - null value
 * ExtraReducers (asyncThunk promise handler)
 * .pending
 * status set to loading
 * .fulfilled
 * status set to success
 * githubUsers assigned the value of the payload (data)
 * .rejected
 * status set to rejected
 * error set to the payload (data)
 */
const githubUsersSlice = createSlice({
  name: 'githubUsers',
  initialState: {
    githubUsers: [],
    status: '',
    error: null,
  },
  extraReducers: {
    [getGithubUsers.pending]: (state) =>{
      state.status = 'loading';
    },
    [getGithubUsers.fulfilled]: (state, action) => {
      state.status = 'success';
      state.githubUsers = action.payload;
    },
    [getGithubUsers.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
// reducer exported
export default githubUsersSlice.reducer;
