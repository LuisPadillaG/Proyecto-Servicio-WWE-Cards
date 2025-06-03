const boton = document.getElementById("perfil-boton");
const desplegable = document.getElementById("desplegable");

document.addEventListener("click", function (e) {
    const dentroDeCuenta = boton.contains(e.target) || desplegable.contains(e.target);

    if (dentroDeCuenta) {
        if (boton.contains(e.target)) {
            desplegable.classList.toggle("visible");
        }
    } else {
        desplegable.classList.remove("visible");
    }
});




const audioElement = document.getElementById('musica-fondo');
const muteBtn = document.getElementById('mute-btn');
const muteIcon = document.getElementById('mute-icon');

var musicaActual = Math.floor(Math.random() * 12);
function reproducirNuevaCancion() {
    // Solo tengo 12 canciones
    fetch("http://localhost:3000/musica/" + musicaActual)
        .then(response => response.json())
        .then(cancion => {
            const TarjetaCancion = document.getElementById("TarjetaCancion");
            const InfoTarjetaCancionTitle = document.querySelector(".InfoTarjetaCancionTitle");
            const InfoTarjetaCancionArtist = document.querySelector(".InfoTarjetaCancionArtist");
            const ImgTarjetaCancion = document.querySelector(".ImgTarjetaCancion");

            console.log("Reproduciendo:", cancion);
            audioElement.src = cancion.enlace_cancion;
            console.log("URL de la canción asignada:", audioElement.src);
            audioElement.play().catch(err => console.warn("Autoplay bloqueado:", err));

            ImgTarjetaCancion.style.backgroundImage = `url('${cancion.portada}')`;
            InfoTarjetaCancionTitle.innerHTML = cancion.nombre;
            InfoTarjetaCancionArtist.innerHTML = cancion.arista_principal;

           
            TarjetaCancion.classList.remove('TarjetaCancionConAnimacion');
            void TarjetaCancion.offsetWidth;
            TarjetaCancion.classList.add('TarjetaCancionConAnimacion');

            
            TarjetaCancion.addEventListener('animationend', function removerClase() {
                TarjetaCancion.classList.remove('TarjetaCancionConAnimacion');
                TarjetaCancion.removeEventListener('animationend', removerClase);
            });
        });
}

// Primera reproducción
reproducirNuevaCancion();

// Escuchar cuando termine y volver a llamar la función
audioElement.addEventListener('ended', () => {
    console.log("Canción terminada, buscando nueva...");
    reproducirNuevaCancion();
});

// Al cargar la página, revisar estado muteado guardado
const estadoMuteGuardado = localStorage.getItem('musicaMuteada') === 'true' ? true : false;
audioElement.muted = estadoMuteGuardado;


function actualizarIconoMute() {
    if (audioElement.muted) {
        muteIcon.src = "/recursos/icons/volume_off_white.png";
        muteIcon.alt = "Unmute";
    } else {
        muteIcon.src = "/recursos/icons/volume_on_white.png";
        muteIcon.alt = "Mute";
    }
}

// Llamar la función al inicio para que refleje correctamente el icono según el estado guardado
actualizarIconoMute();

// Cuando el usuario haga clic en el botón, cambiar el estado
muteBtn.addEventListener('click', () => {
    audioElement.muted = !audioElement.muted;

    // Guardar el nuevo estado en localStorage
    localStorage.setItem('musicaMuteada', audioElement.muted ? 'true' : 'false');

    // Actualizar icono cada vez que cambia el estado
    actualizarIconoMute();
});



    /*let cartaAEliminar = null;

    document.querySelectorAll('.BotonVender').forEach(boton => {
        boton.addEventListener('click', function () {
            cartaAEliminar = this.parentElement; // .CartaCompletaMasEliminar
            document.getElementById('ConfirmacionModal').style.display = 'flex';
        });
    });
    
    document.getElementById('btnSi').addEventListener('click', function () {
        if (cartaAEliminar) {
            cartaAEliminar.remove();
            cartaAEliminar = null;
        }
        document.getElementById('ConfirmacionModal').style.display = 'none';
    });
    
    document.getElementById('btnNo').addEventListener('click', function () {
        cartaAEliminar = null;
        document.getElementById('ConfirmacionModal').style.display = 'none';
    });*/
 
    