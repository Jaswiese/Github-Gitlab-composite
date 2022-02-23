import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
/**
 * getGitlabUsers
 * retrieves gitlab user(s)
 * async has one param username used with fetch request
 * response assigned fetch request result
 * data assigned the parsed requests value and returned
 */
export const getGitlabUsers = createAsyncThunk('gitlabUsers/getGitlabUsers',
    async (username) => {
      const response = await fetch(`/gitlab/${username}`);
      const data = response.json();
      return data;
    });
/**
 * gitlabUserSlice
 * default sate declared,
 * gitlabUsers - empty array
 * status - empty string
 * error - null value
 * ExtraReducers (handles thunk),
 * .pending
 * status set to loading
 * .fulfilled
 * status set to success
 * gitlabUsers set to payload
 * .rejected
 * status set to rejected
 * error set to payload
 */
const gitlabUsersSlice = createSlice({
  name: 'gitlabUsers',
  initialState: {
    gitlabUsers: [],
    status: '',
    error: null,
  },
  extraReducers: {
    [getGitlabUsers.pending]: (state) => {
      state.status = 'loading';
    },
    [getGitlabUsers.fulfilled]: (state, action) => {
      state.status = 'success';
      state.gitlabUsers = action.payload;
    },
    [getGitlabUsers.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
// reducer exported
export default gitlabUsersSlice.reducer;
