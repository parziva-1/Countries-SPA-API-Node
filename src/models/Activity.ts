import { Model } from "sequelize";

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

interface ActivityAttributes {
  id: number;
  name: string;
  difficulty: number;
  duration: string;
  season: number;
}
/*Nombre
Dificultad (Entre 1 y 5)
Duración
Temporada (Verano, Otoño, Invierno o Primavera) */
module.exports = (sequelize: any, DataTypes: any) => {
  class Activity
    extends Model<ActivityAttributes>
    implements ActivityAttributes
  {
    public id!: number;
    public name!: string;
    public difficulty!: number;
    public duration!: string;
    public season!: number;

    static associate(models: any) {
      // define association here
      Activity.belongsToMany(models.Country, {
        through: "Activity_Country",
      });
    }
  }

  // defino el modelo
  Activity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      season: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Activity",
    }
  );
  return Activity;
};
