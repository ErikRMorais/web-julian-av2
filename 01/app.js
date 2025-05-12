const express = require('express');
const path = require('path'); 
const fs = require('fs');     

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'formulario.html'));
});

app.post('/calcular-media', (req, res) => {
    
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
    const num3 = parseFloat(req.body.num3);
    const num4 = parseFloat(req.body.num4);

    if (isNaN(num1) || isNaN(num2) || isNaN(num3) || isNaN(num4)) {
        
        return res.status(400).send('Erro: Todos os campos devem ser números válidos.');
    }

    const media = (num1 + num2 + num3 + num4) / 4;

    fs.readFile(path.join(__dirname, 'views', 'resultado.html'), 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo resultado.html:", err);
            return res.status(500).send("Erro interno no servidor ao tentar ler o template.");
        }

        
        let htmlResposta = data.replace('<!--NUMEROS_ENTRADA-->', `${num1}, ${num2}, ${num3}, ${num4}`);
        htmlResposta = htmlResposta.replace('<!--MEDIA_CALCULADA-->', media.toFixed(2)); 

        res.send(htmlResposta);
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});