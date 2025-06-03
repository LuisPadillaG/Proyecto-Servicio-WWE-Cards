


//okey este es el plan
//Se presiona ActivarJuego, si mira que time es igual a 00.00=
//Cuando time llegue a 0, entonces sale automaticamente una pantalla emergente que diga. No ps ya se acabo, le ganaste a este num de cartas.
//Cierras con ok
let idCuenta
const puntajeMaximoValor = document.querySelector(".puntajeMaximoValor")
var puntajeMaximoValorNumero = 0
var token = sessionStorage.getItem("tokenSesion")
var cartaFavorita
//alert(token) 
fetch("http://localhost:3000/datos_protegidos", {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(recurso => {
    console.log("inicio")
    if (recurso.status == 200) {
        recurso.json().then(respuesta => {
            //alert(respuesta.mensaje)

            /**header */

            console.log(respuesta)
            const NombreDelUsuario = document.querySelector(".nombre_del_usuario");
            NombreDelUsuario.innerHTML = respuesta.cuenta.usuario
            const ImagenDelUsuario = document.querySelector(".imagen_del_usuario")
            ImagenDelUsuario.src = respuesta.cuenta.foto_perfil;
            const TuDineroActualActualizar = document.querySelector(".tu_dinero_actual_actualizar")
            TuDineroActualActualizar.innerHTML = respuesta.cuenta.monedas
            const CartasCompletas = document.querySelector(".CartaCompleta")
            //CartasCompletas.style.opacity = "0"
            idCuenta = respuesta.cuenta.id
            puntajeMaximoValor.innerHTML = respuesta.cuenta.puntaje_maximo
            puntajeMaximoValorNumero = respuesta.cuenta.puntaje_maximo
            console.log(respuesta.cuenta.carta_favorita)
            fetch("http://localhost:3000/" + respuesta.cuenta.carta_favorita).then(recurso => recurso.json()).then(tarjeta => {
                const CartaCompleta = document.querySelector(".MiCarta")
                CartaCompleta.style.opacity = "1"
                const CartaLuchadorFondo = document.querySelector(".CartaLuchadorFondo")
                const FiltroCarta = document.querySelector("#FiltroCarta")
                const NumeroPoderCarta = document.querySelector("#NumeroPoderCarta")
                const DisenoCarta = document.querySelector("#DisenoCarta")
                const IconoDivisionColor = document.querySelector("#IconoDivisionColor")
                const CartaLuchadorFrenteImg = document.querySelector("#CartaLuchadorFrenteImg")
                const TextoDescripcionCarta = document.querySelector("#TextoDescripcionCarta")
                const PrimerNombreLuchadorCarta = document.querySelector("#PrimerNombreLuchadorCarta")
                const SegundoNombreLuchadorCarta = document.querySelector("#SegundoNombreLuchadorCarta")
                const PoderCarta = document.querySelector("#PoderCarta")

                CartaLuchadorFondo.style.backgroundImage = `url('${tarjeta.imagen}')`
                NumeroPoderCarta.innerHTML = tarjeta.poder
                CartaLuchadorFrenteImg.src = tarjeta.imagen

                if (tarjeta.nombres.primer_nombre != "") {
                    PrimerNombreLuchadorCarta.innerHTML = tarjeta.nombres.primer_nombre
                } else {
                    PrimerNombreLuchadorCarta.innerHTML = "<br>"
                }
                SegundoNombreLuchadorCarta.innerHTML = tarjeta.nombres.segundo_nombre
                TextoDescripcionCarta.innerHTML = tarjeta.descripcion
                if (tarjeta.rango === "en ascenso") {
                    DisenoCarta.style.backgroundImage = `url(/recursos/img/bronce.jpg)`
                    IconoDivisionColor.src = "/recursos/icons/icon-emergente.png"
                    FiltroCarta.style.backgroundColor = "#b67d40d0";
                    puntosdeataque = 5
                }
                if (tarjeta.rango === "media cartelera") {
                    DisenoCarta.style.backgroundImage = `url(/recursos/img/plata.png)`
                    FiltroCarta.style.backgroundColor = "#ccccccc8"; //Este color es de rango plata
                    IconoDivisionColor.src = "/recursos/icons/icon-midcard.png"
                    puntosdeataque = 10
                }
                if (tarjeta.rango === "superestrella") {
                    DisenoCarta.style.backgroundImage = `url(/recursos/img/oro.webp)`
                    IconoDivisionColor.src = "/recursos/icons/icon-superstar.png"
                    FiltroCarta.style.backgroundColor = "#c99507d0";
                    puntosdeataque = 15
                }
                if (tarjeta.rango === "leyenda") {
                    DisenoCarta.style.backgroundImage = `url(/recursos/img/leyenda.avif)`
                    CartaLuchadorFondo.style.opacity = '0.5'
                    FiltroCarta.style.backgroundColor = "#2f1aaa8e"; //Este color es de rango leyenda
                    PoderCarta.style.color = 'white'
                    PrimerNombreLuchadorCarta.style.color = 'white'
                    IconoDivisionColor.src = "/recursos/icons/icon-leyenda.png"
                    puntosdeataque = 20
                }

            })

        })
    }
})







const MiCarta = document.querySelector('.MiCarta')
const Atacar = document.querySelector(".atacar")
const Start = document.querySelector(".empezar_partida")
const puntajes_generales = document.querySelector(".puntajes_generales")
const puradescripcion = document.querySelector(".puradescripcion")

const TuPuntajeFinal = document.querySelector(".TuPuntajeFinal")
function ActivarJuego() {
    const cronometro = document.querySelector('.cronometro');
    const FelicitacionNuevoRecord = document.querySelector('.FelicitacionNuevoRecord')
    //if(puntaje > puntajeMaximoValorNumero)
    Atacar.style.display = 'flex';
    Start.style.display = 'none';
    puntajes_generales.style.display = 'flex'
    puradescripcion.style.display = 'none'
    void MiCarta.offsetWidth;
    MiCarta.classList.add('CartaCombateAnimation');
    let tiempo = 20.00;
    const TuPuntajeFinalPuntos = document.querySelector(".TuPuntajeFinalPuntos")
    const TuPuntajeFinalMonedas = document.querySelector(".TuPuntajeFinalMonedas")
    const TuPuntajeFinalNumeroContrincantes = document.querySelector(".TuPuntajeFinalNumeroContrincantes")
    const timer = setInterval(() => {
        tiempo -= 0.01;
        if (tiempo <= 0) {
            clearInterval(timer);
            cronometro.textContent = '0.00';
            //alert("Se acabó el tiempo");
            if (puntaje > puntajeMaximoValorNumero) {
                FelicitacionNuevoRecord.style.opacity = '1'
                /**const datos = {
            nombre: nombre,
            contrasena: contrasena
        };
        console.log(datos)
        fetch("http://localhost:3000/iniciar_sesion",{
            method:"POST",
            body:JSON.stringify(datos)
        }).then(respuesta=> {
           if(respuesta.status == 200){
                respuesta.json().then(acceso=>{
                    sessionStorage.setItem("tokenSesion", acceso.token_acceso)
                    console.log(acceso.mensaje)
                    console.log(acceso.token_acceso)
                    window.location.href="coleccion.html"
                })
           }else{
            respuesta.json().then(fallo=>{
                alert(fallo.mensaje)
                console.log(fallo.mensaje)
            })
           }
        }) */
                const datos = {
                    puntaje_maximo: puntaje,
                    idCuenta: idCuenta
                }
                fetch("http://localhost:3000/cambiar_puntaje_maximo", {
                    method: "PUT",
                    body: JSON.stringify(datos)
                })
            }

            TuPuntajeFinalPuntos.innerHTML = puntaje
            TuPuntajeFinalMonedas.innerHTML = monedas_a_recibir
            TuPuntajeFinal.style.display = 'flex';
            MiCarta.classList.remove('CartaCombateAnimation');
            // Volver a mostrar el botón START y ocultar ATACAR
            Atacar.style.display = 'none';
            TuPuntajeFinalNumeroContrincantes.innerHTML = numerodevictorias
            Start.style.display = 'flex';
            puntajes_generales.style.display = 'none';
            puradescripcion.style.display = 'flex';
            
            // Restaurar barra de vida
            vidaActual = 100;
            barraVida.style.height = '100%';
            barraVida.style.backgroundColor = 'green';
            fetch("http://localhost:3000/aumentar_dinero", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ cantidad_a_aumentar: monedas_a_recibir, cuenta: idCuenta })
            })
                .then(res => res.json())
                .then(semeacabaronlosnombres_monedas => {
                    if (semeacabaronlosnombres_monedas.mensaje) {
                        console.log(semeacabaronlosnombres_monedas.mensaje)
                        console.log("Dinero actual " + semeacabaronlosnombres_monedas.dinero_actualizado)
                    }
                }).catch(error => {
                    console.error("Error en la transaccion:", error);
                });
        } else {
            cronometro.textContent = tiempo.toFixed(2);
        }
    }, 10);
}
var monedas_a_recibir = 0
let puntaje = 0;
let vidaActual = 100; // porcentaje (0 a 100)
let tarjetaRivales = [];

