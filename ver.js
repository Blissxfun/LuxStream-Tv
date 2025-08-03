const dataJSON = localStorage.getItem('pelicula_actual');
let data;

try {
  data = JSON.parse(dataJSON);
} catch {
  data = null;
}

if (!data) {
  // Mostrar mensaje de error más visible
  document.body.innerHTML = `<main style="padding:2rem; color:#f00; font-size:1.5rem; text-align:center;">
    <p>Error al cargar la información de la película.</p>
    <p><a href="index.html" style="color:#06f; text-decoration:underline;">Volver al inicio</a></p>
  </main>`;
} else {
  // Función para actualizar texto (o limpiar si no hay texto)
  function setText(id, texto) {
    const el = document.getElementById(id);
    if (!el) return;
    if (texto == null || texto === "") {
      el.textContent = ""; // limpiar texto
    } else {
      el.textContent = texto;
    }
  }

  setText("titulo", data.titulo ?? "Título no disponible");
  setText("descripcion", data.descripcion ?? "Sin descripción.");
  setText("elenco", data.actor ?? "Desconocidos");
  setText("director", data.director ?? "Desconocido");
  setText("anio", data.año ?? "Desconocido");
  setText("categoria", data.categoria ?? "Desconocida");
  setText("duracion", data.duracion ?? "Desconocida");
  setText("clasificacion", data.clasificacion ?? "Desconocida");

  // Para idioma, si tienes algún contenedor o puedes crear uno, o lo puedes poner en metadata o en otro lugar
  // Si tienes un span con id="idioma" por ejemplo:
  setText("idioma", data.idioma ?? "Desconocido");

  // Imagen de portada
  const portada = document.getElementById("portada");
  if (portada) {
    portada.src = data.imagen ?? "https://via.placeholder.com/300x450?text=Sin+imagen";
    portada.alt = data.titulo ?? "Portada de película";
  }

  // Si tienes un video en el HTML con id="video"
  const video = document.getElementById("video");
  if (video) {
    if (data.url) {
      video.src = data.url;
    } else {
      video.removeAttribute("src");
    }
  }
}

// Función para pantalla completa
function activarPantallaCompleta() {
  const video = document.getElementById("video");
  if (!video) return;

  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  } else {
    alert("Tu navegador no soporta pantalla completa.");
  }
}
