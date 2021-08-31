import { Router, Request, Response } from "express";
import db from "../models";
import Middleware from "../middlewares";
import validator from "../validators";

const router = Router();

type countries = {
  label: string;
};

router.get("/", async (req: Request, res: Response) => {
  try {
    await db.Activity.findAll();
    return res.json(await db.Activity.findAll());
  } catch (error) {
    console.log(error);
  }
}); // all activit

router.post(
  "/",
  validator.checkCreateActivity(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    const countries = req.body.countries as countries[];
    const name = req.body.name as string;
    const difficulty = req.body.difficulty as number;
    const duration = req.body.duration as string;
    const season = req.body.season as number;

    try {
      if (!req.body) return res.status(500);
      const createActivity = await db.Activity.findOrCreate({
        where: {
          name: name,
          difficulty: difficulty,
          duration: duration,
          season: season,
        },
      });

      countries.forEach(async (name) => {
        let country = await db.Country.findAll({
          where: { name: name.label },
        });
        await createActivity[0].addCountry(country);
      });

      return res.json("Activity Created succesfully");
    } catch (error) {
      console.log(error);
    }
  }
); // one contry

export default router;
