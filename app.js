let amigos = [];

// Función para agregar un nombre
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
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
