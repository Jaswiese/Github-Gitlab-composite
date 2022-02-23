/* eslint-disable no-undef */
import React from 'react';
// function from the testing library imported
import {render, screen, fireEvent} from '@testing-library/react';
// dependency components and functions imported
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import store from '../../redux/store/store';
import Homepage from '../Homepage';
import {setTargetUsername} from '../../redux/features/targetUsernameSlice';
import {getGithubUsers} from '../../redux/features/githubUsersSlice';

// custom component render declared and redux store passed (due to the use of useParams hook Router wrapped).
const renderHomepage = () =>
  render(
      <Provider store={store}>
        <Router>
          <Homepage />
        </Router>
      </Provider>,
  );
  /**
   * unit test added to see if the getGithubUsers action is working correctly
   * check if the correct user login is reflected in the redux state
   */
test('getGithubUsers', async ()=>{
  store.dispatch(setTargetUsername('svedova'));
  const test = 'svedova';
  let state = null;
  await store.dispatch(getGithubUsers(test)).then(()=>{
    state = store.getState();
  });
  const target = state.githubUsers.githubUsers.items[0].login;
  expect(target).toBe('svedova');
});
/**
 * Testing the Homepage component change with a snapshot test
 * simulates a user clicked the search button after the user has populated the search bar
 */
test('testing if the homepage displays user details after search', async () => {
  store.dispatch(setTargetUsername('svedova'));
  const {rerender, asFragment} = renderHomepage();
  rerender(
      <Provider store={store}>
        <Router>
          <Homepage />
        </Router>
      </Provider>,
  );
  const searchButton = screen.getByTestId('search-button');
  fireEvent.click(searchButton);
  const results = await screen.findByText('Username: svedova');
  expect(results).toHaveTextContent('svedova');
  expect(asFragment()).toMatchSnapshot();
});

