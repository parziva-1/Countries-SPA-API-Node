"use strict";
import { Model } from "sequelize";

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

interface CountryAttributes {
  id: string;
  name: string;
  image: string;
  continent: string;
  capital: string;
  subregion: string;
  area: string | null;
  population: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Country extends Model<CountryAttributes> implements CountryAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public id!: string;
    public name!: string;
    public image!: string;
    public continent!: string;
    public capital!: string;
    public subregion!: string;
    public area!: string | null;
    public population!: number;

    static associate(models: any) {
      // define association here
      Country.belongsToMany(models.Activity, {
        through: "Activity_Country",
      });
    }
  }

  /*     Countries.belongsToMany(Activity, { through: "Activity_Country" });
    Activity.belongsToMany(Countries, { through: "Activity_Country" }); */

  // defino el modelo
  Country.init(
    {
      id: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      continent: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      subregion: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      area: {
        type: DataTypes.STRING(25),
      },
      population: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Country",
    }
  );
  return Country;
};
