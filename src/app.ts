import "express-async-errors"
import express from "express";
import helmet from "helmet";

import "./database"
import routes from "./routes";
import errors from "./middlewares/errors"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(routes);
app.use(errors)

export default app;
