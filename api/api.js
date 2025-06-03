const http = require("node:http")
const fs = require("node:fs")
const jwt = require("jsonwebtoken")
const puerto = 3000

var arreglo_tarjetas = new Array();

fs.readdir("./luchadores", (err, files) => {
    //console.log(files)
    for (i = 0; i < files.length; i++) {
        fs.readFile("./luchadores/" + files[i], "utf-8", (err, file) => {
            //console.log(file)
            arreglo_tarjetas.push(JSON.parse(file))
        })
    }
    //console.log(arreglo_tarjetas)
    /*for(i = 0; i < files.length; i++){
        
        const directorio_actual = {
            "nombre": files[i],
            "tarjeta": null
        }
        fs.readFile("./json/"+files[i], "utf-8", (err, file) =>{
            //arreglo_tarjetas.push(JSON.parse(file))
            directorio_actual.tarjeta = JSON.parse(file)

            directorio_tarjetas.push(directorio_actual)
        })
    }*/
})

var arreglo_musica = new Array();

fs.readdir("./musica_wwe", (err, files) => {
    //console.log(files)
    for (i = 0; i < files.length; i++) {
        fs.readFile("./musica_wwe/" + files[i], "utf-8", (err, file) => {
            //console.log(file)
            arreglo_musica.push(JSON.parse(file))
        })
    }
})

const llaveSecretaFirmarJWT = "s5d3g14sd35g4sd24sd0860g4sd68g4sd"


const basedatos = require("mysql2")
//linea del codigo para que funcione mi base de datos
const conexion_bd = basedatos.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "patata12",
    database: "cuentas-wwe"
})
//esto lo tengo para ver mis cuentas, pero sobretodo, que si se conecte
conexion_bd.connect((err) => {
    //console.log("Seccion para la conexion de cuenta a mi base de datos")
    if (err) {
        //console.log("chin");
        //console.log(err);
    } else {
        conexion_bd.query("select * from cuentas", (err, resultado) => {
            if (err) {
                //console.log(err)
            } else {
                //console.log(resultado)
            }
        })
        //console.log("omg, si se conectó. Esto va a ser épico papus");
    }
})




