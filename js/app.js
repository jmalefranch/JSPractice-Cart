//Variables
const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //Cargar al carrito cuando se clickea en "Agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);

  //elimina curso del carrito
  carrito.addEventListener("click", eliminarCurso);

  //vacia el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    console.log("estamos adentro de vaciar carrito");
    articulosCarrito = []; //reseteo el arreglo
    limpiarHTML();
  });
}

//Funciones

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

//Elimina curso del carrito
function eliminarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //elimina del arreglo de articulosCarrito el curso elegido por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    console.log(articulosCarrito);
    carritoHTML(); //itera sobre el carrito y muestra su HTML otra vez
  }
}

//lee el contenido del HTML que elegimos
function leerDatosCurso(cursoSeleccionado) {
  const infoCurso = {
    imagen: cursoSeleccionado.querySelector("img").getAttribute("src"),
    nombre: cursoSeleccionado.querySelector("h4").textContent,
    precio: cursoSeleccionado.querySelector(".precio span").textContent,
    id: cursoSeleccionado
      .querySelector(".agregar-carrito")
      .getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si el curso ya estaba agregado para modificar su cantidad en carrito
  const cursoYaExiste = articulosCarrito.some(
    (curso) => curso.id === infoCurso.id
  );
  if (cursoYaExiste) {
    //Actualizamos la cantidad en carrito
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retorna el objeto ya existente, actualizado
      } else {
        return curso; //retorna los cursos elegidos que no estaban en el carrito antes
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //Agregamos el nuevo curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
}
//Muestra el carrito en el html
function carritoHTML() {
  //limpiar el HTML
  limpiarHTML();

  //recorre carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, nombre, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${imagen}" width=200/>              
      </td>
      <td>
        ${nombre}        
      </td>
      <td>
        ${precio}       
      </td>
       <td>
        ${cantidad}       
      </td>
      <td>
        <a href="" class="borrar-curso" data-id=${id}>X</a>
      </td>
    `;
    contenedorCarrito.appendChild(row);
  });
}

//Elimina los cursos del tbody
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
