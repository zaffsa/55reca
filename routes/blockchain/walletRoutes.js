const express = require('express');
//const walletController = require('../controllers/walletController');
const router = express.Router();

// Rota para obter o saldo da carteira
router.get('/saldo', walletController.obterSaldo);

// Rota para realizar uma transferência
router.post('/transferir', walletController.efetuarTransferencia);

// Adicionar mais rotas conforme necessário

module.exports = router;
