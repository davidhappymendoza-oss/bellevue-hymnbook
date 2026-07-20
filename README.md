# Himnario Bellevue

Aplicación web del himnario de Bellevue Iglesia de Cristo (letras únicamente,
sin acordes). Construida con React + Vite, lista para ejecutarse localmente
y desplegarse en Vercel.

## Requisitos

- Node.js 18 o superior
- npm (o pnpm/yarn si prefieres)

## Desarrollo local

```bash
npm install
npm run dev
```

Esto levanta un servidor local (por defecto en `http://localhost:5173`) con
recarga en caliente.

## Compilar para producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para publicar en cualquier hosting estático.
Para previsualizar ese build localmente:

```bash
npm run preview
```

## Estructura del proyecto

```
himnario-app/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── logo-bellevue.png       # logo mostrado en la barra lateral
└── src/
    ├── main.jsx                 # punto de entrada de React
    ├── App.jsx                  # orquestador: estado y lógica de la app
    ├── assets/
    │   └── logo-himnario-icon.png
    ├── components/
    │   ├── Sidebar.jsx          # barra lateral: logo, categorías, tema, tamaño de letra
    │   ├── HymnList.jsx         # panel central: búsqueda y lista de himnos
    │   └── HymnReader.jsx       # panel derecho: lector de himnos
    ├── data/
    │   └── hymnsDatabase.json   # los 87 registros de himnos (1–82, con variantes)
    ├── utils/
    │   ├── hymnService.js       # capa de acceso a datos (getAllHymns, findHymnByNumber, getNavCategories)
    │   ├── categoryIcons.js     # mapa de íconos por categoría
    │   └── favoritesStorage.js  # persistencia de favoritos en localStorage
    └── styles/
        ├── himnario.css         # todo el estilo visual de la app (idéntico al original)
        └── global.css           # reset mínimo de página (html/body/#root a pantalla completa)
```

Esta organización separa claramente **datos**, **lógica/utilidades**,
**componentes de interfaz** y **estilos**, tal como en la guía del proyecto
original.

## Continuidad del himnario

`src/data/hymnsDatabase.json` contiene la misma base de datos que
`himnario-datos.json` del Proyecto de Claude. Para importar nuevos lotes de
himnos en el futuro, se agrega el nuevo registro (o se actualiza uno
existente por `number`, nunca duplicado) directamente en ese archivo JSON;
no hace falta tocar ningún componente.

## Nota sobre favoritos

El artefacto original (dentro de Claude.ai) guardaba los favoritos con una
API exclusiva del entorno de artefactos (`window.storage`). Como esta app ya
es un sitio independiente, esa misma función se resolvió con
`localStorage` del navegador (ver `src/utils/favoritesStorage.js`): el
comportamiento para quien usa la app es idéntico — sus favoritos quedan
guardados en su propio navegador entre visitas.

## Despliegue en Vercel (desde GitLab)

1. Sube este proyecto a un repositorio de GitLab.
2. En Vercel: **Add New Project** → conecta tu cuenta de GitLab → selecciona
   el repositorio.
3. Vercel detecta automáticamente que es un proyecto Vite. Configuración por
   defecto (ya es la correcta):
   - **Build Command:** `npm run build` (o `vite build`)
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Despliega. Cada nuevo push a la rama principal generará un nuevo
   despliegue automáticamente.

No se requiere ninguna variable de entorno para que la app funcione.

## Responsividad

El diseño de tres paneles (barra lateral, lista, lector) se conserva tal
cual del artefacto original y ya incluye anchos mínimos y proporcionales
pensados para computadoras y tabletas. En pantallas angostas (celulares) la
barra lateral se oculta según el ancho de ventana, igual que en el
artefacto original — este comportamiento no fue modificado, solo
trasladado tal cual.

## Sobre una futura PWA

El proyecto ya está organizado de una forma compatible con convertirlo en
PWA más adelante (estructura estándar de Vite con `public/` e
`index.html` separados, un único punto de entrada en `src/main.jsx`). A
propósito **no** se agregó todavía manifest.json ni service worker, tal
como se pidió: la funcionalidad actual de la app no cambia. Cuando se
quiera dar ese paso, los cambios se limitarían a:

- Agregar `public/manifest.webmanifest` y sus íconos.
- Enlazar el manifest en `index.html`.
- Registrar un service worker (por ejemplo con el plugin oficial
  `vite-plugin-pwa`) en `src/main.jsx`.
