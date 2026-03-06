import Tarea from './Tarea.js';

// 2. Crear clase GestorTareas
class GestorTareas {
  // #tareas = []; // propiedad privada! No es accesible fuera de la clase
  constructor() {
    this.tareas =
      JSON.parse(localStorage.getItem('tareas'))?.map(
        (tarea) =>
          new Tarea(
            tarea.id,
            tarea.descripcion,
            tarea.estado,
            tarea.fechaCreacion,
            tarea.fechaLimite,
          ),
      ) || [];
  }

  agregarTarea(tarea) {
    this.tareas.push(tarea);
    this.#guardarTareas();
  }
  eliminarTarea(id) {
    // Todo: Validar que id exista
    let tareaEncontrada = this.#buscarTarea(id);
    if (!tareaEncontrada) {
      console.log('Tarea no encontrada');
      return;
    }
    // Filtrar un array: solo dejará los elementos cuyo id sea distinto al id pasado como argumento
    this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
    this.#guardarTareas();
  }

  #buscarTarea(id) {
    return this.tareas.find((tarea) => tarea.id === id);
  }
  cambiarEstado(id) {
    let tareaEncontrada = this.#buscarTarea(id);
    if (!tareaEncontrada) {
      console.log('Tarea no encontrada');
      return;
    }
    // Si es que encontró la tarea...↓
    tareaEncontrada.cambiarEstado();
    this.#guardarTareas();
  }
  listarTareas() {
    return this.tareas;
  }

  #guardarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  };
}

export default GestorTareas;
