const express = require("express");
const router = express.Router();
const {
  getAll,
  addData,
  getByID,
  deleteByID,
  updateData,
  getSolicitudes,
} = require("../controllers/dbControllers");

const capitalize = require("../middlewares/capitalize");

router.post("/:tabla", (req, res) => {
  const { tabla } = req.params;
  const { data } = req.body;

  if (!tabla || !data.length)
    return res.status(401).json({
      status: 401,
      description: "Faltan parámetros por completar o faltan datos",
    });

  addData(tabla, data, (err, resp, campos) => {
    if (err) return console.log(err);

    res.status(200).json({ status: 200, description: "Fila creada con éxito" });
  });
});

router.get("/:tabla/:attribute/:id", (req, res) => {
  const { tabla, id, attribute } = req.params;

  if (!id || !tabla || !attribute)
    return res.status(401).json({
      status: 401,
      description: "Faltan parámetros por completar",
    });

  getByID(tabla, capitalize(attribute), id, (err, resp, campos) => {
    if (err)
      return res
        .status(401)
        .json({ status: 401, description: "Error al realizar la consulta" });

    if (!resp.length)
      return res.status(404).json({
        status: 404,
        description: "Fila no encontrada",
      });

    res.status(200).json({ status: 200, data: resp });
  });
});

router.get("/:tabla", (req, res) => {
  const { tabla } = req.params;

  if (!tabla)
    return res.status(401).json({
      status: 401,
      description: "Faltan parámetros por completar",
    });

  getAll(tabla, (err, resp, campos) => {
    if (err)
      return res
        .status(401)
        .json({ status: 401, description: "Error al realizar la consulta" });

    res.status(200).json({ status: 200, data: resp });
  });
});

router.delete("/:tabla/:attribute/:id", (req, res) => {
  const { id, tabla, attribute } = req.params;

  if (!id || !tabla || !attribute)
    return res.status(401).json({
      status: 401,
      description: "No se ha encontrato un dato con ese ID o faltan parámetros",
    });

  deleteByID(tabla, capitalize(attribute), id, (err, resp, campos) => {
    if (err)
      return res
        .status(401)
        .json({ status: 401, description: "Error al realizar la consulta" });

    if (!resp.affectedRows)
      return res.status(404).json({
        status: 404,
        description: "Fila no encontrada",
      });

    res.status(200).json({ status: 200, data: "Fila eliminada con éxito" });
  });
});

router.put("/:tabla/:attribute/:id", (req, res) => {
  const { id, tabla, attribute } = req.params;

  const { data } = req.body;

  if (!id || !tabla || !attribute || !data)
    return res.status(401).json({
      status: 401,
      description: "No se ha encontrato un dato con ese ID o faltan parámetros",
    });

  updateData(tabla, capitalize(attribute), id, data, (err, resp, campos) => {
    if (err)
      return res
        .status(401)
        .json({ status: 401, description: "Error al realizar la consulta" });

    res
      .status(200)
      .json({ status: 200, description: "Fila actualizada con éxito" });
  });
});

router.get("/api/solicitudes", (req, res) => {
  getSolicitudes((err, resp, campos) => {
    if (err)
      return res
        .status(401)
        .json({ status: 401, description: "Error al realizar la consulta" });

    res.status(200).json(resp);
  });
});

module.exports = router;
