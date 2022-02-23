// configureStore imported from toolkit - used to consolidate different state
import {configureStore} from '@reduxjs/toolkit';
// all reducers are imported from corresponding slices
import githubReducer from '../features/githubUsersSlice';
import targetUsernameReducer from '../features/targetUsernameSlice';
import gitlabUsersReducer from '../features/gitlabUsersSlice';
import githubUserReducer from '../features/githubUserSlice';
import githubCommitsReducer from '../features/githubCommitsSlice';
import githubReposReducer from '../features/githubReposSlice';
import gitlabProjReducer from '../features/gitlabProjectsSlice';
import gitlabCommitsReducer from '../features/gitlabCommitsSlice';

/** ConfigureStore - configure Redux store
 * all reducers consolidated and exported as a single store
 */
export default configureStore({
  reducer: {
    githubUsers: githubReducer,
    targetUsername: targetUsernameReducer,
    gitlabUsers: gitlabUsersReducer,
    githubUser: githubUserReducer,
    githubCommits: githubCommitsReducer,
    githubRepos: githubReposReducer,
    gitlabProj: gitlabProjReducer,
    gitlabCommits: gitlabCommitsReducer,
  },
});
