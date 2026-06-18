var botonSeleccionar = document.getElementById('botonSeleccionar');
var infoCarpeta = document.getElementById('infoCarpeta');
var nombreCarpeta = document.getElementById('nombreCarpeta');
var botonLimpiar = document.getElementById('botonLimpiar');
var zonaToast = document.getElementById('zonaToast');

(function inicializarI18n() {
  document.title = chrome.i18n.getMessage('tituloOpciones');
  document.querySelector('#infoMarca h1').textContent = chrome.i18n.getMessage('nombreExtension');
  document.getElementById('subtituloPagina').textContent = chrome.i18n.getMessage('subtituloOpciones');
  document.querySelector('#cabeceraSeccion h3').textContent = chrome.i18n.getMessage('seccionCarpeta');
  document.getElementById('descripcionCarpeta').textContent = chrome.i18n.getMessage('descripcionCarpeta');
  document.querySelector('#botonSeleccionar span').textContent = chrome.i18n.getMessage('botonSeleccionar');
  document.getElementById('etiquetaCarpeta').textContent = chrome.i18n.getMessage('etiquetaCarpetaActual');
  botonLimpiar.setAttribute('aria-label', chrome.i18n.getMessage('botonQuitarCarpeta'));
  document.getElementById('textoCopyright').textContent = chrome.i18n.getMessage('pieCopyright');
  document.querySelector('#textoApoyo span').textContent = chrome.i18n.getMessage('pieTextoApoyo');
})();

function mostrarToast(texto, tipo) {
  tipo = tipo || 'exito';
  var toast = document.createElement('div');
  toast.className = 'toast toast-' + tipo;
  toast.textContent = texto;
  zonaToast.appendChild(toast);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      toast.classList.add('toast-visible');
    });
  });

  setTimeout(function () {
    toast.classList.remove('toast-visible');
    setTimeout(function () {
      toast.remove();
    }, 250);
  }, 3000);
}

async function actualizarInfoCarpeta() {
  var respuesta = await chrome.runtime.sendMessage({ accion: 'verificarDirectorio' });
  if (respuesta.tieneCarpeta) {
    nombreCarpeta.textContent = respuesta.nombre;
    infoCarpeta.classList.remove('oculto');
  } else {
    infoCarpeta.classList.add('oculto');
  }
}

botonSeleccionar.addEventListener('click', async function () {
  try {
    var manejador = await window.showDirectoryPicker({ mode: 'readwrite' });
    await guardarDirectorio(manejador);
    await chrome.runtime.sendMessage({ accion: 'establecerDirectorio' });
    await actualizarInfoCarpeta();
    mostrarToast(chrome.i18n.getMessage('mensajeCarpetaSeleccionada', manejador.name), 'exito');
  } catch (error) {
    if (error.name !== 'AbortError' && error.name !== 'SecurityError') {
      mostrarToast(chrome.i18n.getMessage('errorSeleccionCarpeta', error.message), 'error');
    }
  }
});

botonLimpiar.addEventListener('click', async function () {
  await chrome.runtime.sendMessage({ accion: 'limpiarDirectorio' });
  await actualizarInfoCarpeta();
  mostrarToast(chrome.i18n.getMessage('mensajeCarpetaEliminada'), 'info');
});

actualizarInfoCarpeta();
