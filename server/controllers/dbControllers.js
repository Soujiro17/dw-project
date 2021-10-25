const db = require("../database");

const getAll = (tableName) => {
  return db.query(`SELECT * FROM ${tableName}`, { type: db.QueryTypes.SELECT });
};

const getByID = (tableName, attribute, id) => {
  return db.query(`SELECT * from ${tableName} WHERE ${attribute}=${id}`, {
    type: db.QueryTypes.SELECT,
  });
};

const deleteByID = (tableName, attribute, id) => {
  return db.query(`DELETE from ${tableName} WHERE ${attribute} = ${id}`, {
    type: db.QueryTypes.DELETE,
  });
};

const addData = (tableName, data) => {
  return db.query(`INSERT INTO ${tableName} SET ?`, {
    replacements: data,
    type: db.QueryTypes.INSERT,
  });
};

const updateData = (tableName, attribute, id, data) => {
  return db.query(`UPDATE ${tableName} SET :data WHERE ${attribute}=${id}`, {
    replacements: data,
    type: db.QueryTypes.UPDATE,
  });
};

const alterTableADD = (tableName, column, datatype, size) => {
  return db.query(
    `ALTER TABLE ${tableName} ADD ${column} ${datatype}(${size})`,
    { type: db.QueryTypes.ALTER }
  );
};

const alterTableDROP = (tableName, column) => {
  return db.query(`ALTER TABLE ${tableName} DROP COLUMN ${column}`, {
    type: db.QueryTypes.ALTER,
  });
};

const alterTableMODIFY = (tableName, column, datatype, size) => {
  return db.query(
    `ALTER TABLE ${tableName} ALTER COLUMN ${column} ${datatype}(${size})`,
    { type: db.QueryTypes.ALTER }
  );
};

const dropTable = (tableName) => {
  return db.query(`DROP TABLE ${tableName}`, { type: db.QueryTypes.DROP });
};

const getSolicitudes = () => {
  return db.query(
    `SELECT usuario.Rut, usuario.Nombres, usuario.Apellidos, usuario.Email, usuario.Telefono, usuario.Saldo, solicitud_de_retiro.Fecha_solicitud, solicitud_de_retiro.Monto, solicitud_de_retiro.Id_solicitud  FROM usuario INNER JOIN solicitud_de_retiro WHERE usuario.Rut=solicitud_de_retiro.Rut_cliente AND solicitud_de_retiro.Aprobado=-1`,
    { type: db.QueryTypes.SELECT }
  );
};

const getSolicitudesCliente = (rut) => {
  return db.query(
    `SELECT usuario.Rut, solicitud_de_retiro.Fecha_solicitud, solicitud_de_retiro.Monto, solicitud_de_retiro.Id_solicitud, solicitud_de_retiro.Aprobado  FROM usuario INNER JOIN solicitud_de_retiro WHERE usuario.Rut=solicitud_de_retiro.Rut_cliente AND solicitud_de_retiro.Rut_cliente=${rut}`,
    { type: db.QueryTypes.SELECT }
  );
};

const actualizarSolicitud = (tableName, attribute, id, data) => {
  return db.query(
    `UPDATE ${tableName} SET Aprobado=${data.Aprobado} WHERE ${attribute}=${id}`,
    {
      type: db.QueryTypes.UPDATE,
    }
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
  actualizarSolicitud,
  getSolicitudesCliente
};
