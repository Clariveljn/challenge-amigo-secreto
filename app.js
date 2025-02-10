let amigos = [];

// Función para agregar un nombre
function agregarAmigo() {
    const input = document.getElementById("amigo");
    let nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

     // Validar que el nombre tenga minimo 3 letras
     if (nombre.length < 3 ) {
        alert("El nombre debe contener al menos 3 letras");
        return;
    }

    // Validar caracteres especiales
    const caracteresEspecialesYTildes = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?áéíóúüñ]/i;
    
    if (caracteresEspecialesYTildes.test(nombre)) {
        alert("Por favor, no ingreses caracteres especiales ni tildes.");
        input.value = "";
        return;
    }

    // Validación para no permitir números
    const numeros = /\d/;
    if (numeros.test(nombre)) {
        alert("El nombre no debe contener números.");
        input.value = "";
        return;
    }

    // Convertir a minúsculas para comparar
    nombre = nombre.toLowerCase();

    if (amigos.includes(nombre)) {
        alert("El nombre ya está en la lista. Por favor, ingresa un nombre diferente.");
        input.value = "";
        return;
    }

    amigos.push(nombre);
    mostrarLista();
    input.value = "";
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
    if (amigos.length === 0) {
        alert("¡Aún no hay nadie en la lista! Por favor, añade amigos a tu lista");
        return;
    }

    if (amigos.length < 2) {
        alert("¡La lista debe contener al menos 2 nombres para sortear un amigo secreto! Por favor, añade más nombres.");
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSecreto = amigos[indiceAleatorio];

    const resultado = document.getElementById("resultado");
    const resultadoFormateado= amigoSecreto.replace(/\b\w/g,(l)=> l.toUpperCase());
    resultado.innerHTML = `<li class="result-item">El amigo secreto es: <strong>${resultadoFormateado}</strong></li>`;
}

// Función para reiniciar el juego
function reiniciarJuego() {
    amigos = [];
    const listaAmigos = document.getElementById("listaAmigos");
    const resultado = document.getElementById("resultado");

    listaAmigos.innerHTML = "";
    resultado.innerHTML = "";
}

