document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => { 


        const sobre = document.querySelector(".sobre");
        const cartas = document.querySelectorAll(".CartaCompleta");
        const salir = document.querySelector(".Salir")
        const clic = document.querySelector(".clic_sobre")
        let cartaActual = 1;

        // Ordenar las cartas con z-index (la última debe tener mayor índice)
        cartas.forEach((carta, index) => {
            carta.style.zIndex = index + 1;
            carta.style.marginLeft = `${index * 100}px`; //para ponerlo al ladito
        });

        // Evento al hacer clic en el sobre
        sobre.addEventListener("click", () => {
            if (cartaActual < cartas.length) {
                const carta = cartas[cartaActual];
                carta.classList.add("mostrar");
                cartaActual++;
                if (cartaActual == cartas.length) {
                    salir.style.opacity = 1;
                }
            }
            if (cartaActual >= cartas.length) {
                clic.style.display = 'none';
            }
        });
    }, 2000);
});