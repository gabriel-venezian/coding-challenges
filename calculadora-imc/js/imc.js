const calcular = document.getElementById('calcular');

function imc() {
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const resultado = document.getElementById('resultado');

    if (altura !== '' && peso !== '') {

        const valorIMC = (peso / (altura * altura)).toFixed(2);

        let classificacao = '';

        if (valorIMC < 18.5) classificacao = 'Abaixo do peso.';
        else if (valorIMC < 25) classificacao = 'Peso ideal.';
        else if (valorIMC < 30) classificacao = 'Acima do peso.';
        else if (valorIMC < 35) classificacao = 'Obesidade Grau I.';
        else if (valorIMC < 40) classificacao = 'Obesidade Grau II.';
        else classificacao = 'Obesidade Grau III.';

        resultado.innerHTML = 'IMC: ' + valorIMC + '<br />';
        resultado.innerHTML += classificacao;
    }
    else resultado.textContent = 'Preencha os campos corretamente.'
}

calcular.addEventListener('click', imc);