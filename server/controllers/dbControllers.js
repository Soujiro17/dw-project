const conn = require("../database");

const getAll = (tableName, callback) => {
  conn.query(`SELECT * from ${tableName}`, callback);
};

const getByID = (tableName, attribute, id, callback) => {
  conn.query(`SELECT * from ${tableName} WHERE ${attribute} = ${id}`, callback);
};

const deleteByID = (tableName, attribute, id, callback) => {
  conn.query(`DELETE from ${tableName} WHERE ${attribute} = ${id}`, callback);
};

const addData = (tableName, data, callback) => {
  conn.query(`INSERT INTO ${tableName} SET ?`, data, callback);
};

const updateData = (tableName, attribute, id, data, callback) => {
  conn.query(
    `UPDATE ${tableName} SET ? WHERE ${attribute} = ${id}`,
    data,
    callback
  );
};

const alterTableADD = (tableName, column, datatype, size) => {
  conn.query(
    `ALTER TABLE ${tableName} ADD ${column} ${datatype}(${size})`,
    callback
  );
};

const alterTableDROP = (tableName, column, callback) => {
  conn.query(`ALTER TABLE ${tableName} DROP COLUMN ${column}`, callback);
};

const alterTableMODIFY = (tableName, column, datatype, size, callback) => {
  conn.query(
    `ALTER TABLE ${tableName} ALTER COLUMN ${column} ${datatype}(${size})`,
    callback
  );
};

const dropTable = (tableName, callback) => {
  conn.query(`DROP TABLE ${tableName}`, callback);
};

const getSolicitudes = (callback) => {
  conn.query(
    `SELECT usuario.Rut, usuario.Nombres, usuario.Apellidos, usuario.Email, usuario.Telefono, usuario.Saldo, solicitud_de_retiro.Fecha_solicitud, solicitud_de_retiro.Monto, solicitud_de_retiro.Id_solicitud  FROM usuario INNER JOIN solicitud_de_retiro WHERE usuario.Rut=solicitud_de_retiro.Rut_cliente AND solicitud_de_retiro.Aprobado=-1`,
    callback
  );
};

module.exports = {
  getAll,
  addData,
  getByID,
  deleteByID,
  updateData,
  alterTableADD,
  alterTableDROP,
  alterTableMODIFY,
  dropTable,
  getSolicitudes,
};
