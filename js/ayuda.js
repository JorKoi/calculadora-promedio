const preguntas = document.querySelectorAll(".pregunta");

for (const pregunta of preguntas) {
  const respuesta = document.getElementById(pregunta.getAttribute("aria-controls"));

  pregunta.setAttribute("aria-expanded", "false");
  respuesta.hidden = true;

  pregunta.addEventListener("click", function () {
    const abierta = pregunta.getAttribute("aria-expanded") === "true";

    if (abierta) {
      pregunta.setAttribute("aria-expanded", "false");
      respuesta.hidden = true;
    } else {
      pregunta.setAttribute("aria-expanded", "true");
      respuesta.hidden = false;
    }
  });
}
