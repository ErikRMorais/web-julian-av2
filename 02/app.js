const express = require('express');
const path = require('path');

const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 


app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('formulario', { erro: null, precoUnitario: '', quantidade: '', desconto: '' });
});


app.post('/calcular-venda', (req, res) => {
    const { precoUnitario, quantidade, desconto } = req.body;

   
    const pUnitario = parseFloat(precoUnitario);
    const qtd = parseFloat(quantidade);
    const desc = parseFloat(desconto);

    const originalInputs = {
        precoUnitario: precoUnitario,
        quantidade: quantidade,
        desconto: desconto
    };

    
    if (isNaN(pUnitario) || isNaN(qtd) || isNaN(desc)) {
        return res.render('formulario', {
            ...originalInputs,
            erro: 'Erro: Todos os campos devem ser números válidos.'
        });
    }

    if (pUnitario < 0 || qtd < 0 || desc < 0) {
        return res.render('formulario', {
            ...originalInputs,
            erro: 'Erro: Os valores não podem ser negativos.'
        });
    }

    const subtotal = pUnitario * qtd;

    if (desc > subtotal) {
        return res.render('formulario', {
            ...originalInputs,
            erro: `Erro: O desconto (R$ ${desc.toFixed(2)}) não pode ser maior que o subtotal (R$ ${subtotal.toFixed(2)}).`
        });
    }

    const precoFinal = subtotal - desc;

    
    res.render('resultado', {
        precoUnitario: pUnitario,
        quantidade: qtd,
        desconto: desc,
        subtotal: subtotal,
        precoFinal: precoFinal
    });
});


app.listen(port, () => {
    console.log(`Servidor da loja rodando em http://localhost:${port}`);
});