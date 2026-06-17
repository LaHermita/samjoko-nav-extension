<p align="center">
  <picture>
    <img alt="Samjoko Nav" src="icons/icono-128.png" width="96" height="96">
  </picture>
</p>

<h1 align="center">Samjoko Nav Extension</h1>

<p align="center">
  <strong lang="es">Companion de navegador del Vivero. Captura páginas web, conviértelas a Markdown y llévalas a tu bóveda de conocimiento.</strong>
  <br>
  <em lang="en">Browser companion for Vivero. Capture web pages, convert them to Markdown, and bring them into your knowledge vault.</em>
</p>

<p align="center">
  <img alt="Manifest V3" src="https://img.shields.io/badge/Manifest-V3-4a90d9?style=flat-square&logo=googlechrome&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES2022-f7df1e?style=flat-square&logo=javascript&logoColor=black">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML-5-e34f26?style=flat-square&logo=html5&logoColor=white">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS-Themes-1572b6?style=flat-square&logo=css3&logoColor=white">
  <img alt="IndexedDB" src="https://img.shields.io/badge/Storage-IndexedDB-7a9b5f?style=flat-square&logo=databricks&logoColor=white">
  <img alt="Licencia" src="https://img.shields.io/badge/Licencia-MIT-8c8986?style=flat-square">
  <img alt="Versión" src="https://img.shields.io/badge/Versión-0.1.0-d47a2c?style=flat-square">
</p>

---

## Acerca del proyecto / About

**Samjoko Nav Extension** es el companion de navegador de la aplicación del **Vivero**. Te permite capturar el contenido de cualquier página web, convertirlo a Markdown limpio y guardarlo directamente en tu cámara o bóveda de conocimiento del Vivero. Forma parte del ecosistema Samjoko, asistiéndote como un cuervo recolector que lleva lo valioso de la web a tu espacio de conocimiento personal.

> *Samjoko Nav Extension is the browser companion for the **Vivero** application. It lets you capture any web page's content, convert it to clean Markdown, and save it directly into your Vivero knowledge chamber or vault. It's part of the Samjoko ecosystem — a raven collector that carries what's valuable from the web into your personal knowledge space.*

---

## Características / Features

| Característica | Feature |
|---|---|
| Extrae el contenido principal de la página como Markdown | Extracts main page content as Markdown |
| Copia al portapapeles con un clic | One-click copy to clipboard |
| Descarga como archivo `.md` | Download as `.md` file |
| Guarda directamente en una carpeta local (File System Access API) | Save directly to a local folder (File System Access API) |
| 4 temas visuales intercambiables | 4 interchangeable visual themes |
| Persistencia con IndexedDB | IndexedDB persistence |
| Página de opciones integrada | Built-in options page |
| Sin dependencias externas | No external dependencies |

---

## Temas / Themes

| Tema | Modo | `data-theme` |
|---|---|---|
| Samjoko | Oscuro (cuervo) | `samjoko` |
| Vivero | Claro natural | `vivero` |
| Nautilus | Cálido | `nautilus` |
| Akkoro | Cyberpunk | `akkoro` |

El tema por defecto es **Samjoko**. Para cambiar de tema, modificá el atributo `data-theme` en el `<html>` o persistí la preferencia con `chrome.storage`.

---

## Instalación / Installation

### Para usuarios / For users

1. Descargá la extensión desde la [Chrome Web Store](#) *(próximamente)*.
2. Hacé clic en el icono de Samjoko en la barra de herramientas.
3. Navegá a cualquier página y capturala.

### Para desarrollo / For development

```bash
# Clonar el repositorio
git clone https://github.com/usuario/samjoko-nav-extension.git

# Cargar en Chrome
# 1. Abrí chrome://extensions
# 2. Activá «Modo desarrollador»
# 3. Clic en «Cargar descomprimida»
# 4. Seleccioná la carpeta del proyecto
```

---

## Arquitectura / Architecture

```
samjoko-nav-extension/
├── manifest.json              # Chrome Extension Manifest V3
├── assets/
│   └── themes.css             # Variables CSS de los 4 temas
├── ventana-emergente/         # Popup (browser action)
│   ├── ventana.html
│   ├── ventana.css
│   └── ventana.js
├── opciones/                  # Página de opciones
│   ├── opciones.html
│   ├── opciones.css
│   └── opciones.js
├── icons/                     # Iconos de la extensión
├── trabajador-fondo.js        # Service worker
├── extractor-contenido.js     # Content script
└── base-datos.js              # IndexedDB helper
```

---

## Permisos / Permissions

| Permiso | Motivo |
|---|---|
| `activeTab` | Acceder al contenido de la pestaña activa al hacer clic |
| `scripting` | Inyectar el extractor de contenido en la página |
| `storage` | Guardar preferencias de usuario |

La extensión **no recolecta, almacena ni transmite datos personales**. Todo el procesamiento ocurre localmente en tu navegador.

---

## Tecnologías / Technologies

| Tecnología | Uso |
|---|---|
| **Chrome Extension Manifest V3** | Estructura de la extensión |
| **JavaScript** (ES2022) | Lógica de extracción, UI y base de datos |
| **HTML5 / CSS3** | Interfaces del popup y opciones |
| **CSS Custom Properties** | Sistema de 4 temas intercambiables |
| **IndexedDB** | Persistencia de configuraciones |
| **File System Access API** | Escritura directa de archivos en disco |

---

## Privacidad / Privacy

Samjoko Nav Extension:

- No envía datos a servidores externos.
- No utiliza servicios de terceros.
- No recolecta telemetría ni analíticas.
- Todo el código se ejecuta localmente en el navegador del usuario.
- Los permisos solicitados son los mínimos necesarios para su funcionamiento.

---

## Licencia / License

MIT © Samjoko
