import { Router } from "express";

import userRoutes from "./userRoutes"

const router = Router();

userRoutes.use(router);

export default router;