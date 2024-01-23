// middleware/authMiddleware.js

// Middleware para verificar a autenticação do usuário
function checkAuthentication(req, res, next) {
    if (req.session.user) {
      // Se o usuário estiver autenticado, siga para a próxima rota
      next();
    } else {
      // Se o usuário não estiver autenticado, redirecione para a página de login
      res.redirect('/login');
    }
  }
  
  module.exports = {
    checkAuthentication,
  };
