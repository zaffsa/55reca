
    const express = require('express');
    const router = express.Router();
    const axios = require('axios');
    const PixQrCode = require('../../models/PixQrCode');


    router.get('/qrcode', async (req, res) => {
        try {
            // Supondo que o ID do usuário esteja armazenado na sessão após o login
            const userId = req.session.user.id;
            const qrCodeData = await PixQrCode.findOne({ where: { userId: userId } });

            // Renderizando a página EJS e passando os dados do QR Code
            res.render('pix/gerarPix', { user: req.session.user.id, qrCodeImage: qrCodeData.encodedImage, qrCodePayload: qrCodeData.qrCodePayload });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao carregar o QR Code');
        }
    }   );


    router.post('/generateqrcode', async (req, res) => {
        const { description, value } = req.body;

        const url = 'https://sandbox.asaas.com/api/v3/pix/qrCodes/static';
        const headers = {
            'accept': 'application/json',
            'content-type': 'application/json',
            'access_token': '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNzE0MDQ6OiRhYWNoXzNkYzNkZDQzLTZiNTctNDk0Ny05ZmRhLWMyMzM5NGExMWEzZA=='
        };
        const requestBody = {
            addressKey: '18d008fd-3eb6-4e1c-ae00-1872237764d3',
            value: value,
            format: 'ALL',
            expirationSeconds: 900,
            allowsMultiplePayments: false
        };

        try {
            const response = await axios.post(url, requestBody, { headers });
            const data = response.data;
            const userId = req.session.user.id; // Obtenha o ID do usuário do sistema de autenticação
    
            if (response.status === 200) {
                // Armazena o QR Code no banco de dados
                const qrCode = await PixQrCode.create({
                    description,
                    value,
                    addressKey: data.addressKey,
                    expirationDate: data.expirationDate,
                    qrCodePayload: data.payload,
                    encodedImage: data.encodedImage,
                    userId:userId
                }); 

                res.redirect('/pix/qrcode');
            } else {
                console.error('Erro ao gerar QR Code PIX:', data);
                res.status(500).send('Erro interno do servidor');
            }
        } catch (error) {
            console.error('Erro ao gerar QR Code PIX:', error);
            res.status(500).send('Erro interno do servidor');
        }
    });



module.exports = router;
 