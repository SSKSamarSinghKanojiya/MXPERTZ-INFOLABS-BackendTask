const express = require('express');
const router = express.Router();
const { bookAppointment, cancelAppointment, getAppointments } = require('../controllers/appointmentController');
const authmiddleware = require('../middlewares/authmiddleware');

router.post('/book', authmiddleware, bookAppointment);
// router.post('/book', bookAppointment);
router.post('/cancel/:id', authmiddleware, cancelAppointment);
router.get('/', authmiddleware, getAppointments);

module.exports = router;
