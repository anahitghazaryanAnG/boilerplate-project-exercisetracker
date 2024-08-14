import { connectDB } from "../config/database.js";
import isValidDate from "../helpers/dateValidation.js";

export class Exercise {
  static async create(userId, description, duration, date) {
    if (parseInt(duration) <= 0) {
      throw new Error("Duration must be a positive number.");
    }

    const exerciseDate = isValidDate(date)
      ? date
      : new Date().toISOString().split("T")[0];

    const db = await connectDB();
    const result = await db.run(
      `INSERT INTO exercises (userId, description, duration, date) VALUES (?, ?, ?, ?)`,
      [userId, description, parseInt(duration), exerciseDate]
    );
    return {
      id: result.lastID,
      userId,
      description,
      duration: parseInt(duration),
      date: exerciseDate,
    };
  }

  static async getByUserId(userId, from, to, limit) {
    const db = await connectDB();

    let countQuery = `SELECT COUNT(*) as count FROM exercises WHERE userId = ?`;
    let dataQuery = `SELECT description, duration, date FROM exercises WHERE userId = ?`;
    const params = [userId];

    if (from) {
      countQuery += ` AND date >= ?`;
      dataQuery += ` AND date >= ?`;
      params.push(from);
    }

    if (to) {
      countQuery += ` AND date <= ?`;
      dataQuery += ` AND date <= ?`;
      params.push(to);
    }

    dataQuery += ` ORDER BY date ASC`;

    const totalCount = await db.get(countQuery, params);

    if (limit) {
      dataQuery += ` LIMIT ?`;
      params.push(parseInt(limit));
    }

    const log = await db.all(dataQuery, params);

    return {
      count: totalCount.count,
      log,
    };
  }
}
