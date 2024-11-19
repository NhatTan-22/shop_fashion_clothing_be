import "module-alias/register";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import ConnectMongoDB from "~/config/connect";
import CreateAdminUser from "~/utils/constants/helper";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use("/public", express.static("public"));

// body-parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app
  .listen(port, async () => {
    const result = await ConnectMongoDB();
    const admin = await CreateAdminUser();
    const resultConnect = {
      db: `${result}`,
      server: `Server is listening on port localhost:${port}`,
      tkAdmin: `${admin}`,
    };
    console.log(resultConnect);
  })
  .on("error", (err) => {
    console.error("Error occurred while starting the server:", err);
  });
