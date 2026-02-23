// Uso de Objeto Date
const date = new Date();
const [month, day, year, hours, minutes, seconds] = [
  date.getMonth(),
  date.getDate(),
  date.getFullYear(),
  date.getHours(),
  date.getMinutes(),
  date.getSeconds(),
];
// Enero es el mes 0
console.log(`${day}/${month + 1}/${year} - ${hours}:${minutes}:${seconds}`);

// Encontrar fecha y hora en formato local
console.log(new Date().toLocaleString('es-CL'));
console.log(new Date().toLocaleString('en-US'));
console.log(new Date().toLocaleString('en-UK'));
