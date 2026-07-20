/**
 * Persistencia de favoritos para la app ya desplegada en la web.
 *
 * NOTA IMPORTANTE PARA QUIEN CONTINÚE ESTE PROYECTO:
 * El artefacto original (dentro de Claude) guardaba los favoritos con
 * `window.storage.get/set`, una API que solo existe dentro del entorno
 * de artefactos de Claude.ai y que NO está disponible en un sitio real
 * publicado en Vercel/GitLab. Aquí se reemplaza por `localStorage`,
 * manteniendo exactamente el mismo comportamiento para la persona que
 * usa la app: sus favoritos se guardan en su propio navegador y siguen
 * ahí la próxima vez que abra la página. Se conserva la misma clave de
 * almacenamiento ('himnario-favoritos') y el mismo formato (arreglo de
 * ids en JSON) para que la lógica sea equivalente a la original.
 */

const FAVORITES_KEY = 'himnario-favoritos';

export function loadFavorites() {
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(arr);
  } catch (e) {
    // No hay favoritos guardados aún, o el valor guardado no es válido.
    return new Set();
  }
}

export function saveFavorites(favoritesSet) {
  try {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favoritesSet)));
  } catch (e) {
    console.error('No se pudo guardar favoritos', e);
  }
}
