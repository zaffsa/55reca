const axios = require('axios');
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
        const priceWithBuyFee = Math.max(realTimePrice * (1 + buyFee), 0);
        return priceWithBuyFee;
    } else {
        return null;
    }
}

async function getPriceWithSellFee(coinId, sellFee) {
    const realTimePrice = await getRealTimePrice(coinId);
    if (realTimePrice !== null) {
        // Garantir que o preço com a taxa de venda seja sempre positivo
        const priceWithSellFee = Math.max(realTimePrice * (0.35 - sellFee));
        return priceWithSellFee;
    } else {
        return null;
    }
}

// Exemplo de uso
getPriceWithSellFee('bitcoin', 10).then(price => {
    console.log(price.map(preco => Math.abs(preco)))
}).catch(error => {
    console.error("Erro ao calcular o preço com taxa:", error);
});
