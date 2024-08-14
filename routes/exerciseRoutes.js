import { Router } from "express";
import {
  addExercise,
  getExerciseLog,
} from "../controllers/exerciseController.js";

const router = Router();

router.post("/api/users/:_id/exercises", addExercise);
router.get("/api/users/:_id/logs", getExerciseLog);

export default router;
