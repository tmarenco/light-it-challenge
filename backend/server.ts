import app from './app'
import { runMigrations } from './db/migrations';
const port = 5000

runMigrations()
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`App listening at http://0.0.0.0:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error during migrations:', error);
    process.exit(1);
  });