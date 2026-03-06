import { DateTime } from 'luxon';

// Definir fecha objetivo
const targetDate = DateTime.fromISO('2026-12-31T23:59:59'); // 31/12/2026 a las 23:59:59

const actualizarCuenta = () => {
  // Obtener momento actual
  const now = DateTime.now();

  // Calcula diferencia en las unidades deseadas
  const diff = targetDate.diff(now, ['days', 'hours', 'minutes', 'seconds']);
  console.log(diff);

  // Verificar si llegamos a la fecha
  if (diff.as('milliseconds') <= 0) {
    console.log('Tiempo cumplido');
  }
};

// actualizarCuenta();

setInterval(actualizarCuenta, 1000);
