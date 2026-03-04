const formularioTarea = document.getElementById('formulario-tarea');
const listaTareas = document.getElementById('lista-tareas');

// 1. Crear clase Tarea
class Tarea {
  constructor(id, descripcion, estado, fechaCreacion, fechaLimite) {
    this.id = id; // numero o string
    this.descripcion = descripcion; // string
    this.estado = estado; // booleano
    this.fechaCreacion = fechaCreacion; // string
    this.fechaLimite = fechaLimite;
  }

  cambiarEstado() {
    this.estado = !this.estado;
  }
}

// 2. Crear clase GestorTareas
class GestorTareas {
  #tareas = []; // propiedad privada! No es accesible fuera de la clase

  agregarTarea(tarea) {
    this.#tareas.push(tarea);
  }
  eliminarTarea(id) {
    // Todo: Validar que id exista
    let tareaEncontrada = this.#buscarTarea(id);
    if (!tareaEncontrada) {
      console.log('Tarea no encontrada');
      return;
    }
    // Filtrar un array: solo dejará los elementos cuyo id sea distinto al id pasado como argumento
    this.#tareas = this.#tareas.filter((tarea) => tarea.id !== id);
  }

  #buscarTarea(id) {
    return this.#tareas.find((tarea) => tarea.id === id);
  }
  cambiarEstado(id) {
    let tareaEncontrada = this.#buscarTarea(id);
    if (!tareaEncontrada) {
      console.log('Tarea no encontrada');
      return;
    }
    // Si es que encontró la tarea...↓
    tareaEncontrada.cambiarEstado();
  }
  listarTareas() {
    return this.#tareas;
  }
}

const gestorTareas = new GestorTareas();

const insertAlert = (className, message) => {
  const alert = `
  <div class="alert alert-${className} alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `;
  document.getElementById('alert-container').innerHTML = alert;
};

// Contador regresivo
const contadorRegresivo = (fechaLimite) => {
  const fechaActual = new Date().getTime();
  const diferencia = fechaLimite - fechaActual; // diferencia en milisegundos

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  return `${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
};

// Funcion para renderizar lista de tareas
const renderizarTareas = () => {
  listaTareas.innerHTML = '';
  const arrayTareas = gestorTareas.listarTareas();
  arrayTareas.forEach((tarea) => {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center',
    );

    // SPAN para cuenta regresiva
    const span = document.createElement('span');
    // dataset -> data-id data-label data-cualquierCosa
    span.dataset.id = tarea.id;
    span.classList.add('date-countdown', 'small', 'text-muted');
    span.textContent = contadorRegresivo(tarea.fechaLimite);

    const { descripcion, estado } = tarea;
    li.textContent = `${descripcion} - ${estado ? 'Completada' : 'Pendiente'}`;

    // Botones para eliminar tarea y cambiar estado
    const buttonEliminar = document.createElement('button');
    buttonEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
    buttonEliminar.textContent = 'Eliminar';
    buttonEliminar.dataset.id = tarea.id;

    const buttonEstado = document.createElement('button');
    buttonEstado.classList.add('btn', 'btn-success', 'btn-sm');
    buttonEstado.textContent = 'Cambiar estado';
    buttonEstado.dataset.id = tarea.id;

    li.appendChild(span);
    li.appendChild(buttonEliminar);
    li.appendChild(buttonEstado);
    listaTareas.appendChild(li);
  });
};

renderizarTareas(); // Para la primera carga de tareas

// Actualizar el contador regresivo de cada tarea cada 1 segundo
setInterval(() => {
  // Capturamos los <span> donde va cada cuenta regresiva
  const cuentaRegresiva = document.querySelectorAll('.date-countdown');
  cuentaRegresiva.forEach((span) => {
    // Extraer id del span (es el mismo de la tarea)
    const id = Number(span.dataset.id);
    // Encontrar a la tarea correspondiente
    const tarea = gestorTareas.listarTareas().find((tarea) => tarea.id === id);
    if (tarea) {
      // Actualizar el temporizador de la respectiva tarea
      span.textContent = contadorRegresivo(tarea.fechaLimite);
    }
  });
}, 1000);

formularioTarea.addEventListener('submit', (event) => {
  event.preventDefault();

  // Insertar un alert
  insertAlert('warning', 'Agregando tarea, por favor espere...');
  // Simular un retardo al agregar tarea
  setTimeout(() => {
    const descripcion = document.getElementById('descripcion').value;
    const fechaLimite = document.getElementById('fecha-limite').value;

    const tiempoLimite = fechaLimite
      ? new Date(fechaLimite).getTime() // para dejar fecha como timestamp (milisegundos)
      : undefined;

    const nuevaTarea = new Tarea(
      Date.now(),
      descripcion,
      false,
      new Date().toLocaleDateString('es-CL'),
      tiempoLimite,
    );
    gestorTareas.agregarTarea(nuevaTarea);
    renderizarTareas();
    event.target.reset();
    insertAlert('success', 'Tarea agregada correctamente');
  }, 1000);
});

// Event Listener para delegación de eventos (clicks en eliminar y cambiar estado)
listaTareas.addEventListener('click', (event) => {
  // Escuchar evento click en boton Eliminar. Apuntamos al boton que tenga clase btn-danger
  if (event.target.classList.contains('btn-danger')) {
    const id = Number(event.target.dataset.id);
    gestorTareas.eliminarTarea(id);
    renderizarTareas();
  }
  // Escuchar evento click en boton Cambiar estado
  if (event.target.classList.contains('btn-success')) {
    const id = Number(event.target.dataset.id);
    gestorTareas.cambiarEstado(id);
    renderizarTareas();
  }
});
