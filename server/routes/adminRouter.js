const express = require("express");
const router = express.Router();
const { getAll, getSolicitudes } = require("../controllers/dbControllers");

router.get("/solicitudes", async (req, res) => {
  const solicitudes = await getSolicitudes();

  res.status(200).json(solicitudes);
});

module.exports = router;
