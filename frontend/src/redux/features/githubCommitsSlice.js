/* eslint-disable max-len */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
/**
 * getGithubCommits asyncThunk created
 * used to retrieve the github commits from the backend api
 * two params are passed to the async function
 * both params are used within the endpoint construction
 * data is parsed from json and returned
 */
export const getGithubCommits = createAsyncThunk( 'githubCommits/getGithubCommits',
    async ({username, repo}) => {
      const response = await fetch(`/github/${username}/${repo}`);
      const data = response.json();
      return data;
    },
);
/**
 * githubCommitSlice declared
 * state named: githubCommit
 * initial state declared with,
 * githubCommits as an empty array
 * status as an empty string
 * error as null
 */
export const githubCommitsSlice = createSlice({
  name: 'githubCommits',
  initialState: {
    githubCommits: [],
    status: '',
    error: null,
  },
  /**
   * extraReducers declared handling promise state of the asyncThunk
   * .pending
   * status set to loading
   * .fulfilled
   * status set to success
   * githubCommits set to the payload from the thunk
   * .rejected
   * status set to rejected
   * error set to payload
   */
  extraReducers: {
    [getGithubCommits.pending]: (state) => {
      state.status = 'loading';
    },
    [getGithubCommits.fulfilled]: (state, action) => {
      state.status = 'success';
      state.githubCommits = action.payload;
    },
    [getGithubCommits.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
// slice reducer is exported
export default githubCommitsSlice.reducer;
