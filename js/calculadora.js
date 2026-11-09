const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const historial = document.getElementById("historial");
const botonBorrar = document.getElementById("borrar");

function mostrarError(campo, mensaje) {
  const error = document.getElementById("error-" + campo.id);
  error.textContent = mensaje;

  if (mensaje === "") {
    campo.removeAttribute("aria-invalid");
  } else {
    campo.setAttribute("aria-invalid", "true");
  }
}

function validarNota(campo) {
  if (campo.value === "") {
    mostrarError(campo, "Ingrese la nota.");
    return false;
  }

  const nota = Number(campo.value);

  if (nota < 0 || nota > 10) {
    mostrarError(campo, "La nota debe estar entre 0 y 10.");
    return false;
  }

  mostrarError(campo, "");
  return true;
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre");
  const materia = document.getElementById("materia");
  const notas = [
    document.getElementById("nota1"),
    document.getElementById("nota2"),
    document.getElementById("nota3")
  ];

  let valido = true;

  if (nombre.value.trim().length < 3) {
    mostrarError(nombre, "Escriba su nombre (mínimo 3 letras).");
    valido = false;
  } else {
    mostrarError(nombre, "");
  }

  if (materia.value === "") {
    mostrarError(materia, "Seleccione una materia.");
    valido = false;
  } else {
    mostrarError(materia, "");
  }

  for (const nota of notas) {
    if (!validarNota(nota)) {
      valido = false;
    }
  }

  if (!valido) {
    resultado.textContent = "Revise los campos marcados en el formulario.";
    resultado.className = "resultado reprobado";
    formulario.querySelector("[aria-invalid='true']").focus();
    return;
  }

  let suma = 0;
  for (const nota of notas) {
    suma = suma + Number(nota.value);
  }

  const promedio = suma / notas.length;
  let estado = "Reprobado";
  if (promedio >= 7) {
    estado = "Aprobado";
  }

  resultado.textContent = nombre.value.trim() + ", tu promedio en " + materia.value + " es " + promedio.toFixed(2) + ". Estado: " + estado + ".";
  resultado.className = "resultado " + estado.toLowerCase();

  const fila = historial.insertRow();
  fila.insertCell().textContent = nombre.value.trim();
  fila.insertCell().textContent = materia.value;
  fila.insertCell().textContent = promedio.toFixed(2);
  fila.insertCell().textContent = estado;

  formulario.reset();
  nombre.focus();
});

botonBorrar.addEventListener("click", function () {
  historial.innerHTML = "";
  resultado.textContent = "Aún no has calculado ningún promedio.";
  resultado.className = "resultado";
});
