import express from "express";
import { sendMails } from "../controller/mail.js";

const route = express.Router();

route.post("/sendMails", sendMails);

export default route;
