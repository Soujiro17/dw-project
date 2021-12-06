const express = require("express");
const auth = require("../middlewares/auth.js");
const router = express.Router();

const Region = require('../models/region');
const Comuna = require('../models/comuna');
const Usuario = require('../models/usuario');
const Ejecutivo = require('../models/ejecutivo');
const Provincia = require('../models/provincia');
const Direccion = require('../models/direccion');
const SolicitudDeRetiro = require('../models/solicitud_de_retiro.js');

router.get("/info", auth, async (req, res) => {
  const usuario = await Usuario.findOne( { rut: req.user } ).exec();
  const ejecutivo = await Ejecutivo.findOne( { rut: req.user } ).exec();
  if (!usuario && !ejecutivo)
  return res.status(400).json({
    status: 400,
    message: "El usuario no existe",
  });
  
  const info = {
    Rut: usuario?.rut || ejecutivo?.rut,
    Nombres: usuario?.nombres || ejecutivo?.nombres,
    Apellidos: usuario?.apellidos || ejecutivo?.apellidos,
    Saldo: usuario?.saldo || ejecutivo?.saldo,
    typeAccount: usuario ? "cliente" : "admin",
  };
  res.json(info);
});

router.get("/solicitudes", auth, async (req, res) => {
  const solicitudes = await SolicitudDeRetiro.find({cliente: req.userId})
  .populate('cliente', 'rut').exec();
  const informationResponse = solicitudes.map( ( { _id, cliente, monto, aprobado, fecha_solicitud } ) => {
    return {
      Id_solicitud: _id,
      Rut: cliente.rut,
      Monto: monto,
      Aprobado: aprobado,
      Fecha_solicitud: fecha_solicitud,

    };
  });

  if (!solicitudes.length)
    return res.status(400).json({
      status: 400,
      message: "El usuario no existe",
    });

  res.json(informationResponse);
});

router.put("/actualizarSolicitud", auth, async (req, res) => {
  const { id, atributos } = req.body;
  try {
    await SolicitudDeRetiro.findOneAndUpdate( { _id: id }, { aprobado: atributos.aprobado, empleador: req.userId });
    return res.status(200).json({
      status: 200,
      message: `Solicitud actualizada`,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "La solicitud no existe",
    });
  }
});

router.post("/crearSolicitud", auth, async (req, res) => {
  try{
    const usuario = await Usuario.findOne( { rut: req.user } ).exec();
  
    if (req.body.Monto > usuario.saldo * 0.1 && usuario.saldo > 1000000) {
      return res.json({
        status: 400,
        message: "El monto es mayor al 10% del sueldo",
      });
    }
  
    await Usuario.findOneAndUpdate({ rut: req.user }, { saldo: usuario.saldo - parseInt(req.body.Monto) });
  
    const newSolicitud = new SolicitudDeRetiro({
      cliente: usuario._id,
      monto: parseInt(req.body.Monto),
    });
    await newSolicitud.save();
    res.json({ status: 200, message: "Solicitud creada" });
  }catch(error){
    return res.status(400).json({
      status: 500,
      message: error.message,
    });
  }
});

router.post("/agregarRegion", async (req, res) => {
  try{
    const { nombre, romano, num_provincias, num_comunas } = req.body;
    const newRegion = new Region( { nombre, romano, num_provincias, num_comunas } );
    await newRegion.save();
    res.json({ status: 200, message: "Region creada" });

  }catch(error){
    return res.status(400).json({
      status: 500,
      message: error.message,
    });
  }
});

//{ $push: { friends: objFriends  }}
router.post("/agregarProvincia", async (req, res) => {
  try{
    const { id_region, nombre, num_comunas } = req.body;
    const newProvincia = new Provincia( { id_region, nombre, num_comunas } );
    await newProvincia.save();
    res.json({ status: 200, message: "Provincia creada" });
  }catch(error){
    return res.status(400).json({
      status: 500,
      message: error.message,
    });
  }
});

router.post("/agregarComuna", async (req, res) => {
  try{
    const { id_provincia, nombre } = req.body;
    const newComuna = new Comuna( { id_provincia, nombre } );
    await newComuna.save();
    res.json({ status: 200, message: "Comuna creada" });
  }catch(error){
    return res.status(400).json({
      status: 500,
      message: error.message,
    });
  }
});

router.post("/agregarDireccion", async (req, res) => {
  try{
    const { id_region, id_provincia, id_comuna, calle, num_casa, codigo_postal } = req.body;
    const newDireccion = new Direccion( { id_region, id_provincia, id_comuna, calle, num_casa, codigo_postal } );
    await newDireccion.save();
    res.json({ status: 200, message: "Direccion creada" });

  }catch(error){
    return res.status(400).json({
      status: 500,
      message: error.message,
    });
  }
});

module.exports = router;
