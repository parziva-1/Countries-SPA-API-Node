import { Sequelize } from "sequelize";
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const db = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

export default db;
