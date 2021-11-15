const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getSolicitudes, getByID } = require("../controllers/dbControllers");
require("dotenv").config();

router.get("/solicitudes", async (req, res) => {
  const solicitudes = await getSolicitudes();

  res.status(200).json(solicitudes);
});

router.post("/login", async (req, res) => {
  const { Rut, Contraseña } = req.body;

  if (!Rut || !Contraseña)
    return res
      .status(400)
      .json({ status: 400, message: "Por favor llena todos los campos" });

  const ejecutivo = await getByID("ejecutivo", "Rut", Rut);

  if (!ejecutivo.length)
    return res.status(400).json({
      status: 400,
      message: "El RUT ingresado no existe",
    });

  const ContraseñaCorrect = await bcrypt.compare(
    Contraseña,
    ejecutivo[0].Contraseña
  );

  if (!ContraseñaCorrect)
    return res
      .status(401)
      .json({ status: 401, message: "Contraseña incorrecta" });

  const tokenadm = jwt.sign(
    {
      user: ejecutivo[0].Rut,
    },
    process.env.JWT_SECRET
  );
  res.cookie("tokenadm", tokenadm, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.send(true);
});

router.get("/logout", async (req, res) => {
  res.cookie("tokenadm", "", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expires: new Date(0),
  });

  res.send();
});

router.get("/loggedIn", async (req, res) => {
  try {
    const tokenadm = req.cookies.tokenadm;

    if (!tokenadm) return res.json(false);

    jwt.verify(tokenadm, process.env.JWT_SECRET);

    res.json({ loggedIn: true, typeAccount: "admin" });
  } catch (err) {
    res.json({ loggedIn: true, typeAccount: "admin" });
  }
});

module.exports = router;
