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
            ImagenDelUsuario.src = /*`data:image/png;base64,${*/respuesta.cuenta.foto_perfil/*}`*/;
            const TuDineroActualActualizar = document.querySelector(".tu_dinero_actual_actualizar")
            TuDineroActualActualizar.innerHTML = respuesta.cuenta.monedas   

            //ahora en general de la pagina
            const NombreUsuaroProfile = document.querySelector(".nombre_usuario")
            NombreUsuaroProfile.innerHTML = respuesta.cuenta.usuario
            const TuDineroActualActualizarProfile = document.querySelector(".Tu-dinero-actual-actualizar")
            TuDineroActualActualizarProfile.innerHTML = respuesta.cuenta.monedas + "C"
            const TuPuntajeMaximo = document.querySelector(".Tu-puntaje-maximo")
            TuPuntajeMaximo.innerHTML = respuesta.cuenta.puntaje_maximo
            const Preview = document.querySelector("#preview")
            Preview.src = respuesta.cuenta.foto_perfil;
            Preview.style.opacity = '1'
            
            const input_imagen = document.querySelector("#imagenInput")
            input_imagen.addEventListener("change", function(){
                var archivo = input_imagen.files[0]
                const reader = new FileReader()
                reader.readAsDataURL(archivo);
                reader.onload = function(){
                    Preview.src = reader.result
                }
            })

            //cambiar foto de perfil
            const ActualizarImagen = document.querySelector(".ActualizarImagen")
            ActualizarImagen.addEventListener("click", function(){
                var imagen_a_actualizar = {
                    "imagen": Preview.src,
                    "idCuenta": respuesta.cuenta.id
                }
                console.log(imagen_a_actualizar)
                fetch("http://localhost:3000/cambiar_foto_perfil", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(imagen_a_actualizar)
                }).then(rec => rec.json()).then(nueva_foto =>{
                    console.log(nueva_foto.mensaje) 
                    ImagenDelUsuario.src = imagen_a_actualizar.imagen;
                    Preview.classList.remove("animacion-subida");
                    void Preview.offsetWidth; // Forzar el reflow
                    Preview.classList.add("animacion-subida");
                })
                
            })
            console.log(respuesta.cuenta.carta_favorita)
            fetch("http://localhost:3000/"+respuesta.cuenta.carta_favorita).then(recurso => recurso.json()).then(tarjeta => {
                const CartaCompleta = document.querySelector(".CartaCompleta")
                CartaCompleta.style.opacity = "1"
                const CartaLuchadorFondo = document.querySelector(".CartaLuchadorFondo")
                const FiltroCarta = document.querySelector(".FiltroCarta")
                const NumeroPoderCarta = document.querySelector(".NumeroPoderCarta")
                const DisenoCarta = document.querySelector(".DisenoCarta")
                const IconoDivisionColor = document.querySelector(".IconoDivisionColor")
                const CartaLuchadorFrenteImg = document.querySelector(".CartaLuchadorFrenteImg")
                const TextoDescripcionCarta = document.querySelector(".TextoDescripcionCarta")
                const PrimerNombreLuchadorCarta = document.querySelector(".PrimerNombreLuchadorCarta")
                const SegundoNombreLuchadorCarta = document.querySelector(".SegundoNombreLuchadorCarta")
                const PoderCarta = document.querySelector(".PoderCarta")

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
    
            })
            VanillaTilt.init(document.querySelectorAll(".CartaCompleta"), {
                max: 45,             // inclinar
                speed: 300,          // velocidad
                scale: 1.05,         // segun para que se agrande
                glare: true,         // activa un brillo reflejo
                "max-glare": 0.4,    // intensidad del brillo
                startX: -20,
                startY: 20,
                reset: true,
                "reset-to-start": true
            });

        })
    }else{
        console.log("a")
        console.log("womp womp")
    }
})
console.log("fin")
