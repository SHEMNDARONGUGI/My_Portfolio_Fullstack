import { Router } from "express";
import { getAllProjects } from "./project.controller.js";

const router = Router();

router.get("/", getAllProjects);

export default router;
