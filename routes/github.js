// router imported
import {Router} from 'express';
// route callback function imported (called when the user hits the endpoint)
import {
  getGithubUser,
  getGithubUsers,
  getGithubRepoCommits,
  getGithubRepos,
} from '../controllers/github.js';
// router declared
const router = Router();
// routes declared with their callback functions (github)
router.get('/:username', getGithubUser);
router.get('/search/:username', getGithubUsers);
router.get('/repos/:username', getGithubRepos);
router.get('/:username/:repository', getGithubRepoCommits);
// router exported
export default router;
