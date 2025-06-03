/*const cuentaDePrueba = "Luis"
const contrasenaDePrueba = "1234"

document.addEventListener('DOMContentLoaded', () => {
    const confirmarBtn = document.querySelector('.iniciar-sesion');
    
    confirmarBtn.addEventListener('click', (e) => {
        e.preventDefault(); // evita que siga el link hasta verificar

        const nombre = document.querySelector('.input_nombre').value.trim();
        const contrasena = document.querySelector('.input_password').value.trim(); //trim pa quitar espacios

        if (!nombre || !contrasena) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        if (nombre !== cuentaDePrueba) {
            alert('Esta cuenta no existe.');
            return;
        }

        if (contrasena !== contrasenaDePrueba) {
            alert('Error en tu contraseña');
            return;
        }

        // Si todo bien, redirigir (manualmente)
        window.location.href = 'tutorial.html';
    });
});*/
document.addEventListener('DOMContentLoaded', () => {
    const confirmarBtn = document.querySelector('.iniciar-sesion');

    confirmarBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const nombre = document.querySelector('.input_nombre').value.trim();
        const contrasena = document.querySelector('.input_password').value.trim();
        
        if (!nombre || !contrasena) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const datos = {
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
                    window.location.href="tutorial.html"
                })
           }else{
            respuesta.json().then(fallo=>{
                alert(fallo.mensaje)
                console.log(fallo.mensaje)
            })
           }
        })
/*
        const resultado = await respuesta.json();

        if (respuesta.status === 200) {
            // Guardamos el token de sesión para siguientes peticiones
            sessionStorage.setItem("tokenSesion", resultado.token_acceso);

            // Puedes guardar info adicional del usuario si la devuelves también
            console.log("Se quedo aqui")
            // Redirigir a cuenta o donde quieras
            window.location.href = "cuenta.html";
        } else {
            alert(resultado.mensaje);
        }*/

    });
});

