// fetch imported to be used within the api requests to gitlab
import fetch from 'node-fetch';
// initial function will be explained in depth (due to duplication of logic)
/**
 * getGitlabUser
 * returns a single gitlab user from the gitlab api
 * logic wrapped in a try catch block for debugging purposes.
 * username assigned the value from the request
 * url assigned the gitlab end point with username as query param
 * options assigned as a get method
 * response variable assigned the result of the get request to the endpoint
 * res is parsed from json
 * catch added for error,
 * logs an error with message to the console
 * if successful,
 * response is sent as json to the user
 * catch block used to catch any error and log to console
 * a status of 500 is also sent to the user
 * @param {*} req represents the call to the endpoint
 * @param {*} res respond object sent to the user
 */
export const getGitlabUser = async (req, res) => {
  try {
    const username = req.params.username;
    const url = `https://gitlab.com/api/v4/users?username=${username}`;
    const options = {
      'method': 'GET',
    };
    const response = await fetch(url, options)
        .then((res) => res.json())
        .catch((e) => {
          console.error({
            'message': 'error in connecting to gitlab',
            'error': e,
          });
        });
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};
/**
 * getGitlabRepositories
 * Retrieves the list of repositories of a user (projects)
 * differing logic - endpoint change with username still as param
 * @param {*} req represents the call to the endpoint
 * @param {*} res respond object sent to the user
 */
export const getGitlabRepositories = async ( req, res) => {
  try {
    const username = req.params.username;
    const url = `https://gitlab.com/api/v4/users/${username}/projects`;
    const options = {
      'method': 'GET',
    };
    const response = await fetch(url, options)
        .then((res) => res.json())
        .catch((e) => {
          console.error({
            'message': 'error in connecting to gitlab repositories',
            'error': e,
          });
        });
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};
/**
 * getGitlabCommits
 * retrieves the commits for a specific repository using its projectID
 * @param {*} req represents the call to the endpoint
 * @param {*} res respond object sent to the user
 */
export const getGitlabCommits = async ( req, res) => {
  try {
    const projectID = req.params.projectid;
    const url = `https://gitlab.com/api/v4/projects/${projectID}/repository/commits`;
    const options = {
      'method': 'GET',
    };
    const response = await fetch(url, options)
        .then((res) => res.json())
        .catch((e) => {
          console.error({
            'message': 'error in connecting to gitlab projects commits data',
            'error': e,
          });
        });
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};
// all async functions assigned to the gitlabController object
const gitlabController = {
  getGitlabUser,
  getGitlabRepositories,
  getGitlabCommits};
// gitlabController object exported
export default gitlabController;
