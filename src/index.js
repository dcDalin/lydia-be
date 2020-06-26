import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import sequelize from "./db/connection";

import adminRouter from "./routes/admin.routes";

const port = process.env.PORT;

(async () => {
  try {
    // Await db connection
    await sequelize.authenticate();

    const app = express();

    app.disable("x-powered-by");

    app.use(
      cors({
        credentials: true,
        origin: "*",
      })
    );

    app.use(bodyParser.json());

    app.use("/admin", adminRouter);

    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  } catch (err) {
    console.log("Error is: ", error);
  }
})();
