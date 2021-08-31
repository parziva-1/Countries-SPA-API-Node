import { Router } from "express";
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
import CountryRoute from "./Country";
import ActivityRoute from "./Activity";
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/country", CountryRoute);
router.use("/activity", ActivityRoute);
export = router;
