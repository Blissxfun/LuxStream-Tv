const data = JSON.parse(localStorage.getItem('pelicula_actual'));
if (!data) {
  document.body.innerHTML = "<p>Error al cargar la película</p>";
} else {
  document.getElementById("titulo").textContent = data.titulo;
  document.getElementById("descripcion").textContent = data.descripcion || "Sin descripción.";
  document.getElementById("actores").textContent = `Actores: ${data.actor || "Desconocidos"}`;
  const video = document.getElementById("video");
  video.src = data.url;
}

function activarPantallaCompleta() {
  const video = document.getElementById("video");

  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) { // Safari
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { // IE/Edge
    video.msRequestFullscreen();
  }
}
