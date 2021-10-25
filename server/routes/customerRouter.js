const express = require("express");
const { getByID, updateData } = require("../controllers/dbControllers.js");
const auth = require("../middlewares/auth.js");
const router = express.Router();

router.get("/info", auth, async (req, res) => {
  getByID("Usuario", "Rut", req.user, async (err, resp) => {
    if (err) return undefined;

    if (!resp.length)
      return res.status(400).json({
        status: 400,
        message: "El usuario no existe",
      });

    const info = {
      Rut: resp[0].Rut,
      Nombres: resp[0].Nombres,
      Apellidos: resp[0].Apellidos,
      Saldo: resp[0].Saldo,
    };
    res.json(info);
  });
});

router.get("/solicitudes", auth, async (req, res) => {
  getByID("Solicitud_de_retiro", "Rut_cliente", req.user, async (err, resp) => {
    if (err) return undefined;
  
    if (!resp.length)
      return res.status(400).json({
        status: 400,
        message: "El usuario no existe",
      });

    const info = {
      Rut: resp[0].Rut_cliente,
      Fecha: resp[0].Fecha_solicitud,
      Monto: resp[0].Monto,
      Aprobado: resp[0].Aprobado
    };
    console.log(info)
    res.json(info);
  });
});

router.put("/actualizarSolicitud", async (req, res) => {
  const { rutCliente, atributos } =  req.body;
  updateData("Solicitud_de_retiro", "Rut_cliente", rutCliente, atributos, async (err, resp) => {
    
    if (err) return undefined;

    if (resp.affectedRows === 0)
    return res.status(400).json({
      status: 400,
      message: "El usuario no existe",
    });
      
    return res.status(200).json({
      status: 200,
      message: `Solicitud actualizada`,
    });

  });
});

module.exports = router;
