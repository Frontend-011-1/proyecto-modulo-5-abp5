// 1. Crear clase Tarea
class Tarea {
  constructor(id, descripcion, estado, fechaCreacion) {
    this.id = id; // numero o string
    this.descripcion = descripcion; // string
    this.estado = estado; // booleano
    this.fechaCreacion = fechaCreacion; // string
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

    // Opción 2: ocupar splice
    // const foundIndex = this.#tareas.findIndex((tarea) => tarea.id === id); // si es que no existe devuelve -1
    // this.#tareas.splice(foundIndex, 1)
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
gestorTareas.agregarTarea(new Tarea(1, 'Tarea 1', true, new Date()));
gestorTareas.agregarTarea(new Tarea(2, 'Tarea 2', false, new Date()));

// Mostrar todas las tareas
console.log(gestorTareas.listarTareas());

// Cambiar el estado de una tarea
gestorTareas.cambiarEstado(1);
console.log(gestorTareas.listarTareas());

// Eliminar una tarea
gestorTareas.eliminarTarea(1);
console.log('Despues de eliminar tarea con id 1');
console.log(gestorTareas.listarTareas());

// Modificar tarea que no existe
gestorTareas.cambiarEstado(56);
