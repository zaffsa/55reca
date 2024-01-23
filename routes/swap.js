const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

const CurrencyPair = require('../models/CurrencyPair');

// Em currencypair
const axios = require('axios');


router.get('/tower/add-currency-pair', async (req, res) => {
  async function getRealTimePrice(coinId) {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=brl`);
        return response.data[coinId].brl;
    } catch (error) {
        console.error("Erro ao obter o preço da moeda:", error);
        return null;
    }
}
async function getPriceWithBuyFee(coinId, buyFee) {
    const realTimePrice = await getRealTimePrice(coinId);
    if (realTimePrice !== null) {
        // Garantir que o preço com a taxa de compra seja sempre positivo
        const priceWithBuyFee = Math.max(realTimePrice * ( 1 + buyFee));
        return priceWithBuyFee;
    } else {
        return null;
    }
}

async function getPriceWithSellFee(coinId, sellFee) {
    const realTimePrice = await getRealTimePrice(coinId);
    if (realTimePrice !== null) {
        // Garantir que o preço com a taxa de venda seja sempre positivo
        const priceWithSellFee = Math.max(realTimePrice * (1 - sellFee));
        return priceWithSellFee;
    } else {
        return null;
    }
}

//getPriceWithSellFee('bitcoin', 10).then(price => {
  //console.log(Math.abs(price)); // Isso garante que o preço seja positivo
//}).catch(error => {
 // console.error("Erro ao calcular o preço com taxa:", error);
//node});

const coinId = 'bitcoin'; // ou obtenha este valor de req.query ou de outra fonte
const buyFee = 0.035; // Exemplo: 2% de taxa de compra
const sellFee = 0.035; // Exemplo: 2% de taxa de venda

try {
  const priceWithBuyFee = await getPriceWithBuyFee(coinId, buyFee);
  const priceWithSellFee = await getPriceWithSellFee(coinId, sellFee);

  res.render('admin/currencypair', {
      priceWithBuyFee: priceWithBuyFee,
      priceWithSellFee: priceWithSellFee
  });
} catch (error) {
  console.error("Erro ao obter preços:", error);
  res.render('admin/currencypair', { error: "Erro ao carregar preços" });
}
});

router.post('/tower/add-currency-pair', async (req, res) => {
    const { name, buyRate, sellRate, liquidity } = req.body;
    try {
        await CurrencyPair.create({ name, buyRate, sellRate, liquidity });
        res.redirect('/trade/tower/add-currency-pair');
    } catch (error) {
        res.status(500).send(error.message);
    }
});
// routes/auth.js

 



//ROTA DO USUARIO


async function getRealTimePrice(coinId) {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=brl`);
        return response.data[coinId].brl;
    } catch (error) {
        console.error("Erro ao obter o preço da moeda:", error);
        return null;
    }
}

// Rota para que o usuário possa consultar o preço de uma criptomoeda
router.get('/user/get-price/:coinId', async (req, res) => {
    const coinId = req.params.coinId;
    const price = await getRealTimePrice(coinId);
    if (price) {
        res.json({ price });
    } else {
        res.status(500).json({ error: "Não foi possível obter o preço da moeda." });
    }
});
// Função auxiliar para atualizar o saldo do usuário
async function updateUserBalance(userId, currency, amount) {
  try {
      const user = await User.findByPk(userId);
      if (user) {
          user[currency] += amount;
          await user.save();
          return true;
      }
      return false;
  } catch (error) {
      console.error("Erro ao atualizar saldo do usuário:", error);
      return false;
  }
}

// Rota para comprar criptomoeda
router.post('/user/buy-crypto', async (req, res) => {
  const { userId, coinId, amount } = req.body;
  const priceWithBuyFee = await getRealTimePrice(coinId); // Aqui você pode incluir a taxa de compra

  if (priceWithBuyFee) {
      const totalCost = amount * priceWithBuyFee;
      const updated = await updateUserBalance(userId, 'balanceBRL', -totalCost);
      if (updated) {
          await updateUserBalance(userId, `balance${coinId.toUpperCase()}`, amount);
          res.json({ message: "Compra realizada com sucesso!" });
      } else {
          res.status(500).json({ error: "Não foi possível realizar a compra." });
      }
  } else {
      res.status(500).json({ error: "Preço da criptomoeda não disponível." });
  }
});

// Rota para vender criptomoeda
router.post('/user/sell-crypto', async (req, res) => {
  // Implementar lógica similar à de compra, mas invertendo a lógica de saldo
});

module.exports = router;



module.exports = router;
