document.addEventListener("DOMContentLoaded", () => {
    const formEditar = document.getElementById('form-editar');

    const parametrosURL = new URLSearchParams(window.location.search);
    const idProducto = parametrosURL.get("id");

    //Función para buscar producto por id para lueego modificarlos
    const obtenerProducto = async() => {
        try {
            const respuesta = await axios.get(`http://localhost:3000/productos/${idProducto}`);
            const producto = respuesta.data;

            //Ponemos sus valores originales en el input
            document.getElementById('nuevo-tipo').value = producto[0].IdTIPO; 
            document.getElementById('nuevo-marca').value = producto[0].IdMarca;
            document.getElementById('nuevo-nombre').value = producto[0].Nombre;
            document.getElementById('nuevo-precio').value = producto[0].Precio;
            document.getElementById('nuevo-descripcion').value = producto[0].Descripcion;
            document.getElementById('nuevo-foto').value = producto[0].Foto;

        } catch (error) {
            console.error(`Error al obtener el producto: ${error}`);
        }
    }

    if(idProducto){
        obtenerProducto();
    }

    formEditar.addEventListener("submit", async function(evento){
        evento.preventDefault();

        //Guardamos nuevos valores
        const productoActualizado ={
            tipo: document.getElementById('nuevo-tipo').value,
            marca: document.getElementById('nuevo-marca').value,
            nombre: document.getElementById('nuevo-nombre').value,
            precio: document.getElementById('nuevo-precio').value,
            descripcion: document.getElementById('nuevo-descripcion').value,
            foto: document.getElementById('nuevo-foto').value
        }
        try {
            await axios.put(`http://localhost:3000/productos/${idProducto}`, productoActualizado);
            alert(`Producto actualizado`);
            //Redirigir despues de actualizar
            window.location.href = 'Desarrollo.html';
        } catch (error) {
            console.error(`Error al modificar el producto: ${error}`);
        }
    })

})