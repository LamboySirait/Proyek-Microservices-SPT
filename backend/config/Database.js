import { Sequelize } from "sequelize";

const db = new Sequelize('espete_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;