const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    
    res.render('formulario', { erro: null, tensao: '', corrente: '' });
});


app.post('/calcular-resistencia', (req, res) => {
    const { tensao, corrente } = req.body;

    
    const V = parseFloat(tensao);
    const I = parseFloat(corrente);

    
    const inputsOriginais = {
        tensao: tensao,
        corrente: corrente
    };

   
    if (isNaN(V) || isNaN(I)) {
        return res.render('formulario', {
            ...inputsOriginais,
            erro: 'Erro: Tensão e Corrente devem ser números válidos.'
        });
    }

    if (I === 0) {
        return res.render('formulario', {
            ...inputsOriginais,
            erro: 'Erro: A corrente (I) não pode ser zero para calcular a resistência (divisão por zero).'
        });
    }


    const R = V / I;

  
    res.render('resultado', {
        tensaoEntrada: V,
        correnteEntrada: I,
        resistenciaCalculada: R
    });
});


app.listen(port, () => {
    console.log(`Servidor da Calculadora de Resistência rodando em http://localhost:${port}`);
});