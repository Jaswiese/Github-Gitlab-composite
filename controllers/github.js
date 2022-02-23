// fetch imported to be used for api calls
import fetch from 'node-fetch';
/**
 * getGithubUser async callback function
 * @param {*} req represents the call to the endpoint
 * @param {*} res respond object sent to the user
 * function logic is wrapped in a try catch block for debugging
 * username declared from params
 * url to the api declared with username as param
 * options declared specifying that it is a get request
 * response is assigned the return value of the fetch call
 * inside fetch,
 * the response is parsed from json
 * catch added for error handling
 * -message printed to console with error message and error event
 * on success,
 * message is printed to the server console
 * response is sent as json to the user
 * catch block that sends erorr and status to the user
 * -this function returns a single users information
 */
export const getGithubUser = async (req, res) => {
  try {
    const username = req.params.username;
    const url = `https://api.github.com/users/${username}`;
    const options = {
      'method': 'GET',
    };
    const response = await fetch(url, options)
        .then((res) => res.json())
        .catch((e) => {
          console.error({
            'message': 'error in connecting to github',
            'error': e,
          });
        });
    console.log('succesful connection to github user');
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
/**
 * getGithubUsers
 * primary purpose: returns users matching the given username
 * the logic for this call is repeated from the above function
 * the only change is that the url variable differs to a query
 * @param {*} req represents the call to the endpoint
 * @param {*} res respond object sent to the user
 */
export const getGithubUsers = async (req, res) => {
  try {
    const username = req.params.username;
    const url = `https://api.github.com/search/users?q=${username}`;
    const options = {
      'method': 'GET',
    };
    const response = await fetch(url, options)
        .then((res) => res.json())
        .catch((e) => {
          console.error({
            'message': 'error on connecting to github',
            'error': e,
          });
        });
    console.log('successful connection fetched github users');
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
/**
 * getGithubRepos
 * Retrieves the list of repositories for the username specified
 * Logic is again a duplication thoroughly explained earlier
 * @param {*} req represents the call to the endpoint
 * @param {*} res respond object sent to the user
 */
export const getGithubRepos = async (req, res) => {
  try {
    const username = req.params.username;
    const url = `https://api.github.com/users/${username}/repos`;
    const options ={
      'method': 'GET',
    };
    const response = await fetch(url, options)
        .then((res) => res.json())
        .catch((e) => {
          console.error({
            'message': 'error on connection to github repos',
            'error': e,
          });
        });
    console.log('succesful connection to githubRepos');
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
/**
 * getGithubRepoCommits
 * Retrieves the list of commits for a repository for a specific username
 * Duplication of earlier logic with only the url altered for endpoint
 * @param {*} req represents the call to the endpoint
 * @param {*} res respond object sent to the user
 */
export const getGithubRepoCommits = async (req, res) => {
  try {
    const username = req.params.username;
    const repository = req.params.repository;
    const url = `https://api.github.com/repos/${username}/${repository}/commits`;
    const options = {
      'method': 'GET',
    };
    const response = await fetch(url, options)
        .then((res) => res.json())
        .catch((e) => {
          console.error({
            'message': 'error on connecting to the github',
            'error': e,
          });
        });
    console.log('succesful connection');
    response.slice(0, 5);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
// github callbacks assigned to the githubController object
const githubController = {
  getGithubUser,
  getGithubUsers,
  getGithubRepoCommits,
  getGithubRepos};
// exporting githubController
export default githubController;
