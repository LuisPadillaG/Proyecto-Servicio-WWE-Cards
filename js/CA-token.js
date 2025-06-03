var token=sessionStorage.getItem("tokenSesion")
//alert(token) 
fetch("http://localhost:3000/datos_protegidos",{
    method:"GET",
    headers:{
        "Authorization":token
    }
}).then(recurso=>{
    console.log("inicio")
    if(recurso.status == 200){
        recurso.json().then(respuesta=>{
            //alert(respuesta.mensaje)
            
            /**header */

            console.log(respuesta)
            const NombreDelUsuario = document.querySelector(".nombre_del_usuario");
            NombreDelUsuario.innerHTML = respuesta.cuenta.usuario
            const ImagenDelUsuario = document.querySelector(".imagen_del_usuario")
            ImagenDelUsuario.src = respuesta.cuenta.foto_perfil;
            const TuDineroActualActualizar = document.querySelector(".tu_dinero_actual_actualizar")
            TuDineroActualActualizar.innerHTML = respuesta.cuenta.monedas 
            /**tarjetas de coleccion */
            const plantilla = document.querySelector(".CartaCompletaMasEliminar"); 

            const contenedor = document.querySelector(".ContenedorCartas");

            console.log(respuesta.cuenta.cartas_cuenta.length)
            var idsDeTarjetas = respuesta.cuenta.cartas_cuenta;
            var id_tarjeta_favorita = respuesta.cuenta.carta_favorita
            console.log("La tarjeta favorita del usuario es "+id_tarjeta_favorita)

            fetch("http://localhost:3000/cartas_ordenadas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ids: idsDeTarjetas })
            }).then(res => {
                if (res.status === 200) {
                    res.json().then(tarjetas => {
                        console.log("Tarjetas ordenadas:", tarjetas);
                        
                        const plantilla = document.querySelector(".CartaCompletaMasEliminar");
                        const contenedor = document.querySelector(".ContenedorCartas");
                        
                        contenedor.innerHTML = ""; // Limpia el contenedor
                        
                        tarjetas.forEach(tarjeta => {
                            const clon = plantilla.cloneNode(true);
                            const CartaCompleta = clon.querySelector(".CartaCompleta")
                            clon.style.opacity = "1"
                            contenedor.appendChild(clon);
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
                            NumeroPoderCarta.innerHTML = tarjeta.poder
                            CartaLuchadorFrenteImg.src = tarjeta.imagen

                            if(tarjeta.nombres.primer_nombre != ""){
                                PrimerNombreLuchadorCarta.innerHTML = tarjeta.nombres.primer_nombre
                            }else{
                                PrimerNombreLuchadorCarta.innerHTML= "<br>"
                            }
                            
                            SegundoNombreLuchadorCarta.innerHTML = tarjeta.nombres.segundo_nombre
                            TextoDescripcionCarta.innerHTML = tarjeta.descripcion
                            if(tarjeta.rango === "en ascenso"){
                                DisenoCarta.style.backgroundImage = `url(/recursos/img/bronce.jpg)`
                                IconoDivisionColor.src = "/recursos/icons/icon-emergente.png"
                                FiltroCarta.style.backgroundColor = "#b67d40d0";
                            }
                            if(tarjeta.rango === "media cartelera"){
                                DisenoCarta.style.backgroundImage = `url(/recursos/img/plata.png)`
                                FiltroCarta.style.backgroundColor = "#ccccccc8"; //Este color es de rango plata
                                IconoDivisionColor.src = "/recursos/icons/icon-midcard.png"
                            }
                            if(tarjeta.rango === "superestrella"){
                                DisenoCarta.style.backgroundImage = `url(/recursos/img/oro.webp)`
                                IconoDivisionColor.src = "/recursos/icons/icon-superstar.png"
                                FiltroCarta.style.backgroundColor = "#c99507d0";
                            }
                            if(tarjeta.rango === "leyenda"){
                                DisenoCarta.style.backgroundImage = `url(/recursos/img/leyenda.avif)`
                                CartaLuchadorFondo.style.opacity = '0.5'
                                FiltroCarta.style.backgroundColor = "#2f1aaa8e"; //Este color es de rango leyenda
                                PoderCarta.style.color= 'white'
                                PrimerNombreLuchadorCarta.style.color = 'white'
                                IconoDivisionColor.src = "/recursos/icons/icon-leyenda.png" 
                            } 
                            const botonVender = clon.querySelector(".BotonVender");
                            const botonFavorito = clon.querySelector(".BotonFavorito")

                            //convertir una card a favorita
                            botonFavorito.addEventListener("click", function(){
                                var carta_favorita = {
                                    nueva_card_favorita : tarjeta.id,
                                    cuenta: respuesta.cuenta.id
                                }
                                fetch("http://localhost:3000/cambiar_carta_favorita", {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(carta_favorita)
                                }).then(respuesta => respuesta.json()) 
                                .then(favorite => {
                                    console.log(favorite.mensaje)
                                    //console.log(favorite.carta_actualizada_favorita)
                                    //aqui se hace la animacion
                                    CartaCompleta.classList.remove("rotate-vertical-center");
                                    void CartaCompleta.offsetWidth; 
                                    CartaCompleta.classList.add("rotate-vertical-center");
                                    id_tarjeta_favorita = favorite.carta_actualizada_favorita
                                    console.log(id_tarjeta_favorita)
                                })
                            })
                            let cartaAEliminar = null;
                            
                            //vender
                            const ValorDineroCarta = document.querySelector(".ValorDineroCarta")
                            botonVender.addEventListener("click", function () {
                                cartaAEliminar = this.parentElement; 
                                document.getElementById("ConfirmacionModal").style.display = "flex";
                                ValorDineroCarta.innerHTML = tarjeta.precio
                            });
                            document.getElementById('btnNo').addEventListener('click', function () {
                                cartaAEliminar = null;
                                document.getElementById('ConfirmacionModal').style.display = 'none';
                            });
                            document.getElementById('btnSi').addEventListener('click', function () {
                                const totalCartasUsuario = document.querySelectorAll(".CartaCompletaMasEliminar").length;
                                
                                if (totalCartasUsuario === 1) {
                                    alert("No puedes vender tu única carta.");
                                    document.getElementById('ConfirmacionModal').style.display = 'none';
                                    return;
                                }
                                    if (cartaAEliminar) { 
                                        console.log("NO ME IMPORTO LO QUE QUIERAS, VOY A VENDER LA CARTA CON ID "+tarjeta.id+" Y ESO QUE TU CARTA FAVORTA TIENE EL ID DE "+respuesta.cuenta.carta_favorita)
                                        const cartaContenedor = cartaAEliminar.closest(".CartaCompletaMasEliminar");
                                        if (cartaContenedor) {
                                            console.log(tarjeta.id)
                                            console.log(respuesta.cuenta.id)
                                            cartaContenedor.classList.remove("blur-out"); // Reinicia si ya la tenía
                                            void cartaContenedor.offsetWidth; // Fuerza reflow
                                            cartaContenedor.classList.add("blur-out");
                                            cartaContenedor.addEventListener("animationend", function handler() {
                                                cartaContenedor.remove(); // Ahora sí, se elimina
                                            });
                                            const infoCartaAEliminar = {
                                                idTarjeta: tarjeta.id,
                                                cuenta: respuesta.cuenta.id
                                            };
                                            console.log(infoCartaAEliminar)
                                            fetch("http://localhost:3000/borrar_carta_de_la_cuenta", {
                                                method: "DELETE",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify(infoCartaAEliminar)
                                            }).then(respuesta => respuesta.json()) 
                                            .then(data => {
                                                if (data.mensaje) {
                                                    console.log(data.mensaje);
                                                    console.log(data.idTarjetaEliminada)
                                                }
                                                if(data.idTarjetaEliminada == id_tarjeta_favorita){
                                                    console.log("El usuario borro su carta favorita, se le asignara la de mayor nivel de forma predeterminada")
                                                    // Asegúrate de eliminar el ID de la carta que ya se borró
                                                    idsDeTarjetas = idsDeTarjetas.filter(id => id !== data.idTarjetaEliminada);

                                                    fetch("http://localhost:3000/cartas_ordenadas", {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        },
                                                        body: JSON.stringify({ ids: idsDeTarjetas })
                                                    }).then(respuesta => respuesta.json()).then(actualizar_informe_de_cartas_del_usuario => {
                                                        var carta_favorita = {
                                                            nueva_card_favorita : actualizar_informe_de_cartas_del_usuario[0].id,
                                                            cuenta: respuesta.cuenta.id
                                                        }
                                                        fetch("http://localhost:3000/cambiar_carta_favorita", {
                                                            method: "PUT",
                                                            headers: {
                                                                "Content-Type": "application/json"
                                                            },
                                                            body: JSON.stringify(carta_favorita)
                                                        }).then(respuesta => respuesta.json()) 
                                                        .then(favorite => {
                                                            console.log(favorite.mensaje)
                                                            //console.log(favorite.carta_actualizada_favorita)
                                                            //aqui se hace la animacion
                                                            CartaCompleta.classList.remove("rotate-vertical-center");
                                                            void CartaCompleta.offsetWidth; 
                                                            CartaCompleta.classList.add("rotate-vertical-center");
                                                            id_tarjeta_favorita = favorite.carta_actualizada_favorita 
    
                                                            console.log("La nueva tarjeta favorita del usuario de forma predeterminada ahora es "+id_tarjeta_favorita)
                                                        })
                                                    })
                                                }
                                                console.log("El dinero de la tarjeta a vender es de "+tarjeta.precio)
                                                fetch("http://localhost:3000/aumentar_dinero", {
                                                    method: "PUT",
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify({cantidad_a_aumentar: tarjeta.precio, cuenta: respuesta.cuenta.id})
                                                })
                                                .then(res => res.json())
                                                .then(semeacabaronlosnombres_monedas =>{
                                                    if(semeacabaronlosnombres_monedas.mensaje){
                                                        console.log(semeacabaronlosnombres_monedas.mensaje)
                                                        console.log("Dinero actual "+ semeacabaronlosnombres_monedas.dinero_actualizado)
                                                        TuDineroActualActualizar.innerHTML = semeacabaronlosnombres_monedas.dinero_actualizado
                                                    }
                                                }).catch(error => {
                                                    console.error("Error en la transaccion:", error);
                                                });
                                            })
                                            .catch(error => {
                                                console.error("Error en la solicitud:", error);
                                            });
                                        }
                                        cartaAEliminar = null;
                                        document.getElementById('ConfirmacionModal').style.display = 'none';
                                    }
                            });
                        });
                          
                    });
                } else {
                    console.error("No se pudieron obtener las tarjetas");
                }
            });

        })
    }else{
        console.log("a")
        console.log("womp womp")
    }
})
console.log("fin")

