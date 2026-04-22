function mostrarDataHora() {
  const ara = new Date();

  const data = ara.toLocaleDateString("ca-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hora = ara.toLocaleTimeString("ca-ES");

  console.log(`Data: ${data}`);
  console.log(`Hora: ${hora}`);
}

mostrarDataHora();

module.exports = { mostrarDataHora };
