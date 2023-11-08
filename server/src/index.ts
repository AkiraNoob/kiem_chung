import dotenv from 'dotenv';
import appLoader from './loader';
import mongooseLoader from './loader/mongooes';

dotenv.config();
const port = process.env.PORT;

const app = appLoader();
mongooseLoader(app);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
