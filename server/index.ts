import express, { Express } from 'express';
import appLoader from './loader';

const app: Express = express();

appLoader(app);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
