const express = require('express');
const router = express.Router();
const clienteController = require('../controller/ClienteController.js');

router.post('/cliente', clienteController.create); //cadastrar cliente
router.post('/cliente/login', clienteController.login); //logar cliente

module.exports = router;
