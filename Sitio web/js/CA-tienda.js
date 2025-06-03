var token = sessionStorage.getItem("tokenSesion")
console.log(token)
const FondoMensajeMonedas = document.querySelector(".fondo_mensaje_monedas")
function Cerrar_mensaje_Monedas() {
    FondoMensajeMonedas.style.display = 'none'
}
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
            ImagenDelUsuario.src = /*`data:image/png;base64,${*/respuesta.cuenta.foto_perfil/*}`*/;
            const TuDineroActualActualizar = document.querySelector(".tu_dinero_actual_actualizar")
            TuDineroActualActualizar.innerHTML = respuesta.cuenta.monedas

            const TuDineroActualActualizarTienda = document.querySelector(".Tu-dinero-actual-actualizar")
            TuDineroActualActualizarTienda.innerHTML = respuesta.cuenta.monedas

            const ComprarSobreEnAscenso = document.querySelectorAll(".ComprarSobreEnAscenso")

            //EN ASCENSO
            ComprarSobreEnAscenso.forEach(boton => {
                boton.addEventListener("click", function (evento) {
                    evento.preventDefault(); //para que la etiqueta a no se ejecute, porque me da flojera cmabiar la etiqeuta a
                    if (respuesta.cuenta.monedas >= 10) { 
                        // Quitar dinero
                        fetch("http://localhost:3000/restar_dinero", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ cantidad_a_restar: 10, cuenta: respuesta.cuenta.id })
                        })
                            .then(res => res.json())
                            .then(semeacabaronlosnombres_monedas => {
                                if (semeacabaronlosnombres_monedas.mensaje) {
                                    console.log(semeacabaronlosnombres_monedas.mensaje)
                                    console.log("Dinero actual " + semeacabaronlosnombres_monedas.dinero_actualizado)
                                    TuDineroActualActualizar.innerHTML = semeacabaronlosnombres_monedas.dinero_actualizado
                                    TuDineroActualActualizarTienda.innerHTML = semeacabaronlosnombres_monedas.dinero_actualizado
                                }
                                fetch("http://localhost:3000/acceso_compra", {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": token
                                    },
                                    body: JSON.stringify({
                                        "confirmacion_compra": 1
                                    })
                                }).then(recurso => {
                                    if (recurso.status == 200) {
                                        console.log("SIUUUUUUUUUUUUU")
                                        recurso.json().then(data => {
                                            console.log(data.mensaje);///////////
                                            window.location.href="abrir-sobre-ascenso.html"
                                        })
                                    }else{
                                        recurso.json().then(data =>{
                                            console.log(data.mensaje)
                                            console.log("la regamos")
                                        })
                                    }
                                }) 
                            }).catch(error => {
                                console.error("Error en la transaccion:", error);
                            });
                    } else {
                        FondoMensajeMonedas.style.display = 'flex'
                    }
                });
            });
            //BASICOOOOOOOOOOO 
            const ComprarSobreBasico = document.querySelectorAll(".ComprarSobreBasico")

            ComprarSobreBasico.forEach(boton => {
                boton.addEventListener("click", function (evento) {
                    evento.preventDefault(); //para que la etiqueta a no se ejecute, porque me da flojera cmabiar la etiqeuta a
                    if (respuesta.cuenta.monedas >= 15) { 
                        // Quitar dinero
                        fetch("http://localhost:3000/restar_dinero", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ cantidad_a_restar: 15, cuenta: respuesta.cuenta.id })
                        })
                            .then(res => res.json())
                            .then(semeacabaronlosnombres_monedas => {
                                if (semeacabaronlosnombres_monedas.mensaje) {
                                    console.log(semeacabaronlosnombres_monedas.mensaje)
                                    console.log("Dinero actual " + semeacabaronlosnombres_monedas.dinero_actualizado)
                                    TuDineroActualActualizar.innerHTML = semeacabaronlosnombres_monedas.dinero_actualizado
                                    TuDineroActualActualizarTienda.innerHTML = semeacabaronlosnombres_monedas.dinero_actualizado
                                }
                                fetch("http://localhost:3000/acceso_compra", {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": token
                                    },
                                    body: JSON.stringify({
                                        "confirmacion_compra": 1
                                    })
                                }).then(recurso => {
                                    if (recurso.status == 200) {
                                        console.log("SIUUUUUUUUUUUUU")
                                        recurso.json().then(data => {
                                            console.log(data.mensaje);///////////
                                            window.location.href="abrir-sobre-basico.html"
                                        })
                                    }else{
                                        recurso.json().then(data =>{
                                            console.log(data.mensaje)
                                            console.log("la regamos")
                                        })
                                    }
                                }) 
                            }).catch(error => {
                                console.error("Error en la transaccion:", error);
                            });
                    } else {
                        FondoMensajeMonedas.style.display = 'flex'
                    }
                });
            });
            //SUPERESTRELLAAAAAAAA
            const ComprarSobreSuperestrella = document.querySelectorAll(".ComprarSobreSuperestrella")

            ComprarSobreSuperestrella.forEach(boton => {
                boton.addEventListener("click", function (evento) {
                    evento.preventDefault(); //para que la etiqueta a no se ejecute, porque me da flojera cmabiar la etiqeuta a
                    if (respuesta.cuenta.monedas >= 35) { 
                        // Quitar dinero
                        fetch("http://localhost:3000/restar_dinero", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ cantidad_a_restar: 35, cuenta: respuesta.cuenta.id })
                        })
                            .then(res => res.json())
                            .then(semeacabaronlosnombres_monedas => {
                                if (semeacabaronlosnombres_monedas.mensaje) {
                                    console.log(semeacabaronlosnombres_monedas.mensaje)
                                    console.log("Dinero actual " + semeacabaronlosnombres_monedas.dinero_actualizado)
                                    TuDineroActualActualizar.innerHTML = semeacabaronlosnombres_monedas.dinero_actualizado
                                    TuDineroActualActualizarTienda.innerHTML = semeacabaronlosnombres_monedas.dinero_actualizado
                                }
                                fetch("http://localhost:3000/acceso_compra", {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": token
                                    },
                                    body: JSON.stringify({
                                        "confirmacion_compra": 1
                                    })
                                }).then(recurso => {
                                    if (recurso.status == 200) {
                                        console.log("SIUUUUUUUUUUUUU")
                                        recurso.json().then(data => {
                                            console.log(data.mensaje);///////////
                                            window.location.href="abrir-sobre-superestrella.html"
                                        })
                                    }else{
                                        recurso.json().then(data =>{
                                            console.log(data.mensaje)
                                            console.log("la regamos")
                                        })
                                    }
                                }) 
                            }).catch(error => {
                                console.error("Error en la transaccion:", error);
                            });
                    } else {
                        FondoMensajeMonedas.style.display = 'flex'
                    }
                });
            });
            //LEYENDAAAAAAAA
            const ComprarSobreLeyenda = document.querySelectorAll(".ComprarSobreLeyenda")

            ComprarSobreLeyenda.forEach(boton => {
                boton.addEventListener("click", function () {
                    if (respuesta.cuenta.monedas >= 55) {
                        
                        // Quitar dinero
                        fetch("http://localhost:3000/restar_dinero", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ cantidad_a_restar: 55, cuenta: respuesta.cuenta.id })
                        })
                            .then(res => res.json())
                            .then(semeacabaronlosnombres_monedas => {
                                if (semeacabaronlosnombres_monedas.mensaje) {
                                    console.log(semeacabaronlosnombres_monedas.mensaje)
                                    console.log("Dinero actual " + semeacabaronlosnombres_monedas.dinero_actualizado)
                                    TuDineroActualActualizar.innerHTML = semeacabaronlosnombres_monedas.dinero_actualizado
                                    TuDineroActualActualizarTienda.innerHTML = semeacabaronlosnombres_monedas.dinero_actualizado
                                }
                                fetch("http://localhost:3000/acceso_compra", {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": token
                                    },
                                    body: JSON.stringify({
                                        "confirmacion_compra": 1
                                    })
                                }).then(recurso => {
                                    if (recurso.status == 200) {
                                        console.log("SIUUUUUUUUUUUUU")
                                        recurso.json().then(data => {
                                            console.log(data.mensaje);///////////
                                            window.location.href="abrir-sobre-leyenda.html"
                                        })
                                    }else{
                                        recurso.json().then(data =>{
                                            console.log(data.mensaje)
                                            console.log("la regamos")
                                        })
                                    }
                                }) 
                            }).catch(error => {
                                console.error("Error en la transaccion:", error);
                            });
                    } else {
                        FondoMensajeMonedas.style.display = 'flex'
                    }
                });
            });

        })
    } else {
        console.log("a")
        console.log("womp womp")
    }
})
console.log("fin")