fetch("http://localhost:3000/rivales_vs")
    .then(recurso => recurso.json())
    .then(tarjeta => {
        tarjetaRivales = tarjeta;
        console.log(tarjeta)
        console.log(tarjetaRivales)
        console.log("Hola")
        CambioDeCarta(0);
    });

function CambioDeCarta(numerodeluchador) {
    const tarjeta = tarjetaRivales;
    const CartaCompleta = document.querySelector(".CartaRival")
    CartaCompleta.style.opacity = "1"
    const CartaLuchadorFondo = document.querySelector("#CartaLuchadorFondoRival")
    const FiltroCarta = document.querySelector("#FiltroCartaRival")
    const NumeroPoderCarta = document.querySelector("#NumeroPoderCartaRival")
    const DisenoCarta = document.querySelector("#DisenoCartaRival")
    const IconoDivisionColor = document.querySelector("#IconoDivisionColorRival")
    const CartaLuchadorFrenteImg = document.querySelector("#CartaLuchadorFrenteImgRival")
    const TextoDescripcionCarta = document.querySelector("#TextoDescripcionCartaRival")
    const PrimerNombreLuchadorCarta = document.querySelector("#PrimerNombreLuchadorCartaRival")
    const SegundoNombreLuchadorCarta = document.querySelector("#SegundoNombreLuchadorCartaRival")
    const PoderCarta = document.querySelector("#PoderCartaRival")

    if (!tarjeta[numerodeluchador]) return; // Evitar errores si no hay más tarjetas

    CartaLuchadorFondo.style.backgroundImage = `url('${tarjeta[numerodeluchador].imagen}')`
    NumeroPoderCarta.innerHTML = tarjeta[numerodeluchador].poder
    CartaLuchadorFrenteImg.src = tarjeta[numerodeluchador].imagen

    if (tarjeta[numerodeluchador].nombres.primer_nombre != "") {
        PrimerNombreLuchadorCarta.innerHTML = tarjeta[numerodeluchador].nombres.primer_nombre
    } else {
        PrimerNombreLuchadorCarta.innerHTML = "<br>"
    }
    SegundoNombreLuchadorCarta.innerHTML = tarjeta[numerodeluchador].nombres.segundo_nombre
    TextoDescripcionCarta.innerHTML = tarjeta[numerodeluchador].descripcion
    if (tarjeta[numerodeluchador].rango === "en ascenso") {
        DisenoCarta.style.backgroundImage = `url(/recursos/img/bronce.jpg)`
        IconoDivisionColor.src = "/recursos/icons/icon-emergente.png"
        FiltroCarta.style.backgroundColor = "#b67d40d0";
        PoderCarta.style.color = 'black'
        PrimerNombreLuchadorCarta.style.color = 'black'
    }
    if (tarjeta[numerodeluchador].rango === "media cartelera") {
        DisenoCarta.style.backgroundImage = `url(/recursos/img/plata.png)`
        FiltroCarta.style.backgroundColor = "#ccccccc8";
        IconoDivisionColor.src = "/recursos/icons/icon-midcard.png"
        PoderCarta.style.color = 'black'
        PrimerNombreLuchadorCarta.style.color = 'black'
    }
    if (tarjeta[numerodeluchador].rango === "superestrella") {
        DisenoCarta.style.backgroundImage = `url(/recursos/img/oro.webp)`
        IconoDivisionColor.src = "/recursos/icons/icon-superstar.png"
        FiltroCarta.style.backgroundColor = "#c99507d0";
        PoderCarta.style.color = 'black'
        PrimerNombreLuchadorCarta.style.color = 'black'
    }
    if (tarjeta[numerodeluchador].rango === "leyenda") {
        DisenoCarta.style.backgroundImage = `url(/recursos/img/leyenda.avif)`
        CartaLuchadorFondo.style.opacity = '0.5'
        FiltroCarta.style.backgroundColor = "#2f1aaa8e"; //Este color es de rango leyenda
        PoderCarta.style.color = 'white'
        PrimerNombreLuchadorCarta.style.color = 'white'
        IconoDivisionColor.src = "/recursos/icons/icon-leyenda.png"
    }
}

