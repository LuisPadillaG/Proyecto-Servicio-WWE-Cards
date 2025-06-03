var token = sessionStorage.getItem("tokenSesion")
 
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
        })
    }})
const tuto = document.getElementById('tutoFondo')
    const cena = document.getElementById('CenaHablando')

    
const txt_tutorial = document.querySelector(".txt_descripcion")
function MeteteCena(){
    cena.classList.remove('sacarPreview', 'entrarPreview');
    void cena.offsetWidth;
    cena.classList.add('entrarPreview');

    
    
}
function SalteCena(){
    cena.classList.remove('entrarPreview', 'sacarPreview');
    void cena.offsetWidth;
    cena.classList.add('sacarPreview');
}
    const preview = document.getElementById('PreviewVs');
const modoVs = document.querySelector('.modo-vs');

modoVs.addEventListener('mouseenter', () => {
    preview.classList.remove('sacarPreview');
    void preview.offsetWidth; // Forzar reflow 
    preview.classList.add('entrarPreview');
    
    SalteCena()
    tuto.style.backgroundImage = "url('/recursos/img/drew.avif')"
    txt_tutorial.innerHTML = "¡Modo VS! <br> Consigue monedas usando tu carta favorita, pelea contra la máxima cantidad de luchadores WWE ¿Serás capaz de ser la mejor superestrella y convertirte en la próxima cara de WWE? "

});

modoVs.addEventListener('mouseleave', () => {
    preview.classList.remove('entrarPreview'); // Quitar la animación de entrada
    void preview.offsetWidth; // Forzar reflow
    preview.classList.add('sacarPreview');

    MeteteCena()
    tuto.style.backgroundImage = "none"
    txt_tutorial.innerHTML = "¡The Champ Is Here! <br> Bienvenido a WWE SUPERCARD. Dónde podrás abrir sobres y coleccionar cartas de tus superestrellas favoritas, hazte con las +60 cartas disponibles. Puedes conseguir monedas vendiendo tus cartas o jugando en el MODO VS. ¿Te parece si comenzamos?"
});



const tiendapreview = document.getElementById('PreviewTienda');
const tienda = document.querySelector('.tienda');


tienda.addEventListener('mouseenter', () => {
    tiendapreview.classList.remove('sacarPreview'); // Quitar la animación de salida si existe
    void tiendapreview.offsetWidth; // Forzar reflow para reiniciar animación si se repite
    tiendapreview.classList.add('entrarPreview');

    SalteCena()
    tuto.style.backgroundImage = "url('/recursos/img/money_bak.webp')"
    txt_tutorial.innerHTML = "¡Tu tienda WWE! <br> Compra diversos sobres dentro del juego para maximizar tu colección con dinero del juego. Desde jovenes promesas hasta las superestrellas del momento. ¡Ya disponibles las leyendas WWE!. ¿Qué esperas para probar tu suerte?"
});

tienda.addEventListener('mouseleave', () => {
    tiendapreview.classList.remove('entrarPreview'); 
    void tiendapreview.offsetWidth; // Forzar reflow
    tiendapreview.classList.add('sacarPreview');

    MeteteCena()
    tuto.style.backgroundImage = "none"
    txt_tutorial.innerHTML = "¡The Champ Is Here! <br> Bienvenido a WWE SUPERCARD. Dónde podrás abrir sobres y coleccionar cartas de tus superestrellas favoritas, hazte con las +60 cartas disponibles. Puedes conseguir monedas vendiendo tus cartas o jugando en el MODO VS. ¿Te parece si comenzamos?"
});

const coleccionpreview = document.getElementById('PreviewColeccion');
const coleccion = document.querySelector('.coleccion');
coleccion.addEventListener('mouseenter', () => {
    coleccionpreview.classList.remove('sacarPreview'); 
    void coleccionpreview.offsetWidth; // Forzar reflow para reiniciar animación si se repite
    coleccionpreview.classList.add('entrarPreview');

    SalteCena()
    tuto.style.backgroundImage = "url('/recursos/img/titles.jpg')"
    txt_tutorial.innerHTML = "¡Colección de cartas! <br> Sección donde podrás ver todas las cartas que has obtenido en WWE SUPERCARD. Aquí podrás vender las cartas que no te interesen o elegir tu favorita. ¡Supera a tus amigos y hazte con todas!"

});

coleccion.addEventListener('mouseleave', () => {
    coleccionpreview.classList.remove('entrarPreview'); 
    void coleccionpreview.offsetWidth; // Forzar reflow
    coleccionpreview.classList.add('sacarPreview');

    MeteteCena()
    tuto.style.backgroundImage = 'none'
    txt_tutorial.innerHTML = "¡The Champ Is Here! <br> Bienvenido a WWE SUPERCARD. Dónde podrás abrir sobres y coleccionar cartas de tus superestrellas favoritas, hazte con las +60 cartas disponibles. Puedes conseguir monedas vendiendo tus cartas o jugando en el MODO VS. ¿Te parece si comenzamos?"

});