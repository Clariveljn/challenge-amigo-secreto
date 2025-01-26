let amigos = [];

// Función para agregar un nombre
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    if (amigos.includes(nombre)) {
        alert("El nombre ya está en la lista. Por favor, ingresa un nombre diferente.");
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
        const li = document.createElement("li");
        li.textContent = amigo;
        li.classList.add("name-item");
        listaAmigos.appendChild(li);
    });
}

//Función para seleccionar un amigo
function sortearAmigo() {
    if (amigos.length === 0) {
        alert("¡Aún no hay nadie en la lista! Por favor, añade al menos un nombre");
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSecreto = amigos[indiceAleatorio];

    const resultado = document.getElementById("resultado");
    resultado.innerHTML =`<li class="result-item">El amigo secreto es: <strong>${amigoSecreto}</strong></li>`;

}
