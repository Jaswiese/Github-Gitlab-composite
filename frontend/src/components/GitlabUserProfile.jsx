/* eslint-disable consistent-return */
import React, {useEffect} from 'react';
// bootstrap components are imported
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
// useParams hook imported
import {useParams} from 'react-router-dom';
// redux hooks imported
import {useDispatch, useSelector} from 'react-redux';
// css imported
import '../resources/css/userProfile.css';
// actions imported
import {getGitlabUsers} from '../redux/features/gitlabUsersSlice';
import {getGitlabProjects} from '../redux/features/gitlabProjectsSlice';
// component is imported
import GitlabProject from './GitlabProject';
/**
 * GitlabUserProfile component
 * display the user profile - bio and projects to the user
 * @returns {*} html that displays the users bio and gitlab projects to the user
 */
function GitlabUserProfile() {
  // username assigned from the params object
  const {username} = useParams();
  // dispatch assigned the useDispatch hook
  const dispatch = useDispatch();
  // useSelector hook used to track various redux state changes
  const profileStatus = useSelector((state) => state.gitlabUsers.status);
  const projectStatus = useSelector((state) => state.gitlabProj.status);
  const profileInfo = useSelector((state) => state.gitlabUsers.gitlabUsers);
  const projectInfo = useSelector((state) => state.gitlabProj.gitlabProj);
  // useEffect hook used to fire data retrieval actions on first render of the profile
  useEffect(() => {
    dispatch(getGitlabUsers(username));
    dispatch(getGitlabProjects(username));
  }, []);
  /**
   * validatorString
   * helper function to validate empty strings
   * @param {*} input value
   * @returns {*} the same input, however if its an empty string will return an appropriate string
   */
  const validatorString = (input) => {
    if (input === '') {
      return 'not available';
    }
    return input;
  };
  /**
   * displayUserInfo function
   * display helper function that helps the display to change dynamically
   * if the data is still be retrieved a spinner will be displayed to the user
   * if succesfully retrieved,
   * the userobj is extracted from the profileInfo state
   * and variables are declared with shorthand
   * each variable is passed through the validatorString function and the reassigned to its result
   * the results are assigned to the corresponding elements that is returned to the user
   * @param {*} status - param that tracks the state of the data retrieval
   * @returns {*} varying html depending on the state of the application
   */
  const displayUserInfo = (status) => {
    if (status === 'loading' || status === undefined) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...Bio</span>
          </Spinner>
        </div>
      );
    }
    if (status === 'success') {
      const userObj = profileInfo[0];
      let {name, state, id} = userObj;
      let imgUrl = userObj.avatar_url;
      let web = userObj.web_url;
      name = validatorString(name);
      state = validatorString(state);
      id = validatorString(id);
      imgUrl = validatorString(imgUrl);
      web = validatorString(web);
      return (
        <Col className="col-md-4 justify-content-center">
          <div className="bio-container">
            <div className="img-wrap-container-profile">
              <img src={imgUrl} alt="profile" className="img-profile"/>
            </div>
            <div className="personal-details-wrap-profile">
              <ul className='bio-list-profile'>
                <li>
                  <p className="text-profile-bio">
                    <b>Name:</b> {name}
                  </p>
                </li>
                <li>
                  <p className="text-profile-bio">
                    <b>Username:</b> {username}
                  </p>
                </li>
                <li>
                  <p className="text-profile-bio">
                    <b>Online:</b> {state}
                  </p>
                </li>
                <li>
                  <p className="text-profile-bio">
                    <b>id:</b> {id}
                  </p>
                </li>
                <li>
                  <p className="text-profile-bio">
                    <b>Gitlab:</b> <a href={web}>View Gitlab</a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Col>
      );
    }
  };
  /**
   * displayProjectInfo
   * helper function that changes the display shown to the user depending on the state of the data retrieved
   * if still retrieving a spinner is shown to the user
   * if successful,
   * the Gitlab component has the projectInfo states values added as props on each iteration
   * these components if multiple projects exists are displayed to the user
   * @param {*} status 
   * @returns 
   */
  const displayProjectInfo = (status) => {
    if (status === 'loading' || status === undefined) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...Projects</span>
          </Spinner>
        </div>
      );
    }
    if (status === 'success') {
      if (typeof projectInfo === 'undefined') {
        return (
          <div className="d-flex justify-content-center align-items-center">
            <h4>No projects found for this user</h4>
          </div>
        );
      }
      const arrayOfProj = projectInfo;
      return (
        <Row className="justify-content-center">
          {arrayOfProj.map((proj) =>(
            <GitlabProject
              key={proj.id}
              id={proj.id}
              name={proj.name}
              username = {username}
              description={proj.description}
              created={proj.created_at}
              updated={proj.last_activity_at}
            />
          ))}
        </Row>
      );
    }
  };
  /**
   * primary component render
   * bootstrap components & css are used to aid with layout
   * the two display functions are called to display varying data depending on the application state
   */
  return (
    <Container fluid>
      <Row className="justify-content-center p-5">
        <Col className="col-md-8">
          <h1 className="text-center"> Gitlab User Profile 👨‍🔬️</h1>
        </Col>
      </Row>
      <Row className="justify-content-center p-5">
        {displayUserInfo(profileStatus)}
      </Row>
      <Row>
        <Col>
          <h1 className="text-center"> Project details 📚</h1>
        </Col>
      </Row>
      {displayProjectInfo(projectStatus)}
    </Container>
  );
}

export default GitlabUserProfile;
