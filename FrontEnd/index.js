function cambiarTextoBotonMarca(nuevoTexto){
    document.getElementById("dropDownButton-marca").textContent = nuevoTexto;
}

let listaItemMarca = document.getElementsByClassName("item-marca");

let listaItemComponente = document.getElementsByClassName("item-componente");

for(let i = 0; i<listaItemMarca.length; i++){
    listaItemMarca[i].addEventListener("click", ()=>{

        cambiarTextoBotonMarca(listaItemMarca[i].textContent);

    });
}

function cambiarTextoBotonComponente(nuevoTexto){
    document.getElementById("dropdownButton-componente").textContent = nuevoTexto;
}

for(let i = 0; i<listaItemComponente.length; i++){
    listaItemComponente[i].addEventListener("click", ()=>{

        cambiarTextoBotonComponente(listaItemComponente[i].textContent);

    });
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