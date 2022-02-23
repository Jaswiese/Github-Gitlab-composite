// router imported from express module
import {Router} from 'express';
// route callback function imported
import {
  getGitlabUser,
  getGitlabRepositories,
  getGitlabCommits,
} from '../controllers/gitlab.js';
// router declared
const router = Router();
// routes with corresponding callback functions declared
router.get('/:username', getGitlabUser);
router.get('/repo/:username', getGitlabRepositories);
router.get('/:username/:projectid', getGitlabCommits);
// router exported
export default router;
