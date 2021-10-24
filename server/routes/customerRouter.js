const express = require("express");
const { getByID } = require("../controllers/dbControllers.js");
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

module.exports = router;
