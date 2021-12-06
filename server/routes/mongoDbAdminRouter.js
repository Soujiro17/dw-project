const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = require('../models/usuario');
const Ejecutivo = require('../models/ejecutivo');
const SolicitudDeRetiro = require('../models/solicitud_de_retiro.js');

router.post("/sign", async (req, res) => {
  const { rut, nombres, apellidos, email, telefono, contraseña, cargo, id_direccion } = req.body;

  if (!nombres || !apellidos || !email || !rut || !contraseña || !id_direccion)
    return res
      .status(400)
      .json({ status: 400, message: "Por favor, llena todos los campos" });
  if (contraseña.length < 6)
    return res.status(400).json({
      status: 400,
      message: "La contraseña debe tener 6 caracteres como mínimo",
    });

  const ejecutivo = await Ejecutivo.findOne( { rut } ).exec();

  if (ejecutivo)
    return res.status(400).json({
      status: 400,
      message: "El usuario ya existe",
    });

  const salt = await bcrypt.genSalt();

  const ContraseñaHash = await bcrypt.hash(contraseña, salt);

  const newEjecutivo = new Ejecutivo({
    rut,
    nombres,
    apellidos,
    email,
    telefono,
    contraseña: ContraseñaHash,
    cargo,
    id_direccion,
  });

  await newEjecutivo.save();

  const token = jwt.sign(
    {
      user: newEjecutivo.rut,
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

router.get("/solicitudes", async (req, res) => {
  const solicitudes = await SolicitudDeRetiro.find({}).exec();
  const informationResponse =  await Promise.all(
    solicitudes.filter( ( {aprobado} ) => aprobado === -1).map( async ( { _id, rut_cliente, rut_empleador, monto, aprobado, fecha_solicitud } ) => {
      const usuario = await Usuario.findOne( { rut: rut_cliente } ).exec();
        return {
          Id_solicitud: _id,
          Rut: rut_cliente,
          Nombres: usuario.nombres,
          Apellidos: usuario.apellidos,
          Email: usuario.email,
          Telefono: usuario.telefono,
          Monto: monto,
          Aprobado: aprobado,
          Fecha_solicitud: fecha_solicitud,
        };
      })
  )
  res.status(200).json(informationResponse);
});

router.post("/login", async (req, res) => {
  const { rut, contraseña } = req.body;
  if (!rut || !contraseña)
    return res
      .status(400)
      .json({ status: 400, message: "Por favor llena todos los campos" });

  const ejecutivo =   await Ejecutivo.findOne( { rut } ).exec();

  if (!ejecutivo)
    return res.status(400).json({
      status: 400,
      message: "El RUT ingresado no existe",
    });

  const contraseñaCorrect = await bcrypt.compare(
    contraseña,
    ejecutivo.contraseña
  );

  if (!contraseñaCorrect)
    return res
      .status(401)
      .json({ status: 401, message: "Contraseña incorrecta" });

  const tokenadm = jwt.sign(
    {
      user: ejecutivo.rut,
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
