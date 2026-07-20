import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import HymnList from './components/HymnList';
import HymnReader from './components/HymnReader';
import { getAllHymns, getNavCategories } from './utils/hymnService';
import { loadFavorites, saveFavorites } from './utils/favoritesStorage';
import './styles/himnario.css';

/**
 * Componente raíz de la aplicación del himnario.
 *
 * Conserva exactamente la misma lógica del artefacto original de Claude:
 * búsqueda, categorías, favoritos, tema claro/oscuro, tamaño de letra,
 * navegación entre himnos y "compartir" (copiar letra al portapapeles).
 *
 * Único cambio necesario para funcionar como sitio real (no como
 * artefacto embebido): los favoritos se guardan con localStorage en
 * vez de la API window.storage, exclusiva del entorno de Claude.ai
 * (ver src/utils/favoritesStorage.js para el detalle).
 */
export default function Himnario() {
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const [favorites, setFavorites] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const [fontSize, setFontSize] = useState(22);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    try {
      const stored = loadFavorites();
      if (mounted) setFavorites(stored);
    } finally {
      if (mounted) setLoaded(true);
    }
    return () => {
      mounted = false;
    };
  }, []);

  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveFavorites(next);
      return next;
    });
  };

  const allHymns = getAllHymns();
  const navCategories = useMemo(() => getNavCategories(allHymns), [allHymns]);

  const filtered = useMemo(() => {
    let list = allHymns;
    if (category === 'Favoritos') list = list.filter((h) => favorites.has(h.id));
    else if (category !== 'Todos') list = list.filter((h) => h.category === category);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((h) => h.title.toLowerCase().includes(q) || String(h.number).includes(q));
    }
    return list;
  }, [search, category, favorites]);

  const shareHymn = async (h) => {
    const text = `${h.number}. ${h.title}\n\n` + h.lyrics.map((b) => b.lines.join('\n')).join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      console.error('No se pudo copiar', e);
    }
  };

  const goToAdjacent = (dir) => {
    if (!selected) return;
    const idx = filtered.findIndex((h) => h.id === selected.id);
    if (idx === -1) return;
    const nextIdx = idx + dir;
    if (nextIdx >= 0 && nextIdx < filtered.length) setSelected(filtered[nextIdx]);
  };

  const theme = dark ? 'theme-dark' : 'theme-light';

  return (
    <div className={theme} style={{ minHeight: '100vh', height: '100%' }}>
      <div className="himnario-root">
        <Sidebar
          navCategories={navCategories}
          category={category}
          setCategory={setCategory}
          favorites={favorites}
          dark={dark}
          setDark={setDark}
          fontSize={fontSize}
          setFontSize={setFontSize}
          sidebarOpen={sidebarOpen}
        />
        <HymnList
          search={search}
          setSearch={setSearch}
          category={category}
          allHymns={allHymns}
          filtered={filtered}
          selected={selected}
          setSelected={setSelected}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
        <HymnReader
          allHymns={allHymns}
          selected={selected}
          filtered={filtered}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          shareHymn={shareHymn}
          copied={copied}
          fontSize={fontSize}
          setFontSize={setFontSize}
          goToAdjacent={goToAdjacent}
        />
      </div>
    </div>
  );
}
