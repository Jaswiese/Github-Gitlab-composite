/* eslint-disable max-len */
import React, {useState} from 'react';
// propTypes imported for prop validation
import PropTypes from 'prop-types';
// custom css for styling
import '../resources/css/repo.css';
// spinner imported
import Spinner from 'react-bootstrap/Spinner';
// redux hooks imported
import {useDispatch, useSelector} from 'react-redux';
// commits action imported
import {getGithubCommits} from '../redux/features/githubCommitsSlice';
/**
 * GithubRepo component
 * used to display repo and commit data to the user
 * @param {*} param0 props object passed by parent
 * @returns {*} html to display the repo to the user
 */
function GithubRepo({name, description, created, updated}) {
  // dispatch is assigned as useDispatch
  const dispatch = useDispatch();
  // useSelector hook is used to track changes to state
  const commitStatus = useSelector((state) => state.githubCommits.status);
  const repoCommits = useSelector((state) => state.githubCommits.githubCommits);
  const profileInfo = useSelector((state) => state.githubUser.githubUser);
  // local state declared for button clicks
  const [viewCommit, setViewCommit] = useState(false);
  /**
   * dateConvert function
   * helper function that formats date to readable string
   * @param {*} date date value
   * @returns {*} formatted date string
   */
  const dateConvert = (date) => {
    const inputDate = new Date(date);
    const outputDate = inputDate.toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZoneName: 'short',
    });
    return outputDate;
  };
  // converted date variables assigned as result of the dateConvert function call
  const createdConv = dateConvert(created);
  const updatedConv = dateConvert(updated);
  /**
   * DisplayCommits
   * helper function that displays various states to the user depending on data retrieval
   * if data is still loading, a spinner is displayed to the user
   * if successful,
   * a for loop is used to paginate the data of commits to only 5 entries
   * the commits message are then mapped to a paragraph tag inside a list tag
   * and returned to the user
   * @param {*} status param that tracks the state of data retrieval
   * @returns {*} html that displays the commit information to the user
   */
  const displayCommits = (status) =>{
    if (status === 'loading' || status === undefined) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...Commits</span>
          </Spinner>
        </div>
      );
    }
    if (status === 'success') {
      const arrOfCommits = [];
      for (let i = 0; i < 5; i+=1) {
        arrOfCommits.push(repoCommits[i]);
      };
      // const message = validatorString(commit.message);
      return (
        <>
          {arrOfCommits.map((commit) =>(
            <li key={commit.commit.sha}>
              <p> Commit: {commit.commit.message}</p>
            </li>
          ))}
        </>
      );
    }
  };
  /**
   * toggleCommits function
   * this function is fired when the user clicks on the view button
   * it fires an action with the username and repo name as its payload 
   * and also sets the viewcount state to the opposite boolean
   */
  const toggleCommits = () => {
    const username = profileInfo.login;
    const repo = name;
    const payload = {username: username, repo: repo};
    dispatch(getGithubCommits(payload));
    setViewCommit(!viewCommit);
  };
  /**
   * Primary return of the githubRepo component
   * displays the repo information props in corresponding paragraph tags
   * an if statement is used to check if the user wants to view the commits
   * if the view button is clicked the toggleCommits func is fired
   * the text of the button changes depending on the state for UX
   */
  return (
    <div className="repo-outer-container">
      <div className="repo-inner-container">
        <ul className="repo-list">
          <li>
            <p className="repo-text"><b>Repo name: </b>{name} </p>
          </li>
          <li>
            <p className="repo-text"><b>Description:</b> {description}</p>
          </li>
          <li>
            <p className="repo-text"><b>Created at:</b> {createdConv}</p>
          </li>
          <li>
            <p className="repo-text"><b>last commit:</b> {updatedConv}</p>
          </li>
          {viewCommit === true && displayCommits(commitStatus)}
        </ul>
        <button
          type="button"
          className="btn btn-primary m-4"
          onClick={toggleCommits}
        >
          {viewCommit? 'Close': 'View Commits'}
        </button>
      </div>
    </div>
  );
}
// default props are set incase the user did not submit it with repo push
GithubRepo.defaultProps = {
  name: 'unavailable',
  description: 'unavailable',
  created: 'unavailable',
  updated: 'unavailable',
};
// props are validated
GithubRepo.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  created: PropTypes.string,
  updated: PropTypes.string,
  validatorString: PropTypes.func.isRequired,
};

export default GithubRepo;
