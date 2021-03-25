
let buttton = document.querySelector(`#consultar-tasas`);
buttton.onclick = function (event) {
    resetearResultado();
    let date = document.querySelector(`#date`).value;
    let base = document.querySelector(`#base`).value;
    let resultadoHeaderDate = document.querySelector(`.strong-date`);
    let resultadoHeaderBase = document.querySelector(`.strong-base`);
    let resultadoUl = document.querySelector(`.resultado-ul`)
    
    if (date != ``) {
        fetch(`https://api.exchangeratesapi.io/${date}?base=${base}`)
            .then(respuesta => respuesta.json())
            .then(respuestaJSON => {

                Object.keys(respuestaJSON.rates).forEach(moneda=>{
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

    event.preventDefault();

}
function mostrarResultado(){
    let resultado = document.querySelector(`#resultado`)
    resultado.className = `resultado`;
}

function resetearResultado(){
    let liElements = document.querySelectorAll(`.moneda-li`)
    liElements.forEach(li=>{
        li.remove();
    })
};