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

//Obtengo el botón de iniciar sesión y los parrafos sin texto para avisar sobre la validación
const boton = document.getElementById('btn-iniciarsesion');
const validacion_email = document.getElementById('validacion_email');
const validacion_contrasena = document.getElementById('validacion_contrasena');

//Si hace click en el botón
boton.addEventListener("click", () =>{

    //Obtengo el valor de los inputs
    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('mensaje').value;

    //Validación del mail: si tienen arroba y punto; y si estos, tienen algo escrito. 
    if(email.includes('@') && email.includes('.')){
        if(email.endsWith('@') || email.endsWith('.')){
            validacion_email.textContent = `email sin continuidad luego del @ o el .`;
        }else{
            validacion_email.textContent = 'email validado';
        }
    }else{
        validacion_email.textContent = 'email debe tener @ o .';
    }

})