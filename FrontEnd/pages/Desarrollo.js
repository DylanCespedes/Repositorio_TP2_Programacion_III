//Función para llamar nuestro servidor por Axios con una obtención de todos los productos. Obtenemos los datos de la base, los guardamos en una lista, y luego con ella llevamos a cabo funciones hechas para poder pintarlas en el HTML.
document.addEventListener("DOMContentLoaded", () => {

    const tabla = document.getElementById('body-tabla-productos');
    const form = document.getElementById('formCrear');
    
    const listaProductos = async() =>{
        try {
            const respuesta = await axios.get('http://localhost:3000/productos');
            const productos = respuesta.data;
            
            tabla.innerHTML = '';
    
            productos.forEach(producto => {
                //Creo fila
                const fila = document.createElement("tr");
    
                //Creo columnas
                const celda_id = document.createElement("td");
                const celda_tipo = document.createElement("td");
                const celda_marca = document.createElement("td");
                const celda_nombre = document.createElement("td");
                const celda_precio = document.createElement("td");
                const celda_descripcion = document.createElement("td");
                const celda_foto = document.createElement("td");
                const celda_acciones = document.createElement("td");
    
                //Les pongo la info a las columnas
                celda_id.textContent = producto.IdProducto;
                celda_tipo.textContent = producto.IdTIPO;
                celda_marca.textContent = producto.IdMarca;
                celda_nombre.textContent = producto.Nombre;
                celda_precio.textContent = producto.Precio;
                celda_descripcion.textContent = producto.Descripcion;
                celda_foto.innerHTML = `<img src="${producto.Foto}" class="card-img-top" alt="foto_card"></img>`
    
                //Boton eliminar
                const boton_eliminar = document.createElement("button");
                boton_eliminar.textContent = "Eliminar";
                boton_eliminar.addEventListener("click", ()=>{borrarProducto(producto.IdProducto)});
    
                //Boton editar
                const boton_editar = document.createElement("button");
                boton_editar.textContent = "Editar";
                boton_editar.addEventListener("click", ()=>{
                    //Redirijo la pagina para que me edite
                    window.location.href = `EditarDesarrollo.html?id=${producto.IdProducto}`;
                });
    
                //Agregar botones a la celda de acciones
                celda_acciones.appendChild(boton_eliminar);
                celda_acciones.appendChild(boton_editar);
    
                fila.appendChild(celda_id);
                fila.appendChild(celda_tipo);
                fila.appendChild(celda_marca);
                fila.appendChild(celda_nombre);
                fila.appendChild(celda_precio);
                fila.appendChild(celda_descripcion);
                fila.appendChild(celda_foto);
                fila.appendChild(celda_acciones);
    
                //Agregar la fila a la tabla
                tabla.appendChild(fila);
    
            });
    
            
    
        } catch (error) {
            console.error(`Error al obtener los productos: ${error}`);
        }
    }

    //Función que elimina productos.
    const borrarProducto = async (id) =>{
        try {
            await axios.delete(`http://localhost:3000/productos/${id}`);
            listaProductos();
        } catch (error) {
            console.error(`Error al querer borrar el producto: ${error}`)
        }
    }

    form.addEventListener("submit", async function (evento) {
        evento.preventDefault(); 

        //Nuevo producto
        const nuevoProducto = {
            tipo: document.getElementById('tipo').value,
            marca: document.getElementById('marca').value,
            nombre: document.getElementById('nombre').value,
            precio: document.getElementById('precio').value,
            descripcion: document.getElementById('descripcion').value,
            foto: document.getElementById('foto').value
        };
        try {
            await axios.post(`http://localhost:3000/productos`, nuevoProducto); //Enviar el producto
            form.reset(); //Resetear el formulario
            listaProductos(); //Recargar la tabla
        } catch (error) {
            console.error(`Error al crear un producto: ${error}`);
        }
    })

    listaProductos();
})


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
