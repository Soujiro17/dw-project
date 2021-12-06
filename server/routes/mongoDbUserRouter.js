const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = require('../models/usuario');

router.post("/sign", async (req, res) => {
  const { rut, nombres, apellidos, email, telefono, contraseña, id_direccion } = req.body;

  if (!nombres || !apellidos || !email || !rut || !contraseña || !id_direccion)
    return res
      .status(400)
      .json({ status: 400, message: "Por favor, llena todos los campos" });
  if (contraseña.length < 6)
    return res.status(400).json({
      status: 400,
      message: "La contraseña debe tener 6 caracteres como mínimo",
    });

  const usuario = await Usuario.findOne( { rut } ).exec();

  if (usuario)
    return res.status(400).json({
      status: 400,
      message: "El usuario ya existe",
    });

  const salt = await bcrypt.genSalt();

  const ContraseñaHash = await bcrypt.hash(contraseña, salt);

  const newUser = new Usuario({
    rut,
    nombres,
    apellidos,
    email,
    telefono,
    contraseña: ContraseñaHash,
    id_direccion,
  });

  await newUser.save();

  const token = jwt.sign(
    {
      user: newUser.rut,
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
  const { rut, contraseña } = req.body;

  if (!rut || !contraseña)
    return res
      .status(400)
      .json({ status: 400, message: "Por favor llena todos los campos" });

  const usuario = await Usuario.findOne( { rut } ).exec();


  if (!usuario)
    return res.status(400).json({
      status: 400,
      message: "El RUT ingresado no existe",
    });

  const contraseñaCorrect = await bcrypt.compare(
    contraseña,
    usuario.contraseña
  );

  if (!contraseñaCorrect)
    return res
      .status(401)
      .json({ status: 401, message: "Contraseña incorrecta" });

  const token = jwt.sign(
    {
      user: usuario.rut,
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
