importScripts('base-datos.js');

let manejadorDirectorio = null;
let promesaInicializacion;

function inicializar() {
  promesaInicializacion = cargarDirectorio().catch(() => {});
}

async function cargarDirectorio() {
  try {
    manejadorDirectorio = await obtenerDirectorio();
  } catch {
    manejadorDirectorio = null;
  }
}

async function guardarArchivoEnCarpeta(contenido, nombreArchivo) {
  if (!manejadorDirectorio) {
    throw new Error(chrome.i18n.getMessage('errorSWCarpetaNoConfigurada'));
  }

  const tienePermiso = await verificarPermiso(manejadorDirectorio);
  if (!tienePermiso) {
    manejadorDirectorio = null;
    throw new Error(chrome.i18n.getMessage('errorSWPermisoDenegado'));
  }

  const nombreUnico = await obtenerNombreArchivoUnico(manejadorDirectorio, nombreArchivo);
  const archivoHandle = await manejadorDirectorio.getFileHandle(nombreUnico, { create: true });
  const writable = await archivoHandle.createWritable();
  await writable.write(contenido);
  await writable.close();

  return nombreUnico;
}

chrome.runtime.onInstalled.addListener((detalles) => {
  if (detalles.reason === 'install') {
    console.log('Samjoko Nav Extension instalada');
  }
});

chrome.runtime.onMessage.addListener((mensaje, remitente, responder) => {
  if (mensaje.accion === 'establecerDirectorio') {
    (async () => {
      await cargarDirectorio();
      responder({
        tieneCarpeta: !!manejadorDirectorio,
        nombre: manejadorDirectorio?.name || ''
      });
    })();
    return true;
  }

  if (mensaje.accion === 'limpiarDirectorio') {
    (async () => {
      manejadorDirectorio = null;
      await guardarDirectorio(null);
      responder({ tieneCarpeta: false, nombre: '' });
    })();
    return true;
  }

  if (mensaje.accion === 'verificarDirectorio') {
    (async () => {
      await promesaInicializacion;
      responder({
        tieneCarpeta: !!manejadorDirectorio,
        nombre: manejadorDirectorio?.name || ''
      });
    })();
    return true;
  }

  if (mensaje.accion === 'guardarArchivo') {
    (async () => {
      try {
        const nombreGuardado = await guardarArchivoEnCarpeta(
          mensaje.contenido,
          mensaje.nombreArchivo
        );
        responder({ exito: true, nombreArchivo: nombreGuardado });
      } catch (error) {
        if (!manejadorDirectorio) {
          responder({ error: 'carpeta-no-configurada', mensaje: error.message });
        } else {
          responder({ error: 'fallo-guardado', mensaje: error.message });
        }
      }
    })();
    return true;
  }
});

inicializar();
