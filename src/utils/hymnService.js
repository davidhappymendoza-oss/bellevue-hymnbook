/**
 * ------------------------------------------------------------
 *  CAPA DE ACCESO A DATOS
 * ------------------------------------------------------------
 * La interfaz nunca toca HYMNS_DATABASE directamente: siempre
 * pasa por estas funciones. Esto permite que en el futuro el
 * origen de los datos cambie (archivos separados, una base de
 * datos remota, una API, etc.) sin tener que tocar los
 * componentes de UI.
 *
 * Misma lógica que en el artefacto original de Claude, solo que
 * ahora vive en su propio módulo dentro de src/utils.
 */
import HYMNS_DATABASE from '../data/hymnsDatabase.json';

export function getAllHymns() {
  return HYMNS_DATABASE;
}

export function findHymnByNumber(number) {
  return HYMNS_DATABASE.find((h) => h.number === number) || null;
}

// Catálogo curado de categorías conocidas. Cualquier categoría nueva
// que aparezca en un himno real y no esté aquí se agrega sola al menú
// (ver getNavCategories), sin necesidad de tocar este código.
export const CATEGORY_CATALOG = ['Adoración', 'Súplica', 'Testimonio', 'Comunión', 'Navidad'];

export function getNavCategories(hymns) {
  const fromData = Array.from(new Set(hymns.map((h) => h.category).filter(Boolean)));
  const merged = Array.from(new Set([...CATEGORY_CATALOG, ...fromData]));
  return ['Todos', 'Favoritos', ...merged];
}

export default HYMNS_DATABASE;
