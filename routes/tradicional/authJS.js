// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');

// Rota para registro de usuário
router.get('/register', (req, res) => {
  res.render('usuarios/comuns/reg');
});
// auth.js
const { body, validationResult } = require('express-validator');


// Rota para registro de usuário com validação
router.post(
  '/registro',
  [
    // body('username').not().isEmpty().withMessage('Nome de usuário é obrigatório'),
    body('email').isEmail().withMessage('E-mail inválido'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).send('E-mail já utilizado.');
      }

      // Gerar hash da senha com bcrypt
      const hashedPassword = await bcrypt.hash(password, 10); // O número 10 representa o número de rounds de salt

      await User.create({ username, email, password: hashedPassword });

      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    }
  }
);



router.post('/logar', 
  body('email').isEmail().withMessage('Insira um endereço de e-mail válido.'),
  body('password').isLength({ min: 5 }).withMessage('A senha deve ter pelo menos 5 caracteres.'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        // Resposta intencionalmente vaga por questões de segurança
        return res.status(401).send('Credenciais inválidas');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        // Resposta intencionalmente vaga por questões de segurança
        return res.status(401).send('Credenciais inválidas');
      }
      
      // Autenticação bem-sucedida
      req.session.user = { id: user.UserId, email: user.email }; // Correção aqui
      const userId = req.session.user.id; // E aqui
      console.log('ID do Usuário:', userId);
     
      req.session.save(err => {
        if (err) {
          // Lide com o erro, se necessário
          console.error(err);
          res.status(500).send('Erro interno do servidor');
        } else {
          // Redirecione para a página do painel do usuário após o login bem-sucedido
          res.redirect('/painel-usuario');
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    }
});
 
// Rota para login de usuário
router.get('/login', (req, res) => {
  res.render('usuarios/comuns/login');
});

router.get('/painel-usuario', (req, res) => {
  if (req.session && req.session.user) {
    console.log('SESSAO', req.session.id)
    res.render('usuarios/comuns/painel');
  } else {
    res.redirect('/login');
  }
});
 




// Rota para painel de administrador
router.get('/painel-admin', (req, res) => {
  // Verifique a autenticação do administrador aqui
  // Se autenticado como administrador, renderize o painel de administrador
  // Caso contrário, redirecione para a página de login
});

module.exports = router;
