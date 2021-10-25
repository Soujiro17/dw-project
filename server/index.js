const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const db = require("./database");

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

// app.get("/", async (req, res) => {
//   const resultados = await db.sequelize.query(
//     "SELECT * from usuario WHERE usuario.Rut=204427968",
//     { type: db.sequelize.QueryTypes.SELECT }
//   );

//   res.json(resultados);
// });

app.use("/sql", require("./routes/index.js"));
app.use("/auth", require("./routes/userRouter.js"));
app.use("/customer", require("./routes/customerRouter.js"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
