function mostrarAlerta(){
    alert("Agregado con exito al carro!!!");
}
function CambiarClaroOscuro() {
    // Selecciona el elemento body
    const body = document.body;

    // Alterna entre las clases "light-mode" y "dark-mode"
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");

    // Guarda el modo seleccionado en el almacenamiento local (opcional)
    const mode = body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", mode);
}