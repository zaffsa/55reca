// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { checkAuthentication } = require('../middleware/middleware'); // Importe o middleware


router.get('/depositar', async (req, res) => {
  if (req.session && req.session.user) {
    console.log('SESSAO', req.session.id)
    console.log('ID do usuário na sessão:', req.session.user.id);

    res.render('trade/deposito');
  } else {
    res.redirect('/login');
  }

  // Passe o id do usuário (e qualquer outra informação do usuário, se necessário) para o template EJS
  
});


router.post('/deposito', checkAuthentication, async (req, res) => {
  try {
    const { balanceBRL } = req.body;
    
    //await User.update({
        //balanceBRL,
      // });

    res.redirect('/logar');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar usuário');
  }
});
module.exports = router;
