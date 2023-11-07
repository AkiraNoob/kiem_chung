import dotenv from 'dotenv';
import appLoader from './loader';

dotenv.config();
const port = process.env.PORT;

const app = appLoader();
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