const puntajeElemento = document.querySelector('.puntajeActualValor');
const barraVida = document.getElementById('barraVida');
var cartadeturno = 0
let giroDerecha = true;

var numerodevictorias = 0;
var puntosdeataque = 10

//Casi todo lo de calculos en lo de ActividadPuntaje lo hice con machin ayuda, voy a dejar mas notas aqui que en toda mi vida
function ActividadPuntaje() {

    //Aumentar puntaje
    puntaje += puntosdeataque;
    console.log(puntaje)
    puntajeElemento.innerHTML = puntaje;
    if (puntaje > puntajeMaximoValorNumero) {
        puntajeMaximoValor.innerHTML = puntaje
        console.log("aumento aumento aumentooooooo")
    }
    let daño;
    if (puntaje % 300 === 0) {
        daño = 100;
    } else {
        daño = (100 * (puntaje % 300) / 300);
    }//OKEY, yo quiero que cada 300 se muera una carta, no importa que cosa. Mientras no llegue a 300, va calculando el daño proporcional al % de avance dentro de ese rango de 300 puntos
    vidaActual = 100 - daño;
    if (vidaActual <= 0) {
        vidaActual = 100; //reiniciamos la vida al ganarle a uno
        cartadeturno += 1;
        monedas_a_recibir += 5;
        numerodevictorias += 1
        if (cartadeturno > 5) {
            cartadeturno = 0
        }
        console.log(cartadeturno)
        CambioDeCarta(cartadeturno)
        //Cambiodetarjeta

    }
    barraVida.style.height = `${vidaActual}%`;
    //si tiene mas de 60% verde, si tiene mas de 30% naranja, ya sino rojjo
    if (vidaActual > 60) {
        barraVida.style.backgroundColor = 'green';
    } else if (vidaActual > 30) {
        barraVida.style.backgroundColor = 'orange';
    } else {
        barraVida.style.backgroundColor = 'red';
    }
    //Animación pa los numeros
    const dañoElemento = document.createElement('h5');
    dañoElemento.classList.add('dano');
    dañoElemento.innerHTML = '+' + puntosdeataque;
    document.body.appendChild(dañoElemento);
    setTimeout(() => dañoElemento.remove(), 1000); //la quitamos en 1 segundo pa q se haga bien el show


    //Girar la cartita del rival
    const carta = document.querySelector('.CartaRival');

    carta.classList.remove('giroDerecha', 'giroIzquierda');

    //Agregar la clase correcta
    if (giroDerecha) {
        carta.classList.add('giroDerecha');
    } else {
        carta.classList.add('giroIzquierda');
    }

    //Cambiar dirección para el siguiente
    giroDerecha = !giroDerecha;
}

