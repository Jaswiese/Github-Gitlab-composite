/* eslint-disable max-len */
import React from 'react';
// bootstrap components imported
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
// redux hooks imported
import { useDispatch, useSelector } from 'react-redux';
// users component imported
import Users from './Users';
// slice actions imported
import { setTargetUsername } from '../redux/features/targetUsernameSlice';
import { getGithubUsers } from '../redux/features/githubUsersSlice';
import { getGitlabUsers } from '../redux/features/gitlabUsersSlice';
// css imported
import '../resources/css/homepage.css';
/**
 * Homepage component
 * styles from homepage.css and bootstrap components used for layout
 * bootstrap also used for layout styling
 * Displays the search bar and github repos and gitlab projects as children
 * @return {*} displays the homepage to the user
 */
function Homepage() {
  // useDispatch declared as dispatch variable
  const dispatch = useDispatch();
  // state status synced used for display logic
  const gitHubUsersStatus = useSelector((state) => state.githubUsers.status);
  const gitlabUsersStatus = useSelector((state) => state.gitlabUsers.status);
  // targetUsername retrieved with the useSelector hook
  const targetUsername = useSelector((state) => state.targetUsername.username);
  // lab & hub users state retrieved with useSelector hook
  const githubUsers = useSelector((state) => state.githubUsers.githubUsers);
  const gitlabUsers = useSelector((state) => state.gitlabUsers.gitlabUsers);
  // need to add search functions and handling of data here
  /**
   * onTargetUserNameChange function
   * handles user input into the search bar
   * calls dispatch to fire the setTargetUsername action,
   * with the event value as payload
   * @param {*} e input event
   */
  const onTargetUserNameChange = (e) => {
    dispatch(setTargetUsername(e.target.value));
  };
  /**
   * search function
   * calls dispatch to fire the getGithubUsers & getGitlabUsers actions,
   * with username param as payload
   * @param {*} username param used for redux actions
   */
  const search = (username) => {
    dispatch(getGithubUsers(username));
    dispatch(getGitlabUsers(username));
  };
  /**
   * displayGithub function
   * used as a display helper function, depending on the status of the fetch state
   * If the data is still loading or undefined the function returns a Spinner
   * If the status is success (data is fetched)
   * an array of users is created
   * the function then returns Users components with a map function
   * assigning the props on each iteration
   * by default or in the case of an error,
   * an appropriate heading is returned
   * @param {*} status gitHubUsersStatus
   * @return {*} html for github profiles
   */
  const displayGithub = (status) => {
    if (status === 'loading' || status === 'undefined') {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
    if (status === 'success') {
      const arrOfGithubUsers = githubUsers.items;

      return (
        <>
          <h4 className="text-center">Github user profiles</h4>
          <Container fluid className="users-container-home">
            {arrOfGithubUsers.map((user) => (
              <Users
                key={user.id}
                id={user.id}
                img={user.avatar_url}
                name={user.login}
                platform="github"
              />
            ))}
          </Container>
        </>
      );
    }
    return (
      <h4 className="text-center pt-5">
        Search for github users profiles to be displayed
      </h4>
    );
  };
  /**
   * displayGitlab function
   * helper function to aid in display depending on application state
   * if the gitlab data is still being retrieved,
   * a spinner is displayed
   * if the data is successfully retrieved,
   * A map function is called to return Users component with props,
   * on each iteration.
   * Default state
   * a message displayed to prompt the user to search
   * @param {*} status gitlab users data state
   * @return {*} html to display gitlab users
   */
  const displayGitlab = (status) => {
    if (status === 'loading' || status === 'undefined') {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
    if (status === 'success') {
      return (
        <>
          <h4 className="text-center pt-5">Gitlab user profile(s)</h4>
          <Container fluid className="users-container-home">
            {gitlabUsers.map((user) => (
              <Users
                key={user.id}
                id={user.id}
                name={user.username}
                img={user.avatar_url}
                platform="gitlab"
              />
            ))}
          </Container>
        </>
      );
    }
    return (
      <h4 className="text-center pt-5">
        Search for gitlab users profiles to be displayed
      </h4>
    );
  };
  /**
   * Primary return of the Homepage component
   * BootStrap components & css used for layout
   * on the search bar (text input) field,
   * value is set to the targetUsername variable
   * onChange the onTargetUserNameChange function is called
   * on the search button,
   * a test id is added
   * onclick event is added that fires the search function
   * at the bottom both display functions are called,
   * with their corresponding status variables as params
   */
  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <Col className="col-md-6">
            <h1 className="text-center">Git Composite Search🔍</h1>
          </Col>
        </Row>
        <Row className="justify-content-center pt-2">
          <Col className="col-md-8 justify-content-center">
            <div className="search-bar-container d-flex justify-content-center">
              <label htmlFor="searchBar" className="search-label" />
              <input
                type="text"
                className="search-bar"
                placeholder="search github/gitlab username here"
                name="search-bar"
                id="search-bar"
                value={targetUsername}
                onChange={onTargetUserNameChange}
              />
              <button
                data-testid="search-button"
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  search(targetUsername);
                }}
              >
                Search
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      {displayGithub(gitHubUsersStatus)}
      {displayGitlab(gitlabUsersStatus)}
    </>
  );
}

export default Homepage;
