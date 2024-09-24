import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Function to check and create tables
export function checkAndCreateTable(tableName: string, tableSchema: string) {
  return new Promise((resolve, reject) => {
    const checkTableQuery = `SHOW TABLES LIKE '${tableName}';`;

    pool.query(checkTableQuery, (err, results: mysql.QueryResult) => {
      if (err) return reject(err);

      if (Array.isArray(results) && results.length === 0) {
        const createTableQuery = `CREATE TABLE ${tableName} (${tableSchema});`;

        pool.query(createTableQuery, (err) => {
          if (err) return reject(err);
          console.log(`Table "${tableName}" created successfully.`);
          resolve(true);
        });
      } else {
        console.log(`Table "${tableName}" already exists.`);
        resolve(false);
      }
    });
  });
}

// Close the database pool once all tables are created
export function closeConnection() {
  pool.end();
}

// Function to create necessary tables on app start
export async function createTablesOnStartup() {
  try {
    // Users table schema
    const userTableSchema = `
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    `;
    await checkAndCreateTable("users", userTableSchema);

    // Galleries table schema
    const galleryTableSchema = `
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      imageSrc VARCHAR(255) NOT NULL
    `;
    await checkAndCreateTable("galleries", galleryTableSchema);

    // Portfolios table schema
    const portfolioTableSchema = `
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      imageSrc VARCHAR(255) NOT NULL
    `;
    await checkAndCreateTable("portfolios", portfolioTableSchema);

    console.log("All tables checked and created (if necessary).");
  } catch (err: any) {
    console.error("Error creating tables:", err.message);
  } finally {
    // Close the pool to the database
  }
}

export default pool.promise();
