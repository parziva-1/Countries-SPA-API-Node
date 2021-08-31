import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

class Middlewares {
  handleValidationError(req: Request, res: Response, next: NextFunction) {
    const err = validationResult(req);
    if (!err.isEmpty()) return res.json(err);
    next();
  }
}

export default new Middlewares();
