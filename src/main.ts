import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
<<<<<<< HEAD
import ConnectMongoDB from "./config/connect";
=======
import cors from "cors";
import ConnectMongoDB from "~/config/connect";
import CreateAdminUser from "~/utils/constants/helper";
import appRouter from "./routers/indexRouter";
>>>>>>> 0f96332 (Code api auth login)

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
<<<<<<< HEAD
    const resultConnect = {
      'db': `${result}`,
      'server': `Server is listening on port localhost:${port}`
    }
    console.log(resultConnect);
=======
    const admin = await CreateAdminUser();
    console.log({
      db: `${result}`,
      server: `Server is listening on port localhost:${port}`,
      tkAdmin: `${admin}`,
    });
>>>>>>> 0f96332 (Code api auth login)
  })
  .on("error", (err) => {
    console.error("Error occurred while starting the server:", err);
  });
