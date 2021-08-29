import { Router } from "express";

const router = Router();

router.get("/"); // all activit
router.get("/:id"); // one contry

export default router;
