import pool from '../db/db';

export const runMigrations = async (): Promise<void> => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS patients (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(45) NOT NULL,
      email VARCHAR(45) NOT NULL,
      address VARCHAR(45),
      phone BIGINT,
      photo LONGTEXT
    );
  `;

  return new Promise((resolve, reject) => {
    pool.query(createTableQuery, (error) => {
      if (error) {
        console.error("Error running migrations:", error);
        reject(error);
      } else {
        console.log("Migrations ran successfully: Table 'patients' is ready.");
        resolve();
      }
    });
  });
};
