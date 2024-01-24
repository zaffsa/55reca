// app.js
const express = require('express');
const path = require('path');
const app = express();
//routes
const authRoutes = require('./routes/tradicional/authJS');
const depositar = require('./routes/tradicional/depositar');
const gerarPix = require('./routes/tradicional/gerarPix');
const tower = require('./routes/tradicional/admin');
const swap = require('./routes/swap')

const { checkAuthentication } = require('./middleware/middleware');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//models




// Configure o middleware express.static para servir arquivos estáticos
app.use(express.static('statics'));


app.use(express.urlencoded({ extended: false }));

const session = require('express-session');

app.use(session({
  secret: 'seu_segreto',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600444400 }
}));


app.use('/depositar', depositar);
app.use('/tower', tower);
app.use('/', authRoutes);
app.use('/trade/', swap)
app.use('/pix/', gerarPix)
app.listen(80, () => {
  console.log('Servidor rodando na porta 80 :)');
});
//"walletId": "7837991c-ee75-4016-8f16-76b6f216724c",
  //"apiKey": "$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNzI5NjU6OiRhYWNoX2UyMGY0ZTAzLWZlOGItNGNlYy1hZjE0LTZlOTc1Yzk2Njc3MA==",
