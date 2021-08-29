import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {}); // all countries
router.get("/:id", (req: Request, res: Response) => {}); // one contry

export default router;
