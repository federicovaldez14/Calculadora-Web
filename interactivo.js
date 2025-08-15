let operacion = '';
let valorActual = '';
let valorAnterior = '';
let resultado = document.getElementById('resultado');
let operacionAnterior = document.getElementById('operacion-anterior');
let temaBtn = document.getElementById('tema-btn');

let temaActual = 'brillante';
document.body.setAttribute('data-tema', temaActual);
temaBtn.textContent = '🌙';

function cambiarcolor() {
    if (temaActual === 'brillante') {
        temaActual = 'oscuro';
        document.body.setAttribute('data-tema', 'oscuro');
        temaBtn.textContent = '☀️';
    } else {
        temaActual = 'brillante';
        document.body.setAttribute('data-tema', 'brillante');
        temaBtn.textContent = '🌙';
    }
}

function agregarNumero(num) {
    if (valorActual.length < 12) {
        valorActual += num;
        actualizarDisplay();
    }
}

function agregarPunto() {
    if (!valorActual.includes('.')) {
        if (valorActual === '') valorActual = '0';
        valorActual += '.';
        actualizarDisplay();
    }
}

function setOperacion(op) {
    if (valorActual === '' && resultado.value !== '') {
        valorAnterior = resultado.value;
    } else {
        valorAnterior = valorActual;
    }
    operacion = op;
    valorActual = '';
    actualizarDisplay();
}

function limpiar() {
    valorActual = '';
    valorAnterior = '';
    operacion = '';
    operacionAnterior.textContent = '';
    actualizarDisplay();
}

function calcular() {

     if (valorAnterior === '' || valorActual === '') return;

    let a = parseFloat(valorAnterior);
    var operacionTexto = `${valorAnterior}`;
    operacionAnterior.textContent = operacionTexto;
    let b = parseFloat(valorActual);
    var operacionTexto = `${valorActual}`;
    operacionAnterior.textContent = operacionTexto;
    let res = 0;
    var operacionTexto = `${valorAnterior} ${operacion} ${valorActual}`;
    switch (operacion) {
        case '+': res = a + b; break;
        case '-': res = a - b; break;
        case '×': res = a * b; break;
        case '÷': res = b !== 0 ? a / b : 'Error'; break;
        case '%': res = a % b; break;
        default: res = valorActual;
    }
    resultado.value = (typeof res === 'number' && !isNaN(res)) 
    ? res.toString().slice(0, 12) 
    : res;

    operacionAnterior.textContent = operacionTexto;
    AgregaralHistorial(operacionAnterior,resultado)


    valorAnterior = resultado.value;
    valorActual = '';
    operacion = '';
}

function actualizarDisplay() {
    resultado.value = valorActual;

    if(valorAnterior !='' && operacion != ''){
        operacionAnterior.textContent = `${valorAnterior} ${operacion} ${valorActual}`;
    }else {
        operacionAnterior.textContent=valorActual;
}
}
function AgregaralHistorial(operacionTexto,resultadoValor){
    historial.push(`${operacionTexto} = ${resultadoValor}`);
    mostrarHistorial();
}

function mostrarHistorial(){
    let historiaDiv =  document.getElementById('historial');
    let html = "";
        for (let item of historial) {
        html += `<div>${item}</div>`;
    }
        historiaDiv.innerHTML = html;
}
    