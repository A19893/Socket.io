const express= require("express");
const { createAlarm, getAlarm, deleteAlarm } = require("../controllers/Alarm");

const router= express.Router();

router.post('/', createAlarm);

router.get('/:id', getAlarm)

router.delete('/:id', deleteAlarm);
module.exports = router;