const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql" || "mariadb",
    logging: console.log,
  }
);

async function inicializar() {
  try {
    await db.authenticate();
    await db.sync();
    console.log("Mysql Database conectada");
  } catch {
    console.log("Error al conectar con la base de datos");
  }
}

inicializar();

module.exports = db;
