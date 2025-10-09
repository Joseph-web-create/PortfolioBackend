import express from "express";
import cors from "cors";
import sendmeMail from "./src/routes/mail.js";
const app = express();
const port = 3000;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://portfolio-chi-six-jnpbqearet.vercel.app",
  ],
  optionsSuccessStatus: 200,
  method: ["GET", "POST", "PATCH", "DELETE"],
  credential: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello world");
});

app.use("/send", sendmeMail);

app.listen(port, () => console.log("server starting at", port));
