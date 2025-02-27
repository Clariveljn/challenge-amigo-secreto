document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("amigo");

    // Deshabilitar botón al inicio
    document.querySelector(".button-draw[onclick='reiniciarJuego()']").disabled = true;

    // Agregar amigo al presionar Enter
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); 
            agregarAmigo();
        }
    });
});

let amigos = [];

// Función para agregar un nombre
function agregarAmigo() {
    const input = document.getElementById("amigo");
    let nombre = input.value.trim();

    if (nombre === "") {
        Swal.fire({
            title: "¡Error!",
            text: "Por favor, ingresa un nombre válido.",
            icon: "error",
            confirmButtonText: "Aceptar",
            customClass: {
                title: "swal-title",
                popup: "swal-popup",
                confirmButton: "swal-button"
            }
        });
        return;
    }

    //Validar que el nombre contenga al menos 3 letras
    if (nombre.length < 3) {
        Swal.fire({
            title: "Nombre muy corto",
            text: "El nombre debe contener al menos 3 letras.",
            icon: "warning",
            confirmButtonText: "Entendido",
            customClass: {
                title: "swal-title",
                popup: "swal-popup",
                confirmButton: "swal-button"
            }
        });
        return;
    }

    // Validar caracteres especiales
    const caracteresEspecialesYTildes = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?áéíóúüñ]/i;
    
    if (caracteresEspecialesYTildes.test(nombre)) {
        Swal.fire({
            title: "Caracteres no permitidos",
            text: "Por favor, no ingreses caracteres especiales ni tildes.",
            icon: "error",
            confirmButtonText: "Aceptar",
            customClass: {
                title: "swal-title",
                popup: "swal-popup",
                confirmButton: "swal-button"
            }
        });
        input.value = "";
        return;
    }

    // Validación para no permitir números
    const numeros = /\d/;
    if (numeros.test(nombre)) {
        Swal.fire({
            title: "Número no permitido",
            text: "El nombre no debe contener números.",
            icon: "warning",
            confirmButtonText: "Aceptar",
            customClass: {
                title: "swal-title",
                popup: "swal-popup",
                confirmButton: "swal-button"
            }
        });
        input.value = "";
        return;
    }

    // Convertir a minúsculas para comparar
    nombre = nombre.toLowerCase();

    if (amigos.includes(nombre)) {
        Swal.fire({
            title: "Nombre repetido",
            text: "El nombre ya está en la lista. Por favor, ingresa un nombre diferente.",
            icon: "info",
            confirmButtonText: "Aceptar",
            customClass: {
                title: "swal-title",
                popup: "swal-popup",
                confirmButton: "swal-button"
            }
        });
        input.value = "";
        return;
    }

    amigos.push(nombre);
    mostrarLista();
    input.value = "";

    // Habilitar botón "Reiniciar juego"
    document.querySelector(".button-draw[onclick='reiniciarJuego()']").disabled = false;
}

// Función para mostrar la lista de amigos
function mostrarLista() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";

    amigos.forEach((amigo, index) => {
        // Formatear el nombre con la primera letra en mayúscula
        const nombreFormateado = amigo.replace(/\b\w/g, (l) => l.toUpperCase());

        const li = document.createElement("li");
        li.textContent = nombreFormateado;
        li.classList.add("name-item");
        listaAmigos.appendChild(li);
    });
}

//Función para seleccionar un amigo
function sortearAmigo() {
    if (amigos.length < 2) {
        Swal.fire({
            title: "Lista insuficiente",
            text: "¡Debes agregar al menos 2 nombres para sortear un amigo secreto!",
            icon: "warning",
            confirmButtonText: "Aceptar",
            customClass: {
                title: "swal-title",
                popup: "swal-popup",
                confirmButton: "swal-button"
            }
        });
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSecreto = amigos[indiceAleatorio];

    const resultado = document.getElementById("resultado");
    const resultadoFormateado= amigoSecreto.replace(/\b\w/g,(l)=> l.toUpperCase());
    resultado.innerHTML = `<li class="result-item">El amigo secreto es: <strong>${resultadoFormateado}</strong></li>`;
    
    //deshabilitar botón sortear amigo
    document.querySelector(".button-draw[onclick='sortearAmigo()']").disabled = true;
}

// Función para reiniciar el juego
function reiniciarJuego() {
    amigos = [];
    const listaAmigos = document.getElementById("listaAmigos");
    const resultado = document.getElementById("resultado");

    listaAmigos.innerHTML = "";
    resultado.innerHTML = "";

    // Deshabilitar el botón de reinicio
    document.querySelector(".button-draw[onclick='reiniciarJuego()']").disabled = true;

    //habilitar botón sortear amigo
    document.querySelector(".button-draw[onclick='sortearAmigo()']").disabled = false;
}
