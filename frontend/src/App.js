import React from 'react';
// react-router-dom modules imported
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// Homepage component imported
import Homepage from './components/Homepage';
// Github & Gitlab user profile components imported
import GithubUserProfile from './components/GithubUserProfile';
import GitlabUserProfile from './components/GitlabUserProfile';

/**
 * Main app display component
 * Application components are wrapped in the Router
 * Routes declared with components to be displayed on specific routes
 * both profile routes have username params used within component logic
 * @return {*} application display
 */
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route
            path='/github-profile/:username'
            element={<GithubUserProfile />}
          />
          <Route
            path='/gitlab-profile/:username'
            element={<GitlabUserProfile />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
