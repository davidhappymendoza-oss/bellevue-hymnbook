import React from 'react';
import { Search, Star, BookOpen } from 'lucide-react';

/**
 * Panel central (~24%): barra de búsqueda y lista de himnos filtrados.
 * Misma lógica y estructura visual del artefacto original.
 */
export default function HymnList({
  search,
  setSearch,
  category,
  allHymns,
  filtered,
  selected,
  setSelected,
  favorites,
  toggleFavorite,
}) {
  return (
    <div className="center-panel">
      <div className="search-wrap">
        <Search
          size={15}
          style={{ position: 'absolute', left: 14, top: 13.5, color: 'var(--text-secondary)' }}
        />
        <input
          className="search-input"
          placeholder="Buscar himnos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="list-header">
        <h2
          className="font-display"
          style={{ fontSize: 16, margin: 0, fontWeight: 700, color: 'var(--text-primary)' }}
        >
          {category === 'Todos' ? 'Todos los himnos' : category}
        </h2>
        <span className="list-count">{filtered.length} himnos</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 20px 16px' }}>
        {allHymns.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: 60, padding: '0 20px' }}>
            <div className="reader-empty-icon" style={{ margin: '0 auto 16px auto' }}>
              <BookOpen size={26} />
            </div>
            <div
              className="font-display"
              style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}
            >
              Aún no se han importado himnos.
            </div>
            <div style={{ fontSize: 13 }}>Envía una fotografía del himnario para comenzar a incorporarlos.</div>
          </div>
        )}
        {allHymns.length > 0 && filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: 60, fontSize: 14 }}>
            No hay himnos que coincidan con tu búsqueda.
          </div>
        )}
        {filtered.map((h) => (
          <div
            key={h.id}
            className={`hymn-row ${selected && selected.id === h.id ? 'active' : ''}`}
            onClick={() => setSelected(h)}
          >
            <div className="badge">{h.number}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 15.5,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {h.title}
              </div>
              <span className="tag-pill">{h.category}</span>
            </div>
            <button
              className={`star-btn ${favorites.has(h.id) ? 'fav' : ''}`}
              onClick={(e) => toggleFavorite(h.id, e)}
            >
              <Star size={16} fill={favorites.has(h.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
