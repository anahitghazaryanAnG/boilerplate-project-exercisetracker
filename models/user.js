import { connectDB } from "../config/database.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 24);

export class User {
  static async create(username) {
    const db = await connectDB();
    const id = nanoid();
    await db.run(`INSERT INTO users (id, username) VALUES (?, ?)`, [
      id,
      username,
    ]);
    return { id, username };
  }

  static async getAll() {
    const db = await connectDB();
    return await db.all(`SELECT id AS _id, username FROM users`);
  }

  static async getById(id) {
    const db = await connectDB();
    return await db.get(`SELECT * FROM users WHERE id = ?`, [id]);
  }
}
