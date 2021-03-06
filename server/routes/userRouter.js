const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { addData, getByID } = require("../controllers/dbControllers");
require("dotenv").config();

router.post("/sign", async (req, res) => {
  const { Nombres, Apellidos, Email, Rut, Contraseña, Id_direccion } = req.body;

  if (!Nombres || !Apellidos || !Email || !Rut || !Contraseña || !Id_direccion)
    return res
      .status(400)
      .json({ status: 400, message: "Por favor, llena todos los campos" });
  if (Contraseña.length < 6)
    return res.status(400).json({
      status: 400,
      message: "La contraseña debe tener 6 caracteres como mínimo",
    });

  const usuario = await getByID("usuario", "Rut", Rut);

  if (usuario.length)
    return res.status(400).json({
      status: 400,
      message: "El usuario ya existe",
    });

  const salt = await bcrypt.genSalt();

  const ContraseñaHash = await bcrypt.hash(Contraseña, salt);

  const newUser = {
    Nombres,
    Apellidos,
    Email,
    Rut,
    Contraseña: ContraseñaHash,
    Id_direccion,
  };

  await addData("usuario", newUser);

  const token = jwt.sign(
    {
      user: newUser.Rut,
    },
    process.env.JWT_SECRET
  );

  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .send(true);
});

router.post("/login", async (req, res) => {
  const { Rut, Contraseña } = req.body;

  if (!Rut || !Contraseña)
    return res
      .status(400)
      .json({ status: 400, message: "Por favor llena todos los campos" });

  const usuario = await getByID("usuario", "Rut", Rut);

  if (!usuario.length)
    return res.status(400).json({
      status: 400,
      message: "El RUT ingresado no existe",
    });

  const ContraseñaCorrect = await bcrypt.compare(
    Contraseña,
    usuario[0].Contraseña
  );

  if (!ContraseñaCorrect)
    return res
      .status(401)
      .json({ status: 401, message: "Contraseña incorrecta" });

  const token = jwt.sign(
    {
      user: usuario[0].Rut,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.send(true);
});

router.get("/logout", async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expires: new Date(0),
  });

  res.send();
});

router.get("/loggedIn", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.json({ loggedIn: true, typeAccount: "cliente" });
  } catch (err) {
    res.json({ loggedIn: true, typeAccount: "cliente" });
  }
});

module.exports = router;
