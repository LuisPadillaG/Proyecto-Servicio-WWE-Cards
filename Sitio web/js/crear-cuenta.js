window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.container').classList.add('expandido');
    }, 2000); // espera 2 segundos (2000 ms)
});
const imagenInput = document.getElementById('imagenInput');
const preview = document.getElementById('preview');
/**logica para el preview de la imagen */
document.addEventListener('DOMContentLoaded', () => {


    imagenInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                preview.src = reader.result;
            };
            reader.readAsDataURL(file);
        } else {
            preview.src = '';
        }
    });
    console.log(imagenInput.files[0])
});
/**logica de checar formulario */
document.addEventListener('DOMContentLoaded', () => {
    const confirmarBtn = document.querySelector('.confirmar-creacion');

    confirmarBtn.addEventListener('click', (e) => {
        e.preventDefault(); // evita que siga el link hasta verificar
        const imagenInput = document.querySelector("#imagenInput")
        const nombre = document.querySelector('.input_nombre').value.trim();
        const contrasena = document.querySelector('.input_password').value.trim();
        const confirmarContrasena = document.querySelector('.input_confirmar_password').value.trim();

        if (!nombre || !contrasena || !confirmarContrasena) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        if (!imagenInput.files || imagenInput.files.length === 0) {
            alert('Por favor, sube una image.');
            return;
        }
        if (contrasena !== confirmarContrasena) {
            alert('Las contraseñas no coinciden. Intenta de nuevo.');
            return;
        }

        fetch("http://localhost:3000/crear_cuenta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: nombre,
                contrasena: contrasena,
                foto_perfil: preview.src
            })
        }).then(recurso => recurso.json()).then(resultado => {
            console.log(resultado.mensaje)
            console.log(resultado)
            const datos = {
                nombre: resultado.usuario,
                contrasena: resultado.contrasena
            };
            //fetch ahora para iniciar sesion
            fetch("http://localhost:3000/iniciar_sesion", {
                method: "POST",
                body: JSON.stringify(datos)
            }).then(respuesta => {
                if (respuesta.status == 200) {
                    respuesta.json().then(acceso => {
                        sessionStorage.setItem("tokenSesion", acceso.token_acceso)
                        console.log(acceso.mensaje)
                        console.log(acceso.token_acceso)
                        window.location.href = "tutorial.html"
                    })
                } else {
                    respuesta.json().then(fallo => {
                        alert(fallo.mensaje)
                        console.log(fallo.mensaje)
                    })
                }
            })
        })
            .catch(err => {
                console.error("Error en la petición: ", err);
            });
        //window.location.href = 'tutorial.html';
    });
});
