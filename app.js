import express from 'express';
// bodyParser imported
import bodyParser from 'body-parser';
// helmet imported
import helmet from 'helmet';
// github and gitlab routes imported
import githubRoute from './routes/github.js';
import gitlabRoute from './routes/gitlab.js';
// app set to express
const app = express();
// app uses helmet for security
app.use(helmet());
// app uses bodyParser to parse json data
app.use(bodyParser.json());
// routes declared for github and gitlab traffic
app.use('/github', githubRoute);
app.use('/gitlab', gitlabRoute);
// app exported
export default app;

