import { Router, Request, Response } from "express";
import db from "../models";
import axios from "axios";
import { Op } from "sequelize";
import Middlewar from "../middlewares";
import validator from "../validators";

const router = Router();

router.get(
  "/",
  validator.checkGetCountry(),
  Middlewar.handleValidationError,
  async (req: Request, res: Response) => {
    const name = req.query.name as string | undefined;

    if (name) {
      try {
        let search = await db.Country.findAll({
          where: { name: { [Op.iLike]: `%${name}%` } },
          include: [db.Activity],
        });

        if (search.length === 0)
          return res.status(404).json({ msg: "Country not found." });
        return res.status(200).json(await search);
      } catch (err: any) {
        console.log(err);
        return res.status(500).json({ err: "server err" });
      }
    }
    try {
      const Countries = await axios.get("https://restcountries.eu/rest/v2/all");
      Countries.data.map(async (country: any) => {
        try {
          await db.Country.findOrCreate({
            where: {
              id: country.alpha3Code,
              name: country.name,
              image: country.flag,
              continent: country.region,
              capital: country.capital,
              subregion: country.subregion,
              area: country.area,
              population: country.population,
            },
          });
        } catch (err: any) {
          console.log("err contry: ", country.name, err);
        }
      });
      let result = await db.Country.findAll({ include: db.Activity });
      return res.status(200).json(result);
    } catch (err: any) {
      console.log("error jaime: ", err);
    }
  }
); // all countries

router.get(
  "/:id",
  validator.checkGetCountry(),
  Middlewar.handleValidationError,
  async (req: Request, res: Response) => {
    const id = req.params.id as string | undefined;
    try {
      let search = await db.Country.findAll({
        where: { id },
        include: [db.Activity],
      });

      if (search.length === 0)
        return res.status(404).json({ msg: "Country not found." });
      return res.status(200).json(await search);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ err: "server err" });
    }
  }
); // one contry

router.post("");

export default router;
