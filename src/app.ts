import "express-async-errors"
import express from "express";
import helmet from "helmet";

import "./database"
import routes from "./routes";
import serviceErrors from "./middlewares/serviceErrors"
import handleAppErrors from "./middlewares/handleAppErrors"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(routes);
app.use(serviceErrors)
app.use(handleAppErrors)

export default app;
