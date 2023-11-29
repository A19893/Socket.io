const express= require("express");
const { createAlarm, getAlarm, deleteAlarm, dueAlarm, updateAlarm } = require("../controllers/Alarm");

const router= express.Router();

router.post('/', createAlarm);

router.get('/:id', getAlarm)

router.patch('/:id', updateAlarm)

router.get('/due/:id', dueAlarm)

router.delete('/:id', deleteAlarm);

module.exports = router;