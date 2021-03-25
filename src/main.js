
let buttton = document.querySelector(`#consultar-tasas`);
buttton.onclick = function (event) {
    resetearResultado();
    let date = document.querySelector(`#date`).value;
    let base = document.querySelector(`#base`).value;
    let resultadoHeaderDate = document.querySelector(`.strong-date`);
    let resultadoHeaderBase = document.querySelector(`.strong-base`);
    let resultadoUl = document.querySelector(`.resultado-ul`)

    validarFecha();

    if (date != ``) {
        borrarErroresMostrados();
        fetch(`https://api.exchangeratesapi.io/${date}?base=${base}`)
            .then(respuesta => respuesta.json())
            .then(respuestaJSON => {

                Object.keys(respuestaJSON.rates).forEach(moneda => {
                    let newLi = document.createElement(`li`)
                    newLi.className = `moneda-li`;
                    newLi.textContent = `${moneda}: ${respuestaJSON.rates[moneda]}`;
                    resultadoUl.appendChild(newLi);

                })
            });

        resultadoHeaderDate.textContent = date;
        resultadoHeaderBase.textContent = base;
        mostrarResultado();
    }

    event.preventDefault()

};
function mostrarResultado() {
    let resultado = document.querySelector(`#resultado`)
    resultado.className = `resultado`;
};
function ocultarResultado() {
    let resultado = document.querySelector(`#resultado`);
    resultado.className = `oculto`;
}

function resetearResultado() {
    let liElements = document.querySelectorAll(`.moneda-li`)
    liElements.forEach(li => {
        li.remove();
    })
};

/* Seccion Errores */
function validarFecha() {
    let date = document.querySelector(`#date`).value;
    if (date === ``) {
        ocultarResultado();
        mostrarErrores();
    }
};
function borrarErroresMostrados() {
    let inputError = document.querySelector(`#date`);
    inputError.style.border = ``;
    let cartelError = document.querySelector(`#mostrar-errores`);
    cartelError.className = `oculto`;
};
function mostrarErrores() {
    let inputDate = document.querySelector(`#date`);
    inputDate.style.border = `2px solid #f70c47`;
    let cartelError = document.querySelector(`#mostrar-errores`);
    cartelError.className = `form-row__errores`;
};
