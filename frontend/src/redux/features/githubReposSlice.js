import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
/**
 * getGithubRepos asyncthunk created
 * async function has username as param
 * response assigned the result of the fetch to the backend endpoint
 * data assigned the value of the response parsed from json and returned
 */
export const getGithubRepos = createAsyncThunk('githubRepos/getGithubRepos',
    async (username) => {
      const response = await fetch(`/github/repos/${username}`);
      const data = response.json();
      return data;
    });
/**
 * githubRepoSlice declared
 * with default state,
 * githubRepos - empty array
 * status - empty string
 * error - null
 * ExtraReducers, handling asyncThunk promises
 * .pending
 * status is set to loading
 * .fulfilled
 * status is set to success
 * githubRepos is set to payload (data from thunk)
 * .rejected
 * status is set to rejected
 * error is set to payload (data from thunk)
 */
const githubReposSlice = createSlice({
  name: 'githubRepos',
  initialState: {
    githubRepos: [],
    status: '',
    error: null,
  },
  extraReducers: {
    [getGithubRepos.pending]: (state) => {
      state.status = 'loading';
    },
    [getGithubRepos.fulfilled]: (state, action) => {
      state.status = 'success';
      state.githubRepos = action.payload;
    },
    [getGithubRepos.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
// slice's reducer is exported
export default githubReposSlice.reducer;
