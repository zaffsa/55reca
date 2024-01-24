// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');

// Rota para login de usuário
router.get('/login', (req, res) => {
  res.render('usuarios/comuns/login');
});
//TOWER É O SISTEMA DE ADMINISTRAÇAO DA EXCHANGE
router.get('/tower', (req, res) => {
 // if (req.session && req.session.user) {
 //   console.log('SESSAO', req.session.id)
    res.render('usuarios/admin/tower');
 // } else {
 //   res.redirect('/login');
  //}
});






module.exports = router;
