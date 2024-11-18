import express from "express";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use("/public", express.static("public"));

// body-parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});

app.listen(port, () => {
  console.log(`Server is listening on port localhost:${port}`);
}).on('error', (err) => {
  console.error('Error occurred while starting the server:', err);
});