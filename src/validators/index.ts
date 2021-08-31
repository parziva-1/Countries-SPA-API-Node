import { body, param, query } from "express-validator";

class validator {
  checkGetCountry() {
    return [
      query("name")
        .optional()
        .isString()
        .withMessage("The name should be string"),
    ];
  }
  checkGetCountryById() {
    return [
      param("id").notEmpty().isString().withMessage("The id should not empty"),
    ];
  }
  checkCreateActivity() {
    return [
      body("name")
        .notEmpty()
        .withMessage("The name should not empty")
        .isString()
        .withMessage("The name should be a string"),
      body("difficulty")
        .notEmpty()
        .withMessage("The difficulty should not empty")
        .isInt({ min: 1, max: 5 })
        .withMessage("The difficult should be number in range 1-5"),
      body("duration").notEmpty().withMessage("The duration should not empty"),
      body("season")
        .notEmpty()
        .withMessage("The season should not empty")
        .isInt({ min: 1, max: 4 })
        .withMessage("The season should be number in range 1-4"),
      body("countries")
        .notEmpty()
        .withMessage("The countries should not empty")
        .isArray()
        .withMessage("The countries should be array"),
    ];
  }
}

export default new validator();
