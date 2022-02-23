/* eslint-disable max-len */
import React, {useEffect} from 'react';
// bootstrap components declared
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
// useParams hook imported for route param
import {useParams} from 'react-router-dom';
// redux hooks imported
import {useDispatch, useSelector} from 'react-redux';
// redux actions imported
import {getGithubUser} from '../redux/features/githubUserSlice';
import {getGithubRepos} from '../redux/features/githubReposSlice';
// GithubRepo component imported
import GithubRepo from './GithubRepo';
// custome css imported
import '../resources/css/userProfile.css';
/**
 * GithubUserProfile component
 * displays the selected github profile
 * @returns {*} html for the display of the selected user profile
 */
function GithubUserProfile() {
  // username variable declared from the username param
  const {username} = useParams();
  // dispatch declared as the useDispatch hook
  const dispatch = useDispatch();
  // useSelector hook used to track various items in redux state
  const profileInfo = useSelector((state) => state.githubUser.githubUser);
  const profileStatus = useSelector((state) => state.githubUser.status);
  const repoStatus = useSelector((state) => state.githubRepos.status);
  const repoInfo = useSelector((state) => state.githubRepos.githubRepos);
  // useEffect hook used to fire two actions on initial render of the component
  useEffect(() => {
    dispatch(getGithubUser(username));
    dispatch(getGithubRepos(username));
  }, []);
  // validatorString is a helper function that assigns a string value to an empty string value
  const validatorString = (input) => {
    if (input === null) {
      return 'not available';
    }
    return input;
  };
  /**
   * displayBioInfo function
   * a helper display function that control the data displayed to the user in the profile bio
   * checks if the data is still loading and returns a spinner in this stage
   * if the data is retrieved successfully,
   * variables are extracted from the profileInfo object
   * and the imgUrl variable is also declared
   * the validatorString function is called on all the above variables
   * the bio html with bootstrap and custom css styling is returned to the user
   * the img src is the img url variable
   * name, username, company, bio, location paragraph tags text assigned variable text
   * @param {*} status the fed profileStatus variable - monitors the stage of the data
   * @returns {*} html to display the bio of the github profile
   */
  const displayBioInfo = (status) => {
    if (status === 'loading'|| status === undefined) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...Bio</span>
          </Spinner>
        </div>
      );
    }
    if (status === 'success') {
      let {name, company, bio, location} = profileInfo;
      let imgUrl = profileInfo.avatar_url;
      name = validatorString(name);
      company = validatorString(company);
      bio = validatorString(bio);
      location = validatorString(location);
      imgUrl = validatorString(imgUrl);
      return (
        <Col className="col-md-4 justify-content-center">
          <div className="bio-container">
            <div className="img-wrap-container-profile">
              <img src={imgUrl} alt="profile picture" className="img-profile"/>
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
                    <b>Bio:</b> {bio}
                  </p>
                </li>
                <li>
                  <p className="text-profile-bio">
                    <b>Company:</b> {company}
                  </p>
                </li>
                <li>
                  <p className="text-profile-bio">
                    <b>Location:</b> {location}
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
   * displayRepoInfo function
   * helper function that displays repo information to the user depending on the retrieval state
   * if the data is still being retrieved a spinner is displayed
   * if retrieved
   * GithubRepo components are displayed with props passed down
   * @param {*} status the repoStatus variable is fed to track progress of data retrieval
   * @returns {*} html that displays the selected users repos to the user
   */
  const displayRepoInfo = (status) => {
    if (status === 'loading' || status === undefined) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...Repos</span>
          </Spinner>
        </div>
      );
    }
    if (status === 'success') {
      if (typeof repoInfo === 'undefined') {
        return (
          <div className="d-flex justify-content-center align-items-center">
            <h4>No repos found for this user</h4>
          </div>
        );
      }
      const arrayOfRepos = repoInfo;
      return (
        <Row className="repos-profile-container justify-content-center">
          {arrayOfRepos.map((repo) =>(
            <GithubRepo
              key={repo.id}
              id={repo.id}
              name={repo.name}
              description={repo.description}
              created={repo.created_at}
              updated={repo.updated_at}
            />
          ))}
        </Row>
      );
    }
  };
  /**
   * default and primary return of the component
   * bootstrap components are used for layout 
   * display functions are called to populate bio and repos section
   */
  return (
    <Container fluid>
      <Row className="justify-content-center p-5">
        <Col className="col-md-8">
          <h1 className="text-center">
             Github user profile 🧭
          </h1>
        </Col>
      </Row>
      <Row className='justify-content-center pb-5'>
        {displayBioInfo(profileStatus)}
      </Row>
      <Row>
        <Col>
          <h1 className="text-center">Repository details 📚</h1>
        </Col>
      </Row>
      {displayRepoInfo(repoStatus)}
    </Container>
  );
}

export default GithubUserProfile;
