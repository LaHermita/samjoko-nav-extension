const botonSeleccionar = document.getElementById('botonSeleccionar');
const infoCarpeta = document.getElementById('infoCarpeta');
const nombreCarpeta = document.getElementById('nombreCarpeta');
const botonLimpiar = document.getElementById('botonLimpiar');
const mensajeEstado = document.getElementById('mensajeEstado');

(function inicializarI18n() {
  document.title = chrome.i18n.getMessage('tituloOpciones');
  document.querySelector('h1').textContent = chrome.i18n.getMessage('tituloOpciones');
  document.querySelector('h2').textContent = chrome.i18n.getMessage('seccionCarpeta');
  document.querySelector('#seccionCarpeta > p').textContent = chrome.i18n.getMessage('descripcionCarpeta');
  botonSeleccionar.textContent = chrome.i18n.getMessage('botonSeleccionar');
  document.querySelector('#infoCarpeta strong').textContent = chrome.i18n.getMessage('etiquetaCarpetaActual');
  botonLimpiar.textContent = chrome.i18n.getMessage('botonQuitarCarpeta');
})();

function mostrarMensaje(texto, esError = false) {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = esError ? 'mensaje-error' : 'mensaje-exito';
}

async function actualizarInfoCarpeta() {
  const respuesta = await chrome.runtime.sendMessage({ accion: 'verificarDirectorio' });
  if (respuesta.tieneCarpeta) {
    nombreCarpeta.textContent = respuesta.nombre;
    infoCarpeta.classList.remove('oculto');
  } else {
    infoCarpeta.classList.add('oculto');
  }
}

botonSeleccionar.addEventListener('click', async () => {
  try {
    const manejador = await window.showDirectoryPicker({ mode: 'readwrite' });
    await guardarDirectorio(manejador);
    await chrome.runtime.sendMessage({ accion: 'establecerDirectorio' });
    await actualizarInfoCarpeta();
    mostrarMensaje(chrome.i18n.getMessage('mensajeCarpetaSeleccionada', manejador.name));
  } catch (error) {
    if (error.name !== 'AbortError' && error.name !== 'SecurityError') {
      mostrarMensaje(chrome.i18n.getMessage('errorSeleccionCarpeta', error.message), true);
    }
  }
});

botonLimpiar.addEventListener('click', async () => {
  await chrome.runtime.sendMessage({ accion: 'limpiarDirectorio' });
  await actualizarInfoCarpeta();
  mostrarMensaje(chrome.i18n.getMessage('mensajeCarpetaEliminada'));
});

actualizarInfoCarpeta();