const server = http.createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "*");
    console.log(request.url)
    console.log(request.method)
    const authHeader = request.headers['authorization'];
    switch (request.method) {
        case "GET":

            if (request.url == "/") { //esto nada mas le dara la cantidad de tarjetas que tiene la api
                var objeto_cantidad = {
                    "cantidad_de_cartas": arreglo_tarjetas.length
                }
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify(objeto_cantidad));
            }else if(request.url == "/luchadores"){
                const luchadores_total = arreglo_tarjetas
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json")
                response.end(JSON.stringify(luchadores_total))
            } else if (request.url == "/en_ascenso") {
                const enAscenso = arreglo_tarjetas.filter(t => t.rango === "en ascenso"); //el filter busca en las propiedades, aca para ver que rango es, la mayoria de mis acciones necesita saber primordialmente el rango
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify(enAscenso));
            } else if (request.url == "/media_cartelera") {
                const mediaCartelera = arreglo_tarjetas.filter(t => t.rango === "media cartelera");
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify(mediaCartelera));
            } else if (request.url == "/superestrella") {
                const superestrella = arreglo_tarjetas.filter(t => t.rango === "superestrella");
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify(superestrella));
            } else if (request.url == "/leyenda") {
                const leyenda = arreglo_tarjetas.filter(t => t.rango === "leyenda");
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify(leyenda));
            } else if (request.url == "/musica") {
                const musica_total = arreglo_musica
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json")
                response.end(JSON.stringify(musica_total))
            }
            else if (request.url.startsWith("/musica/")) {
                const id = parseInt(request.url.split("/")[2]); //Extraemos el id desde el url, como es un arreglo que teoricamente contiene ["","musica","id"] creo que se entiende. 

                const cancion = arreglo_musica.find(c => c.id === id);  //ps ya esto es una clasica investigacion pro que hace js con la funcion find. Como amo los find y los filter

                if (cancion) {
                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify(cancion));
                } else {
                    response.statusCode = 404;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify({ error: "Todavia no contamos con esa cancion" }));
                }
            }
            else if (request.url === "/rivales_vs") {
                const ascenso = arreglo_tarjetas.filter(t => t.rango === "en ascenso");
                const media = arreglo_tarjetas.filter(t => t.rango === "media cartelera");
                const superestrellas = arreglo_tarjetas.filter(t => t.rango === "superestrella");
                const leyendas = arreglo_tarjetas.filter(t => t.rango === "leyenda");


                const seleccionadas = [];

                //Las deascenso
                const randomAscenso = Math.floor(Math.random() * ascenso.length);
                seleccionadas.push(ascenso[randomAscenso]);

                //Las 2 de superestrella
                const randomMedia1 = Math.floor(Math.random() * media.length);
                let randomMedia2;
                do {
                    randomMedia2 = Math.floor(Math.random() * media.length);
                } while (randomMedia2 === randomMedia1); // asegurarse que no se repita

                seleccionadas.push(media[randomMedia1]);
                seleccionadas.push(media[randomMedia2]);

                //Las 2 de superestrella
                const randomSuper1 = Math.floor(Math.random() * superestrellas.length);
                let randomSuper2;
                do {
                    randomSuper2 = Math.floor(Math.random() * superestrellas.length);
                } while (randomSuper2 === randomSuper1);

                seleccionadas.push(superestrellas[randomSuper1]);
                seleccionadas.push(superestrellas[randomSuper2]);

                //La carta leyenda
                const randomLeyenda = Math.floor(Math.random() * leyendas.length);
                seleccionadas.push(leyendas[randomLeyenda]);

                //Lo que hace splice, pero más fácil de entender
                for (let i = 0; i < seleccionadas.length - 1; i++) {
                    for (let j = i + 1; j < seleccionadas.length; j++) {
                        if (seleccionadas[i].poder > seleccionadas[j].poder) {
                            const IntercambioTemporalRapido = seleccionadas[i];
                            seleccionadas[i] = seleccionadas[j];
                            seleccionadas[j] = IntercambioTemporalRapido;
                        }
                    }
                }

                // Devolver como JSON
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify(seleccionadas));
            }
            else if (request.url == "/datos_protegidos") {
                console.log("hola")
                if (!authHeader) {
                    response.statusCode = 401;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify({ mensaje: "Token no proporcionado" }));
                    //console.log("pesimo fin")
                } else {
                    jwt.verify(authHeader, llaveSecretaFirmarJWT, (error, decoded) => {

                        if (!error) {
                            conexion_bd.connect((err) => {
                                if (err) {
                                    //console.log("chin");
                                    console.log(err);
                                } else {
                                    conexion_bd.query("SELECT id, monedas, foto_perfil, usuario, cartas_cuenta, carta_favorita, puntaje_maximo, realizando_compra FROM `cuentas` WHERE usuario = '" + decoded.username + "'", (err, resultado) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log(resultado)
                                            response.statusCode = 200;
                                            response.setHeader("Content-Type", "application/json");
                                            var respuesta = {
                                                cuenta: resultado[0],
                                                mensaje: "Si se encontro"
                                            }
                                            response.end(JSON.stringify(respuesta));
                                        }
                                    })
                                    //console.log("omg, si se conectó. Esto va a ser épico papus");
                                }
                            })

                            //console.log("fin")
                        } else {
                            response.statusCode = 401;
                            response.setHeader("Content-Type", "application/json");
                            response.end(JSON.stringify({ mensaje: "Token no valido o expirado" }));
                            //console.log("mal fin")
                        }

                    })
                }
            } else {
                for (i = 0; i < arreglo_tarjetas.length; i++) {
                    if (request.url == "/" + arreglo_tarjetas[i].id) {
                        //console.log(arreglo_tarjetas[i]);
                        response.statusCode = 200;
                        response.setHeader("Content-Type", "application/json");
                        response.end(JSON.stringify(arreglo_tarjetas[i]));
                        //console.log("else final")
                    }
                }
            }
            break;
        case "POST":
            if (request.url == "/iniciar_sesion") {
                request.on("data", info => { //el request.on servia para escuchar cuando el cliente envía datos en el cuerpo del POST (por ejemplo, el fetch de iniciar sesion, por la linea 51 a 53 de iniciar_sesion.js).
                    var accederACuenta = JSON.parse(info.toString())
                    //console.log(accederACuenta)
                    conexion_bd.query("select * from cuentas", (err, resultado) => {
                        if (err) {
                            console.log(err)
                            response.statusCode = 401;
                            response.setHeader("Content-Type", "application/json");
                            response.end(JSON.stringify({ mensaje: "Me temo que hubo un error desde aqui" }));
                        } else {
                            var EncontrarCuenta = 0
                            resultado.forEach(fila => {
                                // console.log(fila.usuario);  // Luis, luego otra cuenta blablabla
                                //console.log(accederACuenta.nombre)
                                if (accederACuenta.nombre == fila.usuario && accederACuenta.contrasena == fila.contrasena) {
                                    EncontrarCuenta = 1
                                    const token = jwt.sign({ username: fila.usuario }, llaveSecretaFirmarJWT, { expiresIn: "24h" })
                                    console.log(token);
                                    response.statusCode = 200;
                                    response.setHeader("Content-Type", "application/json");
                                    response.end(JSON.stringify({ mensaje: "Login exitoso", token_acceso: token }));
                                } else {
                                    console.log("La cuenta con nombre " + fila.usuario + " no es la buscada")
                                }
                            });
                            if (EncontrarCuenta == 0) {
                                response.statusCode = 401;
                                response.setHeader("Content-Type", "application/json");
                                response.end(JSON.stringify({ mensaje: "Hubo un error con el usuario y/o contrasena, intenta de nuevo" }));
                            }
                        }
                    })
                })
            } else if (request.url === "/cartas_ordenadas") {
                let body = "";
                request.on("data", chunk => body += chunk);
                request.on("end", () => {
                    const { ids } = JSON.parse(body);

                    const cartasFiltradas = arreglo_tarjetas.filter(c => ids.includes(c.id));

                    cartasFiltradas.sort((a, b) => b.poder - a.poder);

                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify(cartasFiltradas));
                });
            } else if (request.url == "/crear_cuenta") {
                let body = "";
                request.on("data", chunk => body += chunk);
                request.on("end", () => {
                    const data = JSON.parse(body);
                    const { foto_perfil, usuario, contrasena } = data;

                    console.log("Esta es la imagen " + foto_perfil);
                    console.log("El usuario " + usuario);
                    console.log("Su nueva contrasena sera " + contrasena);

                    //Checar si el usuario ya existe
                    conexion_bd.query("SELECT usuario FROM `cuentas` WHERE usuario = ?", [usuario], (err, resultado) => {
                        if (err) {
                            console.log(err);
                            response.statusCode = 500;
                            response.setHeader('Content-Type', 'application/json');
                            response.end(JSON.stringify({ "mensaje": "Error interno al verificar usuario" }));
                            return;
                        }

                        if (resultado.length > 0) {
                            response.statusCode = 400;
                            response.setHeader('Content-Type', 'application/json');
                            response.end(JSON.stringify({ "mensaje": "Ya existe un usuario con ese nombre" }));
                            return;
                        }

                        //Si no existe, crear la cuenta

                        conexion_bd.query(`INSERT INTO cuentas (usuario, contrasena, foto_perfil, monedas, cartas_cuenta, carta_favorita, puntaje_maximo, realizando_compra) VALUES (?, ?, ?, 50, '[1]', 1, 0, 0)`, [usuario, contrasena, foto_perfil], (err, resultado2) => {
                            if (err) {
                                console.log(err);
                                response.statusCode = 500;
                                response.setHeader('Content-Type', 'application/json');
                                response.end(JSON.stringify({ "mensaje": "Error al crear la cuenta" }));
                                return;
                            } else {
                                response.statusCode = 200;
                                response.setHeader('Content-Type', 'application/json');
                                response.end(JSON.stringify({
                                    "mensaje": "Cuenta creada correctamente",
                                    "usuario": usuario,
                                    "contrasena": contrasena
                                }));
                            }

                        }
                        );


                    });
                });
            } else if (request.url === "/meter_carta_a_cuenta") {
                let body = "";
                request.on("data", chunk => {
                    body += chunk;
                });
                request.on("end", () => {
                    if (!authHeader) {
                        response.statusCode = 401;
                        response.setHeader('Content-Type', 'application/json');
                        response.end(JSON.stringify({
                            "mensaje": "Token no proporcionado"
                        }));
                    } else {
                        jwt.verify(authHeader, llaveSecretaFirmarJWT, (err, decoded) => {
                            if (err) {
                                response.statusCode = 401;
                                response.setHeader('Content-Type', 'application/json');
                                response.end(JSON.stringify({
                                    "mensaje": "Token inválido o expirado"
                                }));
                            } else {
                                console.log("Token decodificado:", decoded);

                                const datos = JSON.parse(body);
                                const idTarjetas = datos.idTarjetas;

                                if (!Array.isArray(idTarjetas) || idTarjetas.length === 0) {
                                    response.statusCode = 400;
                                    response.setHeader('Content-Type', 'application/json');
                                    response.end(JSON.stringify({
                                        "mensaje": "Debes proporcionar un arreglo de idTarjetas válido"
                                    }));
                                    return;
                                }

                                conexion_bd.query("SELECT cartas_cuenta FROM cuentas WHERE usuario = ?", [decoded.username], (err, resultado) => {
                                    if (err) {
                                        console.error("Error en la base de datos:", err);
                                        response.statusCode = 500;
                                        response.setHeader('Content-Type', 'application/json');
                                        response.end(JSON.stringify({
                                            "mensaje": "Error en la base de datos"
                                        }));
                                        return;
                                    }

                                    if (resultado.length === 0) {
                                        response.statusCode = 404;
                                        response.setHeader('Content-Type', 'application/json');
                                        response.end(JSON.stringify({
                                            "mensaje": "No encontramos la cuenta"
                                        }));
                                        return;
                                    }

                                    let cartasTexto = resultado[0].cartas_cuenta;
                                    if (typeof cartasTexto !== "string") {
                                        cartasTexto = JSON.stringify(cartasTexto);
                                    }

                                    const cartasLimpio = cartasTexto.replace(/\s/g, "");
                                    let cartas = [];
                                    try {
                                        cartas = JSON.parse(cartasLimpio);
                                        //Para checar que me mande el array y no una cosa que ni al caso
                                        if (!Array.isArray(cartas)) {
                                            cartas = [];
                                        }
                                    } catch (e) {
                                        cartas = [];
                                    }

                                    // Agregar todas las cartas nuevas evitando duplicado
                                    const conjuntoCartas = new Set(cartas);
                                    idTarjetas.forEach(id => conjuntoCartas.add(id));

                                    const nuevasCartas = Array.from(conjuntoCartas);

                                    conexion_bd.query("UPDATE cuentas SET cartas_cuenta = ? WHERE usuario = ?", [JSON.stringify(nuevasCartas), decoded.username], (err2) => {
                                        if (err2) {
                                            console.error("Error al guardar en cartas_cuenta:", err2);
                                            response.writeHead(500, { "Content-Type": "application/json" });
                                            response.end(JSON.stringify({ mensaje: "Error al actualizar" }));
                                        } else {
                                            response.writeHead(200, { "Content-Type": "application/json" });
                                            response.end(JSON.stringify({
                                                idTarjetasAgregadas: idTarjetas,
                                                mensaje: "Se agregaron las cartas correctamente"
                                            }));
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
            }
            break;
        case "PUT":
            if (request.url === "/aumentar_dinero") {
                let body = "";
                request.on("data", chunk => {
                    body += chunk;
                });
                console.log("si se ejecuto el put")
                request.on("end", () => {
                    const data = JSON.parse(body);
                    const { cantidad_a_aumentar, cuenta } = data;
                    console.log("Se han pedido " + cantidad_a_aumentar + " monedas")
                    console.log("Se va a transferir a la cuenta con id " + cuenta)
                    //Nota para mi: si quiero transferir un valor se puede hacer con el signo de interrogacion, de igualforma se le puede sumar
                    conexion_bd.query("UPDATE cuentas SET monedas = monedas + ? WHERE id = ?", [cantidad_a_aumentar, cuenta], (err, resultado) => {
                        if (err) {
                            console.error("Error al aumentar las monedas:", err);
                            response.statusCode = 500;
                            response.setHeader("Content-Type", "application/json");
                            response.end(JSON.stringify({ mensaje: "Error al aumentar las monedas" }));
                        } else {
                            conexion_bd.query("SELECT monedas FROM cuentas WHERE id = ?", [cuenta], (err2, resultado2) => {
                                if (err2) {
                                    console.error("Error al obtener el las monedas actualizado:", err2)
                                    response.statusCode = 500;
                                    response.setHeader("Content-Type", "application/json");
                                    response.end(JSON.stringify({ mensaje: "Error al obtener monedas actualizado" }))
                                } else {
                                    const monedas_actualizado = resultado2[0].monedas;
                                    response.statusCode = 200;
                                    response.setHeader("Content-Type", "application/json");
                                    var nueva_cantidad_de_monedas_del_usuario = {
                                        mensaje: "La transacción ha sido un éxito",
                                        dinero_actualizado: monedas_actualizado
                                    }
                                    response.end(JSON.stringify(nueva_cantidad_de_monedas_del_usuario));
                                }
                            });
                        }
                    });
                })
            } else if (request.url == "/restar_dinero") {
                let body = "";
                request.on("data", chunk => {
                    body += chunk;
                });
                request.on("end", () => {
                    const data = JSON.parse(body);
                    const { cantidad_a_restar, cuenta } = data;
                    console.log("Se restaran " + cantidad_a_restar + " monedas de la cuenta")
                    console.log("Se restaran esas monedas a la cuenta con id " + cuenta)
                    //Nota para mi: si quiero transferir un valor se puede hacer con el signo de interrogacion, de igualforma se le puede sumar
                    conexion_bd.query("UPDATE cuentas SET monedas = monedas - ? WHERE id = ?", [cantidad_a_restar, cuenta], (err, resultado) => {
                        if (err) {
                            console.error("Error al restar las monedas:", err);
                            response.statusCode = 500;
                            response.setHeader("Content-Type", "application/json");
                            response.end(JSON.stringify({ mensaje: "Error al restar las monedas" }));
                        } else {
                            conexion_bd.query("SELECT monedas FROM cuentas WHERE id = ?", [cuenta], (err2, resultado2) => {
                                if (err2) {
                                    console.error("Error al obtener el las monedas actualizado:", err2)
                                    response.statusCode = 500;
                                    response.setHeader("Content-Type", "application/json");
                                    response.end(JSON.stringify({ mensaje: "Error al obtener monedas actualizado" }))
                                } else {
                                    const monedas_actualizado = resultado2[0].monedas;
                                    response.statusCode = 200;
                                    response.setHeader("Content-Type", "application/json");
                                    var nueva_cantidad_de_monedas_del_usuario = {
                                        mensaje: "La resta ha sido un éxito, el usuario ya puede recibir su compra",
                                        dinero_actualizado: monedas_actualizado
                                    }
                                    response.end(JSON.stringify(nueva_cantidad_de_monedas_del_usuario));
                                }
                            });
                        }
                    });
                })
            } else if (request.url == "/cambiar_puntaje_maximo") {
                let body = "";
                request.on("data", chunk => {
                    body += chunk;
                });
                request.on("end", () => {
                    const data = JSON.parse(body);
                    const { puntaje_maximo, idCuenta } = data;
                    console.log("El puntaje  " + puntaje_maximo + " sera el nuevo puntaje")
                    console.log("La cuenta con el id " + idCuenta + " sera la del nuevo puntaje")
                    /** */
                    conexion_bd.query("UPDATE cuentas SET puntaje_maximo = ? WHERE id = ?", [puntaje_maximo, idCuenta], (err, resultado) => {
                        if (err) {
                            console.error("Error con la base de datos", err);
                            response.statusCode = 500;
                            response.setHeader("Content-Type", "application/json");
                            response.end(JSON.stringify({ mensaje: "Error al actualizar" }));
                            console.log("Se ejecuto esta")
                        } else {
                            response.statusCode = 200;
                            response.setHeader("Content-Type", "application/json");
                            response.end(JSON.stringify({mensaje: "Se ha cambiado correctamente"}));
                            console.log("Se ejecuto el bueno")
                        }
                    }); 
                })
            } else if (request.url == "/acceso_compra") {
                let body = "";
                request.on("data", chunk => {
                    body += chunk;
                });
                request.on("end", () => {
                    if (!authHeader) {
                        response.statusCode = 401;
                        response.setHeader('Content-Type', 'application/json');
                        response.end(JSON.stringify({
                            "mensaje": "Token no proporcionado"
                        }));
                    } else {
                        jwt.verify(authHeader, llaveSecretaFirmarJWT, (err, decoded) => {
                            if (err) {
                                response.statusCode = 401;
                                response.setHeader('Content-Type', 'application/json');
                                response.end(JSON.stringify({
                                    "mensaje": "Token inválido o expirado"
                                }));
                            } else {
                                console.log("Token decodificado:", decoded);

                                const datos = JSON.parse(body);
                                const confirmacion = datos.confirmacion_compra;

                                conexion_bd.query("UPDATE cuentas SET realizando_compra = ? WHERE usuario = ?", [confirmacion, decoded.username], (err, resultado) => {
                                    if (err) {
                                        console.error("Error en la base de datos:", err);
                                        response.statusCode = 500;
                                        response.setHeader('Content-Type', 'application/json');
                                        response.end(JSON.stringify({
                                            "mensaje": "Error en la base de datos"
                                        }));
                                    } else {
                                        if (resultado.affectedRows > 0) {
                                            response.statusCode = 200;
                                            response.setHeader('Content-Type', 'application/json');
                                            response.end(JSON.stringify({
                                                "mensaje": "Acceso permitido para obtener la recompensa de su compra"
                                            }));
                                        } else {
                                            response.statusCode = 404;
                                            response.setHeader('Content-Type', 'application/json');
                                            response.end(JSON.stringify({
                                                "mensaje": "Cuenta no encontrada"
                                            }));
                                        }
                                    }
                                }
                                );

                            }
                        });
                    }
                })

            }
            else if (request.url == "/cambiar_foto_perfil") {
                let body = "";
                request.on("data", chunk => {
                    body += chunk;
                });
                console.log("si se ejecuto el put")
                request.on("end", () => {
                    const data = JSON.parse(body);
                    const { imagen, idCuenta } = data;

                    //console.log("imagen:", imagen);
                    console.log("ID de la cuenta que vamos a cambiarle la foto:", idCuenta);
                    conexion_bd.query("UPDATE cuentas SET foto_perfil = ? WHERE id = ?", [imagen, idCuenta], (err, resultado) => {
                        if (err) {
                            console.error("Error al actualizar la foto de perfil:", err);
                            response.statusCode = 500;
                            response.setHeader("Content-Type", "application/json");
                            response.end(JSON.stringify({ mensaje: "Error al actualizar la foto de perfil" }));
                        } else {
                            response.statusCode = 200;
                            response.setHeader("Content-Type", "application/json");
                            response.end(JSON.stringify({ mensaje: "Foto de perfil actualizada correctamente" }));
                        }
                    })
                })

            }
            else if (request.url == "/cambiar_carta_favorita") {
                console.log("se pidio cambiar el id de una tarjeta")
                let body = "";
                request.on("data", chunk => {
                    body += chunk;
                });

                request.on("end", () => {
                    const data = JSON.parse(body);
                    const { nueva_card_favorita, cuenta } = data;

                    console.log("Cuenta:", cuenta);
                    console.log("ID de la NUEVA tarjeta favorita:", nueva_card_favorita);

                    conexion_bd.query(
                        "UPDATE cuentas SET carta_favorita = ? WHERE id = ?",
                        [nueva_card_favorita, cuenta],
                        (err, resultado) => {
                            if (err) {
                                console.error("Error al actualizar la nueva card_favorita:", err);
                                response.statusCode = 500;
                                response.setHeader("Content-Type", "application/json");
                                response.end(JSON.stringify({ mensaje: "Error al actualizar la carta favorita" }));
                            } else {
                                // Confirmamos que se actualizó correctamente y obtenemos el nuevo valor
                                conexion_bd.query("SELECT carta_favorita FROM cuentas WHERE id = ?", [cuenta], (err2, resultado2) => {
                                    if (err2) {
                                        console.error("Error al obtener la carta favorita actualizada:", err2);
                                        response.statusCode = 500;
                                        response.setHeader("Content-Type", "application/json");
                                        response.end(JSON.stringify({ mensaje: "Error al obtener la carta favorita actualizada" }));
                                    } else {
                                        const carta_favorita_actualizada = resultado2[0].carta_favorita;
                                        response.statusCode = 200;
                                        response.setHeader("Content-Type", "application/json");
                                        response.end(JSON.stringify({
                                            mensaje: "La carta favorita fue actualizada correctamente",
                                            carta_actualizada_favorita: carta_favorita_actualizada
                                        }));
                                    }
                                }
                                );
                            }
                        }
                    );
                });
            }

            break;
        case "DELETE":
            if (request.url === "/borrar_carta_de_la_cuenta") {
                let body = "";
                request.on("data", chunk => {
                    body += chunk;
                });
                console.log("si se ejecuto el delete")
                request.on("end", () => {
                    const data = JSON.parse(body);
                    const { idTarjeta, cuenta } = data;

                    console.log("Cuenta:", cuenta);
                    console.log("ID de tarjeta a eliminar:", idTarjeta);

                    conexion_bd.query("SELECT cartas_cuenta FROM cuentas WHERE id = ?", [cuenta], (err, resultado) => {
                        if (err) {
                            console.error("No esta la cuenta: ", err);

                            response.writeHead(500, { "Content-Type": "application/json" });
                            response.end(JSON.stringify({ mensaje: "Error de base de datos" }));
                        } else if (resultado.length === 0) {
                            response.writeHead(404, { "Content-Type": "application/json" });
                            response.end(JSON.stringify({ mensaje: "No encontramos la cuenta" }));
                        }

                        ////////////////////////////////////////////////////////////////////////////
                        //Nota para mi: la proxima vez usa una 2da tabla no manches, esta bien dificil asi, pero limpias
                        let cartasTexto = resultado[0].cartas_cuenta;
                        console.log(cartasTexto) //[1, 2, 3, 4] algo asi deberia de salir por ejemplo

                        if (typeof cartasTexto !== "string") { // aqui convertimos eso en un texto, para despues poder quitar los espacios en blanco que me deja predeterminadamente esto
                            cartasTexto = JSON.stringify(cartasTexto);
                        }

                        //s sirve para reemplazar los spaceblank y saltos de linea si es que hay
                        //g significa que se aplica de forma global
                        //lo 3ro es lo que se reemplaza, o sea, todo de un jalon
                        const cartasLimpio = cartasTexto.replace(/\s/g, "");
                        const cartas = JSON.parse(cartasLimpio);

                        // Ahora si, busca el index de la carta que ps se mando
                        const index = cartas.indexOf(idTarjeta);
                        if (index !== -1) { //si no es -1 (que es el predeterminado de indexOf) ps entonces se activa esta vaina
                            console.log(index)
                            cartas.splice(index, 1); //el splice borrara el elemento de index, pero ps nada mas 1, como dice la 2da propiedad

                            //Guarda el nuevo array de cartas actualizado (ya sin la carta eliminada) en la base de datos. Se convierte a texto con JSON.stringify(cartas) para guardarlo como string en el campo cartas_cuenta.
                            conexion_bd.query("UPDATE cuentas SET cartas_cuenta = ? WHERE id = ?", [JSON.stringify(cartas), cuenta], (err2) => {
                                if (err2) {
                                    console.error("Error al guardar en cartas_cuenta:", err2);
                                    response.writeHead(500, { "Content-Type": "application/json" });
                                    response.end(JSON.stringify({ mensaje: "Error al actualizar" }));
                                } else {
                                    var respuestadeEliminado = {
                                        idTarjetaEliminada: idTarjeta,
                                        mensaje: "Se elimino la carta perfectamente. Ya puede recibir el dinero de la venta"
                                    }
                                    response.writeHead(200, { "Content-Type": "application/json" });
                                    response.end(JSON.stringify(respuestadeEliminado));
                                }
                            }
                            );
                        } else {
                            response.writeHead(404, { "Content-Type": "application/json" });
                            response.end(JSON.stringify({ mensaje: "Carta no encontrada en la cuenta" }));
                        }

                        /////////////////////////////////////////////////////////////////



                    })
                })
            }
            break;
        case "OPTIONS":
            response.writeHead(200)
            response.end()
            break;
    }


});
server.listen(puerto, () => {
    console.log("Servidor a la escucha en http://localhost:" + puerto)
})