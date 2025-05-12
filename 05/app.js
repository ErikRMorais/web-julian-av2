const express = require('express');
const path = require('path');

const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('formulario', { erro: null, nota1: '', nota2: '', nota3: '' });
});

app.post('/calcular-media', (req, res) => {
    const { nota1, nota2, nota3 } = req.body;

    const n1 = parseFloat(nota1);
    const n2 = parseFloat(nota2);
    const n3 = parseFloat(nota3);

    const inputsOriginais = { nota1, nota2, nota3 }; 

    
    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        return res.render('formulario', {
            ...inputsOriginais,
            erro: 'Erro: Todas as notas devem ser números válidos.'
        });
    }

    if (n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10 || n3 < 0 || n3 > 10) {
        return res.render('formulario', {
            ...inputsOriginais,
            erro: 'Erro: As notas devem estar entre 0 e 10.'
        });
    }

    const media = (n1 + n2 + n3) / 3;
    let statusAluno;
    let imagemStatus;

    if (media >= 6.0) {
        
        imagemStatus = '/images/aprovado.png'; 
    } else {

        imagemStatus = '/images/reprovado.png'; 
    }

    res.render('resultado', {
        n1: n1,
        n2: n2,
        n3: n3,
        mediaCalculada: media,
        status: statusAluno,
        imagemStatus: imagemStatus
    });
});


app.listen(port, () => {
    console.log(`Servidor de verificação de aprovação rodando em http://localhost:${port}`);
});