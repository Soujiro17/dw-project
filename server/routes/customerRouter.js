const express = require("express");
const {
  getByID,
  updateData,
  getSolicitudesCliente,
  addData,
} = require("../controllers/dbControllers.js");
const auth = require("../middlewares/auth.js");
const router = express.Router();

router.get("/info", auth, async (req, res) => {
  const usuario = await getByID("usuario", "Rut", req.user);
  const ejecutivo = await getByID("ejecutivo", "Rut", req.user);

  if (!usuario.length && !ejecutivo.length)
    return res.status(400).json({
      status: 400,
      message: "El usuario no existe",
    });

  const info = {
    Rut: usuario[0]?.Rut || ejecutivo[0]?.Rut,
    Nombres: usuario[0]?.Nombres || ejecutivo[0]?.Nombres,
    Apellidos: usuario[0]?.Apellidos || ejecutivo[0]?.Apellidos,
    Saldo: usuario[0]?.Saldo || ejecutivo[0]?.Saldo || 0,
    typeAccount: usuario[0] ? "cliente" : "admin",
  };
  res.json(info);
});

router.get("/solicitudes", auth, async (req, res) => {
  const solicitudes = await getSolicitudesCliente(req.user);

  if (!solicitudes.length)
    return res.status(400).json({
      status: 400,
      message: "El usuario no existe",
    });

  res.json(solicitudes);
});

router.put("/actualizarSolicitud", auth, async (req, res) => {
  const { id, atributos } = req.body;

  try {
    await updateData("solicitud_de_retiro", "Id_solicitud", id, atributos);
    return res.status(200).json({
      status: 200,
      message: `Solicitud actualizada`,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "El usuario no existe",
    });
  }
});

router.post("/crearSolicitud", auth, async (req, res) => {
  const usuario = await getByID("usuario", "Rut", req.user);

  if (req.body.Monto > usuario[0].Saldo * 0.1 && usuario[0].Saldo > 1000000) {
    return res.status(400).json({
      status: 400,
      message: "El monto es mayor al 10% del sueldo",
    });
  }

  console.log("caca poto peo");

  await updateData("usuario", "Rut", req.user, {
    Saldo: usuario[0].Saldo - parseInt(req.body.Monto),
  });

  await addData("solicitud_de_retiro", {
    Rut_cliente: req.user,
    Monto: parseInt(req.body.Monto),
  });

  res.json({ status: 200, message: "Solicitud creada" });
});

module.exports = router;
