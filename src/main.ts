import "module-alias/register";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import ConnectMongoDB from "~/config/connect";
import { createAdminUser } from "~/utils/constants/helper";
import appRouter from "./routers/indexRouter";

dotenv.config();
const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/public", express.static("public"));

// body-parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

appRouter(app);

app
  .listen(port, async () => {
    const result = await ConnectMongoDB();
    const admin = await createAdminUser();
    console.log({
      db: `${result}`,
      server: `Server is listening on port http://localhost:${port}`,
      tkAdmin: `${admin}`,
    });
  })
  .on("error", (err) => {
    console.error("Error occurred while starting the server:", err);
  });
