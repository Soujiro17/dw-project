const express = require("express");
const { getByID, updateData } = require("../controllers/dbControllers.js");
const auth = require("../middlewares/auth.js");
const router = express.Router();

router.get("/info", auth, async (req, res) => {
  const usuario = await getByID("usuario", "Rut", req.user);

  if (!usuario.length)
    return res.status(400).json({
      status: 400,
      message: "El usuario no existe",
    });

  const info = {
    Rut: usuario[0].Rut,
    Nombres: usuario[0].Nombres,
    Apellidos: usuario[0].Apellidos,
    Saldo: usuario[0].Saldo,
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
  const { rutCliente, atributos } = req.body;

  try {
    await updateData(
      "solicitud_de_retiro",
      "Rut_cliente",
      rutCliente,
      atributos
    );
    return res.status(200).json({
      status: 200,
      message: `Solicitud actualizada`,
    });
  } catch {
    return res.status(400).json({
      status: 400,
      message: "El usuario no existe",
    });
  }
});

module.exports = router;
