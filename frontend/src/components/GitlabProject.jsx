import React, {useState} from 'react';
// prop validation imported
import PropTypes from 'prop-types';
// css imported
import '../resources/css/repo.css';
// bootstrap component imported
import Spinner from 'react-bootstrap/Spinner';
// redux hooks imported
import {useDispatch, useSelector} from 'react-redux';
// action imported
import {getGitlabCommits} from '../redux/features/gitlabCommitsSlice';
/**
 * GitlabProject component
 * display the projects of the selected user to the screen
 * @param {*} param0 props object
 * @returns {*} html to the user that shows the project data
 */
function GitlabProject({name, description, created, updated, id, username}) {
  // dispatch assigned the useDispatch hook
  const dispatch = useDispatch();
  // selectors used to track state changes
  const commitStatus = useSelector((state) => state.gitlabCommits.status);
  const commits = useSelector((state) => state.gitlabCommits.gitlabCommits);
  // local state declared for view button functionality
  const [viewCommit, setViewCommit] = useState(false);
  /**
   * dateConvert function converts the input date data to a  formatted string
   * @param {*} date date input
   * @returns {*} string formatted date
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
  // formatted date variables
  const createdConv = dateConvert(created);
  const updatedConv = dateConvert(updated);
  /**
   * displayCommits
   * helper function that displays various elements to the user depending on the state of data retrieval
   * if the data is still loading a spinner is displayed to the user
   * if the data has been successfully retrieved
   * the data is paginated to 5
   * the 5 commits are then displayed to the user through the map function
   * where on each iteration the commit message is add to a wrapped paragraph tag in a list item
   * @param {*} status passed param that tracks the state of data retrieval
   * @returns {*} varying html to the user depending on the state of the application
   */
  const displayCommits = (status) => {
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
        arrOfCommits.push(commits[i]);
      };
      return (
        <>
          {arrOfCommits.map((commit) => (
            <li key= {commit.id}>
              <p><b>Commit:</b> {commit.message}</p>
            </li>
          ))}
        </>
      );
    }
  };
  /**
   * toggleCommits function
   * used to change state when the user clicks the view button
   * checks if the user wants to view the data,
   * fires the getGitlabCommits action with the username and projected id as its payload
   * sets the Viewcommit to true
   * if the Viewcommit state was true, sets it to false and returns (doesn't want to view the commits anymore)
   */
  const toggleCommits = () => {
    if (viewCommit) {
      setViewCommit(false);
      return;
    }
    const payload = {username: username, projectid: id};
    dispatch(getGitlabCommits(payload));
    setViewCommit(true);
  };
  /**
   * primary display return
   * Project data is assigned to the corresponding elements as text
   * if statement is used check if the user wants to view the commits
   * the view button fires the toggleCommits function when clicked
   * the button's text changes depending on the viewCommit state
   */
  return (
    <div className="repo-outer-container">
      <div className="repo-inner-container">
        <ul className="repo-list">
          <li>
            <p className="repo-text"><b>Project name: </b>{name} </p>
          </li>
          <li>
            <p className="repo-text"><b>Description:</b> {description}</p>
          </li>
          <li>
            <p className="repo-text">
              <b>Created at:</b> {createdConv}
            </p>
          </li>
          <li>
            <p className="repo-text">
              <b>last commit:</b> {updatedConv}
            </p>
          </li>
          {viewCommit && displayCommits(commitStatus)}
        </ul>
        <button
          type="button"
          className="btn btn-primary m-4"
          onClick={toggleCommits}
        >
          {viewCommit ? 'Close': 'View Commits'}
        </button>
      </div>
    </div>
  );
}
// default props are set
GitlabProject.defaultProps = {
  name: 'unavailable',
  description: 'unavailable',
  created: 'unavailable',
  updated: 'unavailable',
};
// props are validated
GitlabProject.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  created: PropTypes.string,
  updated: PropTypes.string,
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

export default GitlabProject;
