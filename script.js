let peliculas = [];

const videoPlayer = document.getElementById("videoPlayer");
const listaPeliculas = document.getElementById("listaPeliculas");
const listaCategorias = document.getElementById("listaCategorias");
const listaContinuar = document.getElementById("listaContinuar");
const reproductor = document.getElementById("reproductor");
const buscador = document.getElementById("buscador");

let peliculaActual = null;

fetch('https://raw.githubusercontent.com/Blissxfun/LuxStream/main/peliculas.json')
  .then(res => res.json())
  .then(data => {
    peliculas = data;
    mostrarPeliculas(peliculas);
    mostrarCategorias();
    cargarContinuarViendo();
  })
  .catch(err => console.error("Error al cargar las películas:", err));

// Mostrar todas las películas
function mostrarPeliculas(lista) {
  listaPeliculas.innerHTML = "";

  lista.forEach(p => {
    const card = document.createElement("div");
    card.className = "pelicula";
    card.title = p.titulo;
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.titulo}">
      <p>${p.titulo}</p>
    `;
    card.onclick = () => reproducirPelicula(p);
    listaPeliculas.appendChild(card);
  });
}

// Mostrar categorías
function mostrarCategorias() {
  const categorias = [...new Set(peliculas.map(p => p.categoria).filter(Boolean))];
  listaCategorias.innerHTML = "";

  categorias.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.onclick = () => {
      const filtradas = peliculas.filter(p => p.categoria === cat);
      mostrarPeliculas(filtradas);
    };
    listaCategorias.appendChild(btn);
  });
}

// Reproducir película
function reproducirPelicula(pelicula) {
  localStorage.setItem('pelicula_actual', JSON.stringify(pelicula));
  window.location.href = 'ver.html';
}

// Guardar progreso con tiempo
function guardarProgreso() {
  if (!peliculaActual) return;

  let continuar = JSON.parse(localStorage.getItem("continuar")) || [];

  continuar = continuar.filter(p => p.titulo !== peliculaActual.titulo);

  continuar.unshift({
    ...peliculaActual,
    tiempo: videoPlayer.currentTime
  });

  if (continuar.length > 10) continuar = continuar.slice(0, 10);

  localStorage.setItem("continuar", JSON.stringify(continuar));
  cargarContinuarViendo();
}

// Cargar sección "Continuar viendo"
function cargarContinuarViendo() {
  const continuar = JSON.parse(localStorage.getItem("continuar")) || [];
  listaContinuar.innerHTML = "";

  continuar.forEach(p => {
    const card = document.createElement("div");
    card.className = "pelicula";
    card.title = p.titulo;
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.titulo}">
      <p>${p.titulo}</p>
    `;
    card.onclick = () => reproducirPelicula(p);
    listaContinuar.appendChild(card);
  });
}

// Cerrar reproductor
function cerrarReproductor() {
  guardarProgreso();
  videoPlayer.pause();
  videoPlayer.src = "";
  reproductor.classList.add("oculto");
}

// Guardar tiempo al pausar también
videoPlayer.addEventListener("pause", guardarProgreso);

// Buscador
buscador.addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();

  const filtradas = peliculas.filter(p =>
    p.titulo.toLowerCase().includes(texto) ||
    (p.actor && p.actor.toLowerCase().includes(texto))
  );

  mostrarPeliculas(filtradas);
});