const plantilla = document.querySelector(".CartaCompleta")
const contenedordecartas = document.querySelector(".contenedor-cartas")
const AlertaCompras = document.querySelector(".AlertaCompras")
var token = sessionStorage.getItem("tokenSesion")


const cartasEntregadas = []


fetch("http://localhost:3000/datos_protegidos", {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(recurso => {
    console.log("inicio")
    if (recurso.status == 200) {
        recurso.json().then(respuesta => {
            console.log(respuesta)
            if (respuesta.cuenta.realizando_compra == 1) {
                console.log("yupi")
                fetch("http://localhost:3000/media_cartelera").then(recurso => recurso.json()).then(rango => {
                    console.log(rango)
                    for (i = 0; i < 1; i++) {
                        //codigo para duplicar tarjetas
                        const ids = rango.map(t => t.id)

                        // Para saber el id más bajo y el más alto que tiene la seccion en ascenso
                        //como mis cartas las organice de forma alfabetica, pero basandome en los rangos, funciona
                        //anoto esto porque se que se me va a olvidar, y por si me preguntan despues
                        const idMinimo = Math.min(...ids)
                        const idMaximo = Math.max(...ids) // aqui para desempaquetar es por los 3 puntos.
                        const idCartaAleatoria = Math.floor(Math.random() * (idMaximo - idMinimo + 1)) + idMinimo;
                        console.log(idCartaAleatoria)
                        console.log("la carta con id mas baja es:", idMinimo)
                        console.log("la carta con id mas alto es:", idMaximo)

                        fetch("http://localhost:3000/" + idCartaAleatoria).then(recurso => recurso.json()).then(tarjeta => {
                            cartasEntregadas.push(tarjeta.id)
                            var clon = plantilla.cloneNode(true)
                            clon.style.display = "flex"
                            contenedordecartas.appendChild(clon)
                            const CartaLuchadorFondo = clon.querySelector(".CartaLuchadorFondo")
                            const FiltroCarta = clon.querySelector(".FiltroCarta")
                            const NumeroPoderCarta = clon.querySelector(".NumeroPoderCarta")
                            const DisenoCarta = clon.querySelector(".DisenoCarta")
                            const IconoDivisionColor = clon.querySelector(".IconoDivisionColor")
                            const CartaLuchadorFrenteImg = clon.querySelector(".CartaLuchadorFrenteImg")
                            const TextoDescripcionCarta = clon.querySelector(".TextoDescripcionCarta")
                            const PrimerNombreLuchadorCarta = clon.querySelector(".PrimerNombreLuchadorCarta")
                            const SegundoNombreLuchadorCarta = clon.querySelector(".SegundoNombreLuchadorCarta")

                            CartaLuchadorFondo.style.backgroundImage = `url('${tarjeta.imagen}')`
                            DisenoCarta.style.backgroundImage = `url(/recursos/img/plata.png)`
                            FiltroCarta.style.backgroundColor = "#ccccccc8"; //Este color es de rango oro
                            NumeroPoderCarta.innerHTML = tarjeta.poder
                            IconoDivisionColor.src = "/recursos/icons/icon-midcard.png" //Esta imagen es de rango oro
                            CartaLuchadorFrenteImg.src = tarjeta.imagen
                            if (tarjeta.nombres.primer_nombre != "") {
                                PrimerNombreLuchadorCarta.innerHTML = tarjeta.nombres.primer_nombre
                            } else {
                                PrimerNombreLuchadorCarta.innerHTML = "<br>"
                            }

                            SegundoNombreLuchadorCarta.innerHTML = tarjeta.nombres.segundo_nombre
                            TextoDescripcionCarta.innerHTML = tarjeta.descripcion

                        })


                    }
                })
                fetch("http://localhost:3000/superestrella").then(recurso => recurso.json()).then(rango => {
                    console.log(rango)
                    for (i = 0; i < 1; i++) { //realmente ni necesita el for, lo dejé por pura flojera
                        //codigo para duplicar tarjetas
                        const ids = rango.map(t => t.id)

                        // Para saber el id más bajo y el más alto que tiene la seccion en ascenso
                        //como mis cartas las organice de forma alfabetica, pero basandome en los rangos, funciona
                        //anoto esto porque se que se me va a olvidar, y por si me preguntan despues
                        const idMinimo = Math.min(...ids)
                        const idMaximo = Math.max(...ids) // aqui para desempaquetar es por los 3 puntos.
                        const idCartaAleatoria = Math.floor(Math.random() * (idMaximo - idMinimo + 1)) + idMinimo;
                        console.log(idCartaAleatoria)
                        console.log("la carta con id mas baja es:", idMinimo)
                        console.log("la carta con id mas alto es:", idMaximo)

                        fetch("http://localhost:3000/" + idCartaAleatoria).then(recurso => recurso.json()).then(tarjeta => {
                            cartasEntregadas.push(tarjeta.id)
                            var clon = plantilla.cloneNode(true)
                            clon.style.display = "flex"
                            contenedordecartas.appendChild(clon)
                            const CartaLuchadorFondo = clon.querySelector(".CartaLuchadorFondo")
                            const FiltroCarta = clon.querySelector(".FiltroCarta")
                            const NumeroPoderCarta = clon.querySelector(".NumeroPoderCarta")
                            const DisenoCarta = clon.querySelector(".DisenoCarta")
                            const IconoDivisionColor = clon.querySelector(".IconoDivisionColor")
                            const CartaLuchadorFrenteImg = clon.querySelector(".CartaLuchadorFrenteImg")
                            const TextoDescripcionCarta = clon.querySelector(".TextoDescripcionCarta")
                            const PrimerNombreLuchadorCarta = clon.querySelector(".PrimerNombreLuchadorCarta")
                            const SegundoNombreLuchadorCarta = clon.querySelector(".SegundoNombreLuchadorCarta")

                            CartaLuchadorFondo.style.backgroundImage = `url('${tarjeta.imagen}')`
                            DisenoCarta.style.backgroundImage = `url(/recursos/img/oro.webp)`
                            FiltroCarta.style.backgroundColor = "#c99507d0"; //Este color es de rango midcard
                            NumeroPoderCarta.innerHTML = tarjeta.poder
                            IconoDivisionColor.src = "/recursos/icons/icon-superstar.png" //Esta imagen es de rango midcard
                            CartaLuchadorFrenteImg.src = tarjeta.imagen
                            if (tarjeta.nombres.primer_nombre != "") {
                                PrimerNombreLuchadorCarta.innerHTML = tarjeta.nombres.primer_nombre
                            } else {
                                PrimerNombreLuchadorCarta.innerHTML = "<br>"
                            }

                            SegundoNombreLuchadorCarta.innerHTML = tarjeta.nombres.segundo_nombre
                            TextoDescripcionCarta.innerHTML = tarjeta.descripcion

                        })


                    }
                })


                var ProbabilidadLeyendaSuperstar = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
                console.log(ProbabilidadLeyendaSuperstar + " ES LA PROBABILIDAD ES LA PROBABILIDADDDDDDD")
                //ProbabilidadLeyendaSuperstar = 7


                if (ProbabilidadLeyendaSuperstar >= 5) {
                    fetch("http://localhost:3000/leyenda").then(recurso => recurso.json()).then(rango => {
                        console.log(rango)
                        for (i = 0; i < 1; i++) { //realmente ni necesita el for, lo dejé por pura flojera
                            //codigo para duplicar tarjetas
                            const ids = rango.map(t => t.id)

                            // Para saber el id más bajo y el más alto que tiene la seccion en ascenso
                            //como mis cartas las organice de forma alfabetica, pero basandome en los rangos, funciona
                            //anoto esto porque se que se me va a olvidar, y por si me preguntan despues
                            const idMinimo = Math.min(...ids)
                            const idMaximo = Math.max(...ids) // aqui para desempaquetar es por los 3 puntos.
                            const idCartaAleatoria = Math.floor(Math.random() * (idMaximo - idMinimo + 1)) + idMinimo;
                            console.log(idCartaAleatoria)
                            console.log("la carta con id mas baja es:", idMinimo)
                            console.log("la carta con id mas alto es:", idMaximo)

                            fetch("http://localhost:3000/" + idCartaAleatoria).then(recurso => recurso.json()).then(tarjeta => {
                                cartasEntregadas.push(tarjeta.id)
                                var clon = plantilla.cloneNode(true)
                                clon.style.display = "flex"
                                contenedordecartas.appendChild(clon)
                                const CartaLuchadorFondo = clon.querySelector(".CartaLuchadorFondo")
                                const FiltroCarta = clon.querySelector(".FiltroCarta")
                                const NumeroPoderCarta = clon.querySelector(".NumeroPoderCarta")
                                const DisenoCarta = clon.querySelector(".DisenoCarta")
                                const IconoDivisionColor = clon.querySelector(".IconoDivisionColor")
                                const CartaLuchadorFrenteImg = clon.querySelector(".CartaLuchadorFrenteImg")
                                const TextoDescripcionCarta = clon.querySelector(".TextoDescripcionCarta")
                                const PrimerNombreLuchadorCarta = clon.querySelector(".PrimerNombreLuchadorCarta")
                                const SegundoNombreLuchadorCarta = clon.querySelector(".SegundoNombreLuchadorCarta")
                                const PoderCarta = clon.querySelector(".PoderCarta")
                                CartaLuchadorFondo.style.backgroundImage = `url('${tarjeta.imagen}')`
                                CartaLuchadorFondo.style.opacity = '0.5'
                                DisenoCarta.style.backgroundImage = `url(/recursos/img/leyenda.avif)`
                                FiltroCarta.style.backgroundColor = "#2f1aaa8e"; //Este color es de rango leyenda
                                NumeroPoderCarta.innerHTML = tarjeta.poder
                                PoderCarta.style.color = 'white'
                                IconoDivisionColor.src = "/recursos/icons/icon-leyenda.png" //Esta imagen es de rango midcard
                                CartaLuchadorFrenteImg.src = tarjeta.imagen
                                if (tarjeta.nombres.primer_nombre != "") {
                                    PrimerNombreLuchadorCarta.innerHTML = tarjeta.nombres.primer_nombre
                                    PrimerNombreLuchadorCarta.style.color = 'white'
                                } else {
                                    PrimerNombreLuchadorCarta.innerHTML = "<br>"
                                }

                                SegundoNombreLuchadorCarta.innerHTML = tarjeta.nombres.segundo_nombre
                                TextoDescripcionCarta.innerHTML = tarjeta.descripcion

                            })


                        }
                    })
                } else {
                    fetch("http://localhost:3000/superestrella").then(recurso => recurso.json()).then(rango => {
                        console.log(rango)
                        for (i = 0; i < 1; i++) { //realmente ni necesita el for, lo dejé por pura flojera
                            //codigo para duplicar tarjetas
                            const ids = rango.map(t => t.id)

                            // Para saber el id más bajo y el más alto que tiene la seccion en ascenso
                            //como mis cartas las organice de forma alfabetica, pero basandome en los rangos, funciona
                            //anoto esto porque se que se me va a olvidar, y por si me preguntan despues
                            const idMinimo = Math.min(...ids)
                            const idMaximo = Math.max(...ids) // aqui para desempaquetar es por los 3 puntos.
                            const idCartaAleatoria = Math.floor(Math.random() * (idMaximo - idMinimo + 1)) + idMinimo;
                            console.log(idCartaAleatoria)
                            console.log("la carta con id mas baja es:", idMinimo)
                            console.log("la carta con id mas alto es:", idMaximo)

                            fetch("http://localhost:3000/" + idCartaAleatoria).then(recurso => recurso.json()).then(tarjeta => {
                                cartasEntregadas.push(tarjeta.id)
                                var clon = plantilla.cloneNode(true)
                                clon.style.display = "flex"
                                contenedordecartas.appendChild(clon)
                                const CartaLuchadorFondo = clon.querySelector(".CartaLuchadorFondo")
                                const FiltroCarta = clon.querySelector(".FiltroCarta")
                                const NumeroPoderCarta = clon.querySelector(".NumeroPoderCarta")
                                const DisenoCarta = clon.querySelector(".DisenoCarta")
                                const IconoDivisionColor = clon.querySelector(".IconoDivisionColor")
                                const CartaLuchadorFrenteImg = clon.querySelector(".CartaLuchadorFrenteImg")
                                const TextoDescripcionCarta = clon.querySelector(".TextoDescripcionCarta")
                                const PrimerNombreLuchadorCarta = clon.querySelector(".PrimerNombreLuchadorCarta")
                                const SegundoNombreLuchadorCarta = clon.querySelector(".SegundoNombreLuchadorCarta")

                                CartaLuchadorFondo.style.backgroundImage = `url('${tarjeta.imagen}')`
                                DisenoCarta.style.backgroundImage = `url(/recursos/img/oro.webp)`
                                FiltroCarta.style.backgroundColor = "#c99507d0"; //Este color es de rango midcard
                                NumeroPoderCarta.innerHTML = tarjeta.poder
                                IconoDivisionColor.src = "/recursos/icons/icon-superstar.png" //Esta imagen es de rango midcard
                                CartaLuchadorFrenteImg.src = tarjeta.imagen
                                if (tarjeta.nombres.primer_nombre != "") {
                                    PrimerNombreLuchadorCarta.innerHTML = tarjeta.nombres.primer_nombre
                                } else {
                                    PrimerNombreLuchadorCarta.innerHTML = "<br>"
                                }

                                SegundoNombreLuchadorCarta.innerHTML = tarjeta.nombres.segundo_nombre
                                TextoDescripcionCarta.innerHTML = tarjeta.descripcion

                            })


                        }
                    })
                }


                fetch("http://localhost:3000/leyenda").then(recurso => recurso.json()).then(rango => {
                    console.log(rango)
                    for (i = 0; i < 1; i++) { //realmente ni necesita el for, lo dejé por pura flojera
                        //codigo para duplicar tarjetas
                        const ids = rango.map(t => t.id)

                        // Para saber el id más bajo y el más alto que tiene la seccion en ascenso
                        //como mis cartas las organice de forma alfabetica, pero basandome en los rangos, funciona
                        //anoto esto porque se que se me va a olvidar, y por si me preguntan despues
                        const idMinimo = Math.min(...ids)
                        const idMaximo = Math.max(...ids) // aqui para desempaquetar es por los 3 puntos.
                        const idCartaAleatoria = Math.floor(Math.random() * (idMaximo - idMinimo + 1)) + idMinimo;
                        console.log(idCartaAleatoria)
                        console.log("la carta con id mas baja es:", idMinimo)
                        console.log("la carta con id mas alto es:", idMaximo)

                        fetch("http://localhost:3000/" + idCartaAleatoria).then(recurso => recurso.json()).then(tarjeta => {
                            cartasEntregadas.push(tarjeta.id)
                            var clon = plantilla.cloneNode(true)
                            clon.style.display = "flex"
                            contenedordecartas.appendChild(clon)
                            const CartaLuchadorFondo = clon.querySelector(".CartaLuchadorFondo")
                            const FiltroCarta = clon.querySelector(".FiltroCarta")
                            const NumeroPoderCarta = clon.querySelector(".NumeroPoderCarta")
                            const DisenoCarta = clon.querySelector(".DisenoCarta")
                            const IconoDivisionColor = clon.querySelector(".IconoDivisionColor")
                            const CartaLuchadorFrenteImg = clon.querySelector(".CartaLuchadorFrenteImg")
                            const TextoDescripcionCarta = clon.querySelector(".TextoDescripcionCarta")
                            const PrimerNombreLuchadorCarta = clon.querySelector(".PrimerNombreLuchadorCarta")
                            const SegundoNombreLuchadorCarta = clon.querySelector(".SegundoNombreLuchadorCarta")
                            const PoderCarta = clon.querySelector(".PoderCarta")
                            CartaLuchadorFondo.style.backgroundImage = `url('${tarjeta.imagen}')`
                            CartaLuchadorFondo.style.opacity = '0.5'
                            DisenoCarta.style.backgroundImage = `url(/recursos/img/leyenda.avif)`
                            FiltroCarta.style.backgroundColor = "#2f1aaa8e"; //Este color es de rango leyenda
                            NumeroPoderCarta.innerHTML = tarjeta.poder
                            PoderCarta.style.color = 'white'
                            IconoDivisionColor.src = "/recursos/icons/icon-leyenda.png" //Esta imagen es de rango midcard
                            CartaLuchadorFrenteImg.src = tarjeta.imagen
                            if (tarjeta.nombres.primer_nombre != "") {
                                PrimerNombreLuchadorCarta.innerHTML = tarjeta.nombres.primer_nombre
                                PrimerNombreLuchadorCarta.style.color = 'white'
                            } else {
                                PrimerNombreLuchadorCarta.innerHTML = "<br>"
                            }

                            SegundoNombreLuchadorCarta.innerHTML = tarjeta.nombres.segundo_nombre
                            TextoDescripcionCarta.innerHTML = tarjeta.descripcion
                        })
                    }
                })
                setTimeout(() => {
                    console.log(" IDS de cartas entregadas:", cartasEntregadas);

                    fetch("http://localhost:3000/meter_carta_a_cuenta", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        },
                        body: JSON.stringify({
                            idTarjetas: cartasEntregadas
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            console.log("MENSAJE "+data.mensaje)
                            fetch("http://localhost:3000/acceso_compra", {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": token
                                    },
                                    body: JSON.stringify({
                                        "confirmacion_compra": 0
                                    })
                                }).then(recurso => {
                                    if (recurso.status == 200) {
                                        console.log("SIUUUUUUUUUUUUU")
                                        recurso.json().then(data => {
                                            console.log(data.mensaje);///////////
                                        })
                                    }else{
                                        recurso.json().then(data =>{
                                            console.log(data.mensaje)
                                            console.log("la regamos")
                                        })
                                    }
                                })
                        })
                        .catch(err => {
                            console.error("Error, no se enviaron las cartas a la cuenta, se le regresará su dinero:", err);
                            //poner mi fetch de agregar monedas aqui
                        });

                }, 3000);
            } else if (respuesta.cuenta.realizando_compra == 0) {
                console.log("no esta activa la cuenta comprando el sobre, hay que tener cuidado")
                AlertaCompras.style.display = 'flex'
            }
        })
    }
})



/**
    let clones = {}

    for (let i = 0; i < 5; i++) {
        clones["clon" + i] = plantilla.cloneNode(true)
    }

    for (let i = 0; i < 5; i++) {
        contenedordecartas.appendChild(clones["clon" + i])
    }
    //como tendre 5 clones, ps lo hago asi, porque algunos tendran modificaciones diferentes. Si no funciona, ps que loco.
    //La desventaja es que tendré que hacer esto con muchos ciclos for, pero siento que funciona para el caso de mis sobres. */

//Nota para el Luis de mañana. Haz copias de las cards, puede funcionar si hago links para cada rango porque ps se va a necesitar.
//A ver como funciona, tengo sueño; quizas algun filter de la api.