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

app.use("/admin", require("./routes/adminRouter.js"));
app.use("/auth", require("./routes/userRouter.js"));
app.use("/customer", require("./routes/customerRouter.js"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
