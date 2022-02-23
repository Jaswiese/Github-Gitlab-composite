/* eslint-disable max-len */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
/**
 * gitlabCommits asyncThunk declared
 * used to return gitlab projects commits
 * Async func has two params username and projectid used with the fetch request
 * response is assigned the fetch requests return value
 * data is assigned the parsed request from json and returned
 */
export const getGitlabCommits = createAsyncThunk('gitlabCommit/getGitlabCommits',
    async ({username, projectid}) => {
      const response = await fetch(`/gitlab/${username}/${projectid}`);
      const data = response.json();
      return data;
    },
);
/**
 * gitlabCommitSlice declared
 * default initial state declared
 * gitlabCommits - empty array
 * status - empty string
 * error - null value
 * ExtraReducers - (handles thunk)
 * .pending
 * status set to loading
 * .fulfilled
 * .status set to success
 * gitlabCommits set to the payload
 * .rejected status set to rejected
 * error set to the payload
 */
const gitlabCommitSlice = createSlice({
  name: 'gitlabCommits',
  initialState: {
    gitlabCommits: [],
    status: '',
    error: null,
  },
  extraReducers: {
    [getGitlabCommits.pending]: (state) => {
      state.status = 'loading';
    },
    [getGitlabCommits.fulfilled]: (state, action) => {
      state.status = 'success';
      state.gitlabCommits = action.payload;
    },
    [getGitlabCommits.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
// reducer exported
export default gitlabCommitSlice.reducer;
