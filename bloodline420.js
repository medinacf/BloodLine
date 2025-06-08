(function pedirClave() {
  const claveCorrecta = "BloodLine4/20#";
  let clave = prompt("Introduce la clave de acceso:");
  while (clave !== claveCorrecta) {
    alert("Clave incorrecta. Inténtalo de nuevo.");
    clave = prompt("Introduce la clave de acceso:");
  }
})();

emailjs.init("uO8lYn24FmBrGLCCN"); // clave pública

const form = document.getElementById("pedidoForm");
const producto = document.getElementById("producto");
const unidades = document.getElementById("unidades");
const detallesLabel = document.getElementById("detallesLabel");
const snusAdvertencia = document.getElementById("snusAdvertencia");
const intensidadAdvertencia = document.getElementById("intensidadAdvertencia");
const submitBtn = document.getElementById("submitBtn");

producto.addEventListener("change", () => {
  if (producto.value === "snus") {
    detallesLabel.textContent = "Snus: intensidad, sabor, etc.";
  } else if (producto.value === "vaper") {
    detallesLabel.textContent = "Vaper: caladas, sabor, etc.";
  } else {
    detallesLabel.textContent = "Cigarro: marca";
  }
});

unidades.addEventListener("input", () => {
  if (producto.value === "snus" && unidades.value > 4) {
    snusAdvertencia.style.display = "block";
    submitBtn.disabled = true;
  } else {
    snusAdvertencia.style.display = "none";
    submitBtn.disabled = false;
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    nombre: form.nombre.value,
    apellido: form.apellido.value,
    producto: form.producto.value,
    unidades: form.unidades.value,
    detalles: form.detalles.value,
  };

  if (data.producto === "snus" && /intensidad\s*[:\-]?\s*(\d+)/i.test(data.detalles)) {
    const intensidad = parseInt(data.detalles.match(/intensidad\s*[:\-]?\s*(\d+)/i)[1]);
    if (intensidad > 3) {
      intensidadAdvertencia.style.display = "block";
      return;
    }
  }

  intensidadAdvertencia.style.display = "none";

  emailjs.send("Bloodline_420", "Buy_ID-Bloodline420", data)
    .then(() => alert("Pedido enviado correctamente."))
    .catch((error) => alert("Error al enviar el pedido: " + error));
});
