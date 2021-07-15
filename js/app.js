/* VARIABLES */
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// Almacena todos los EventListeners que vayamos a tener en nuestro archivo js. Por un tema de orden, para que
// no queden en el scope global.
cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vacía el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

/* FUNCIONES */

// Agrega un curso al carrito
function agregarCurso(e) {
    // Al no contar con una dirección real, el enlace "#" nos lleva a la parte superior de la página, por lo 
    // que con preventDefault() evitamos ese comportamiento.
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    };

}

// Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo según su data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id != cursoId)
    };

    carritoHTML();
}

// Hace traversing y extrae la información del curso
function leerDatosCurso(curso) {
    

    // Objeto con la información del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if (existe) {
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        } );
        articulosCarrito = [...cursos];
    } else {
        // Agrega elementos al array de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    carritoHTML();
}

// Muestra los elementos en el carrito del HTML
function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();

    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>
            ${curso.titulo}
        </td>
        <td>
            ${curso.precio}
        </td>
        <td>
            ${curso.cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X
        </td>
        `;
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del tbody
function limpiarHTML() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}