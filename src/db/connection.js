import { Sequelize } from "sequelize";
import env from "../env";
const DATABASE_URL = env("DATABASE_URL");

const sequelize = new Sequelize(DATABASE_URL);

export default sequelize;
