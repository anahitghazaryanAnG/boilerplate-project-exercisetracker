import { Database } from "sqlite-async";

export const connectDB = async () => {
  try {
    const db = await Database.open("./database.sqlite");

    await db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                username TEXT NOT NULL
            )
        `);

    await db.run(`
            CREATE TABLE IF NOT EXISTS exercises (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId TEXT NOT NULL,
                description TEXT NOT NULL,
                duration INTEGER NOT NULL,
                date TEXT,
                FOREIGN KEY (userId) REFERENCES users (id)
            )
        `);

    return db;
  } catch (error) {
    console.error("Could not connect to database", error);
    throw error;
  }
};
