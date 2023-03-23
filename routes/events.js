/**
    Rutas de Eventos
    /api/events
 */
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { isDate } = require("../helpers/isDate");
const router = Router();

// Todas tienen que pasar por la validacion de JWT
router.use(validarJWT); //Al hacer esto, cualquier peticion que este por debajo de esto tienen que validar el token

// Obtener Eventos
router.get("/", getEventos);

// Crear un nuevo Evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// Actualizar Evento
router.put("/:id", actualizarEvento);

// Borrar Eventos
router.delete("/:id", eliminarEvento);

module.exports = router;
