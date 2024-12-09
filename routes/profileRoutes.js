const express = require('express');
const qr = require('qr-image');
const db = require('../database/db');
const { getIo } = require('../websocket/io');  // Importa o `io`
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.post('/', async (req, res) => {
    const { url } = req.body;
    const { name } = req.body;
    try {
        const qr_svg = qr.imageSync(url, { type: 'png' }).toString('base64');
        const qrCode = `data:image/png;base64,${qr_svg}`;

        if (!url.includes('linkedin.com') && length(url) < 20) {
            url = `https://www.linkedin.com/in/${url}`;
        }


        await db.addProfile(url, name, qrCode);
        const profiles = await db.getAllProfiles();
        getIo().emit('updateProfiles', profiles);  // Usa o WebSocket
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send('Erro ao adicionar perfil.');
    }
});

module.exports = router;
