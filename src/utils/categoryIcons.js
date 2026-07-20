import { ListMusic, Star, Sparkles, HeartHandshake, Mic2, Users, Gift } from 'lucide-react';

// Mismo mapa de íconos por categoría del artefacto original.
// Si aparece una categoría nueva sin ícono propio, se usa ListMusic
// como ícono por defecto (ver su uso en Sidebar.jsx).
export const CATEGORY_ICONS = {
  Todos: ListMusic,
  Favoritos: Star,
  Adoración: Sparkles,
  Súplica: HeartHandshake,
  Testimonio: Mic2,
  Comunión: Users,
  Navidad: Gift,
};

export default CATEGORY_ICONS;
