//variables del carrito
let carrito = [] //carrito vacío
let carrito_mensaje = [] //lista donde guardo lo que aparecerá en el HTML cuando se agregue un producto al carrito
let acumulador_carrito = 0 //variable que guarda el total del carrito


//Obtengo los contenedores donde muestro los productos, donde ingresaré el carrito y los precios
let descripcion_carrito = document.getElementById('descripcion_carrito');
let precio_total = document.getElementById('precio_total');
let container_productos = document.getElementById('container_productos');
let btn_limpiar_carrito = document.getElementById('limpiar_carrito');

//Ingreso los valores predeterminados del carrito, cuando no tiene nada
descripcion_carrito.innerHTML = `<p>Vacío</p>`
precio_total.textContent = `Precio total: 0`;

//Variables de productos
let lista_productos_cartas = []; //lista donde guardo los productos hechos cartas para insertar en el main
let lista_productos =[] //lista donde guardo los productos por sus atributos

//Listas donde contengo los botones
let lista_btn_agregar = []
let lista_btn_borrar=[]

//Función para llamar nuestro servidor por Axios con una obtención de todos los productos. Obtenemos los datos de la base, los guardamos en una lista, y luego con ella llevamos a cabo funciones hechas para poder pintarlas en el HTML.
const listaProductos = async() =>{
    try {
        const respuesta = await axios.get('http://localhost:3000/productos');
        const productos = respuesta.data;

        productos.forEach(producto => {
            //Creo el objeto producto y le ingreso los valores del JSON
            let p = {id: producto.IdProducto,
                tipo: producto.IdTIPO,
                marca: producto.IdMarca,
                nombre: producto.Nombre,
                precio: producto.Precio,
                descripcion: producto.Descripcion,
                foto: producto.Foto
            };

            //lo agrego a la lista donde guardo los productos
            lista_productos.push(p);
        });

        renderizarProductos(lista_productos);

    } catch (error) {
        console.error(`Error al obtener los productos: ${error}`);
    }
}
listaProductos();


//verProductos(): función que ingresa en el HTML todos los productos que fueron guardados en la lista_productos. La idea es guardar dentro de una lista local, una carta de bootstrap por cada producto que tendrá información sobre ellos. Al finalizar el bucle insertamos la lista al container. Finalmente, guardo en lista_btn_agregar una lista que contenga todos los botones de agregar al carro; esto porque luego nos servirá para darles funcionalidad
function verProductos(lista){
    let lista_productos_card = [];
    for (let i = 0; i < lista.length; i++){
        lista_productos_card.push( `
        <div class="card" id=${lista[i].id} style="width: 13rem;">
            <img src="${lista[i].foto}" class="card-img-top" alt="foto_card">
            <div class="card-body">
                <h5 class="card-title">${lista[i].nombre}</h5>
                <p class="card-text">${lista[i].descripcion}</p>
                <p class="card-text">$${lista[i].precio}</p>
                <a class="btn btn-custom btn_carrito">Agregar al carro</a>
            </div>
        </div>
        `); 
    }
    

    container_productos.innerHTML = lista_productos_card;
    lista_btn_agregar = document.getElementsByClassName("btn_carrito");
}


//Función para actualizar los productos en el HTML
function renderizarProductos(lista){
    verProductos(lista);//Mostramos productos según la lista
    agregarProductoCarrito(lista);//Damos opción a agregar al carrito según la lista
}

// Función para actualizar el carrito en el HTML
function renderizarCarrito() {
    descripcion_carrito.innerHTML = carrito_mensaje; // Renderizamos todos los elementos del carrito en el HTML
    precio_total.textContent = `Precio total: ${acumulador_carrito}`; // Actualizamos el precio total también en el HTML
    actualizarBotonesEliminar(); // Renderizamos los botones de "Borrar"
}

//Esta función es encargada de agregar los productos al carrito. Recorre la lista de botones que tendrán que agregar los productos. Cuando hace click dentro del botón: se ingresa el producto a la lista carrito, sumamos el precio total, guardamos en la lista carrito_mensaje un contenedor que tiene la información resumida del producto. Finalmente renderizamos el carrito.
function agregarProductoCarrito(lista){
    for(let i = 0; i < lista_btn_agregar.length; i++){
        lista_btn_agregar[i].addEventListener("click", () => {
            carrito.push(lista[i]); //ingreso el producto a la lista carrito
            acumulador_carrito += lista[i].precio; //acumulo el precio total
            carrito_mensaje.push(`<div class="elemento_carrito">
            <p>Nombre del producto: ${lista[i].nombre}</p>
            <p>Precio del producto: ${lista[i].precio}</p>
            <a class="btn btn-custom btn_borrar">Borrar</a>
            </div>
            `)//Agrego los datos que quiero que aparezca en el apartado de carrito del HTML
            renderizarCarrito();
        })
    }
}

//Función para borrar el producto de carrito que le pases por el indice. Borra los elementos del indice que le pases por parámetro, y le resta del total del carrito, el precio de ese producto.
function borrarProductoCarrito(indice){
    acumulador_carrito -= carrito[indice].precio;
    carrito.splice(indice,1);
    carrito_mensaje.splice(indice,1);
    renderizarCarrito();
}

