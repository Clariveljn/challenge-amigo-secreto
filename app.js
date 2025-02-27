document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("amigo");
    const botonReiniciar = document.querySelector(".button-draw[onclick='reiniciarJuego()']");
    botonReiniciar.disabled = true;

    // Agregar amigo al presionar Enter
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); 
            agregarAmigo();
        }
    });
});

let amigos = [];

// Función para mostrar alertas
function mostrarAlerta(titulo, texto, icono) {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        confirmButtonText: "Aceptar",
        customClass: {
            title: "swal-title",
            popup: "swal-popup",
            confirmButton: "swal-button"
        }
    });
}

// Función para agregar un nombre
function agregarAmigo() {
    const input = document.getElementById("amigo");
    let nombre = input.value.trim();

    //Validar que no se ingrese un nombre vacio
    if (!nombre) {
        return mostrarAlerta("¡Error!", "Por favor, ingresa un nombre.", "error");
    }
   
    const caracteresEspecialesYTildes = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?áéíóúüñ]/i;
    const numeros = /\d/;

    // Validar caracteres especiales
    if (caracteresEspecialesYTildes.test(nombre)) {
        input.value = "";
        return mostrarAlerta("Caracteres no permitidos", "Por favor, no ingreses caracteres especiales ni tildes.", "error");
    }

    // Validación para no permitir números
    if (numeros.test(nombre)) {
        input.value = "";
        return mostrarAlerta("Números no permitidos", "El nombre no debe contener números.", "warning");
    }
 
    //Validar que el nombre contenga al menos 3 letras
    if (nombre.length < 3) {
        return mostrarAlerta("Nombre muy corto", "El nombre debe contener al menos 3 letras.", "warning");
    }

    // Convertir a minúsculas para comparar
    nombre = nombre.toLowerCase();

    //Validación para no permitir nombres repetidos
    if (amigos.includes(nombre)) {
        input.value = "";
        return mostrarAlerta("Nombre repetido", "El nombre ya está en la lista. Por favor, ingresa un nombre diferente.", "info");
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
        return mostrarAlerta("Lista insuficiente", "¡Debes agregar al menos 2 nombres para sortear un amigo secreto!", "warning");
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
