/* eslint-disable max-len */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
/**
 * getGitlabProjects AsyncThunk declared
 * retrieves the gitlab projects of a user
 * async func has username as param used within the fetch request
 * response assigned the fetch requests result
 * data assigned the parsed response from json and returned
 */
export const getGitlabProjects = createAsyncThunk('gitlabProj/getGitlabProjects',
    async (username) => {
      const response = await fetch(`/gitlab/repo/${username}`);
      const data = response.json();
      return data;
    });
/**
 * gitlabProjSlice declared
 * default initialState declared,
 * gitlabProj - empty array
 * status - empty string
 * error - null value
 * ExtraReducers (handles thunk)
 * .pending
 * status set to loading
 * .fulfilled
 * status set to success
 * gitlabProj set to payload
 * .rejected
 * status set to rejected
 * state error set to payload
 */
const gitlabProjSlice = createSlice({
  name: 'gitlabProj',
  initialState: {
    gitlabProj: [],
    status: '',
    error: null,
  },
  extraReducers: {
    [getGitlabProjects.pending]: (state) => {
      state.status = 'loading';
    },
    [getGitlabProjects.fulfilled]: (state, action) => {
      state.status = 'success';
      state.gitlabProj = action.payload;
    },
    [getGitlabProjects.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
// reducer exported
export default gitlabProjSlice.reducer;