// Función para actualizar los botones de eliminar en cada elemento del carrito. Lo que hace es obtenerlos mediante un getelement. Luego los recorre y les indica que cuando le hagan click, lleve a cabo la función de borrar producto.
function actualizarBotonesEliminar() {
    lista_btn_borrar = document.getElementsByClassName("btn_borrar");
    for (let i = 0; i < lista_btn_borrar.length; i++) {
        lista_btn_borrar[i].addEventListener("click", () => {
            borrarProductoCarrito(i);
        });
    }
    btn_limpiar_carrito.addEventListener("click", () => {borrarCarritoEntero()})
}

//Función para borrar el carrito entero
function borrarCarritoEntero(){
    acumulador_carrito = 0;
    borrarLista(carrito);
    borrarLista(carrito_mensaje);
    renderizarCarrito();
}




/**************************** BOTONES FILTRO ***********************/
//Funciones para cambiar el texto de los botones de filtro en HTML. 
function cambiarTextoBoton(nuevoTexto, filtro){
    document.getElementById(`dropDownButton-${filtro}`).textContent = nuevoTexto;
}

//Guardo en listas los botones dropdown de los filtros
let listaItemMarca = document.getElementsByClassName("item-marca");
let listaItemTipo = document.getElementsByClassName("item-componente");

//Nueva lista de productos filtrados
let lista_filtrada = [];
//Banderas que nos van a servir para filtrar por los dos 
let bandera_filtro_marca = false;
let bandera_filtro_tipo = false;


//Código de filtrado en el botón de marca
for(let i = 0; i < listaItemMarca.length; i++){ //Recorremos los dropdowns items de marca
    listaItemMarca[i].addEventListener("click", ()=>{ //Si hacen click
        let marca = listaItemMarca[i].textContent //Guardamos el nombre en una variable
        cambiarTextoBoton(marca, 'marca'); //Cambiamos el texto del botón marca
        borrarLista(lista_filtrada);

        if(bandera_filtro_tipo == true){ //Si ya está filtrando por tipo, condicionamos por marca y por tipo.
            for (let i = 0; i < lista_productos.length; i++){ //Recorra la lista de productos
                if(lista_productos[i].marca == marca && lista_productos[i].tipo == document.getElementById(`dropDownButton-tipo`).textContent){
                    lista_filtrada.push(lista_productos[i]);//Ingresamos los productos a la lista filtada
                }
            }
        }else{ //Si no está filtrando por tipo.
            for (let i = 0; i < lista_productos.length; i++){
                if(lista_productos[i].marca == marca){ //Filtramos solo por marca
                    lista_filtrada.push(lista_productos[i]);
                }
            }
        }

        renderizarProductos(lista_filtrada); //Muestro los productos con la lista filtrada
        bandera_filtro_marca = true; //Confirmamos que se está filtrando por marca

        mostrarBotonRestablecer();
    });
}

//Código de filtrado en el botón de componente
for(let i = 0; i < listaItemTipo.length; i++){ //Recorremos los dropdowns items de tipo
    listaItemTipo[i].addEventListener("click", ()=>{ //Si hacen click
        let tipo = listaItemTipo[i].textContent //Guardamos el nombre en una variable
        cambiarTextoBoton(tipo, 'tipo'); //Cambiamos el texto del botón tipo
        borrarLista(lista_filtrada);

        if(bandera_filtro_marca == true){ //Si ya está filtrando por marca, condicionamos por marca y por tipo.
            for (let i = 0; i < lista_productos.length; i++){ //Recorra la lista de productos
                if(lista_productos[i].tipo == tipo && lista_productos[i].marca == document.getElementById(`dropDownButton-marca`).textContent){
                    lista_filtrada.push(lista_productos[i]); //Ingresamos los productos a la lista filtada
                }
            }
        }else{ //Si no está filtrando por tipo.
            for (let i = 0; i < lista_productos.length; i++){
                if(lista_productos[i].tipo == tipo){ //Filtramos solo por marca
                    lista_filtrada.push(lista_productos[i]);
                }
            }
        }

        renderizarProductos(lista_filtrada); //Muestro los productos con la lista filtrada
        bandera_filtro_tipo = true; //Confirmamos que se está filtrando por marca

        mostrarBotonRestablecer();
    });
}

//Función para borrar cualquier lista
function borrarLista(lista){
    for(let i = 0; i <= lista.length; i++){ //Limpiamos la lista
        lista.splice(0,1);
    }
}

//Función del botón restablecer
function restablecerFiltros (){
    const boton_restablecer = document.getElementById('restablecer'); //obtengo el id del botón
    boton_restablecer.addEventListener("click", ()=>{ //Si hace click
        renderizarProductos(lista_productos)
        bandera_filtro_marca = false; //Reinicie las banderas
        bandera_filtro_tipo = false;
        cambiarTextoBoton('Componente', 'tipo'); //Cambie el texto de los botones del filtro.
        cambiarTextoBoton('Marca', 'marca');
    })
}

//Función para mostrar en HTML el botón restablecer y darle funcionalidad
function mostrarBotonRestablecer(){
    div_btn_restablecer = document.getElementById('btn_restablecer'); //Obtengo el div donde estará el botón
    div_btn_restablecer.innerHTML = '<a id="restablecer" class="btn btn-secondary">Restablecer</a>' //Ingreso el botón
    restablecerFiltros(); //Le doy la funcionalidad
}



/**********************************Modo oscuro/claro********************** */
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
