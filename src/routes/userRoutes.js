const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/authmiddleware');
const { getAllUsers } = require("../controllers/userController")

router.get('/', authmiddleware, getAllUsers);

module.exports = router;
