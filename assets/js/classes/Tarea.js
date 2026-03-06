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

export default Tarea;
