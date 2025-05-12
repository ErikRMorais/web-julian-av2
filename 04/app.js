const express = require('express');
const path = require('path');

const app = express();
const port = 3000; 


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 


app.get('/', (req, res) => {
    const agora = new Date();
    const fusoHorarioSinop = 'America/Cuiaba'; 

    
    const opcoesData = {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long',   
        day: 'numeric',   
        timeZone: fusoHorarioSinop
    };

    const opcoesHora = {
        hour: '2-digit',   
        minute: '2-digit', 
        second: '2-digit', 
        timeZone: fusoHorarioSinop,
        hour12: false      
    };

    const dataFormatada = agora.toLocaleDateString('pt-BR', opcoesData);
    const horaFormatada = agora.toLocaleTimeString('pt-BR', opcoesHora);

    res.render('index', {
        dataFormatada: dataFormatada,
        horaFormatada: horaFormatada,
        fusoHorarioUtilizado: fusoHorarioSinop
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Exibindo data e hora para o fuso horário de Sinop, MT (${'America/Cuiaba'}).`);
});