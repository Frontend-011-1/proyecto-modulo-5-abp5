// 1. Crear clase Tarea
class Tarea {
  constructor(id, descripcion, estado, fechaCreacion) {
    this.id = id;
    this.descripcion = descripcion;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
  }

  cambiarEstado() {
    this.estado = !this.estado;
  }
}
