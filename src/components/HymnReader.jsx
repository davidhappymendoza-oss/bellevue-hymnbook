import React from 'react';
import { Star, Share2, Check, BookOpen, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import logoIcon from '../assets/logo-himnario-icon.png';

/**
 * Panel derecho (~58%), siempre visible: el lector de himnos.
 * Misma lógica y estructura visual del artefacto original.
 */
export default function HymnReader({
  allHymns,
  selected,
  filtered,
  favorites,
  toggleFavorite,
  shareHymn,
  copied,
  fontSize,
  setFontSize,
  goToAdjacent,
  isMobile,
  onBack,
}) {
  return (
    <div className="reader-panel">
      {isMobile && selected && (
        <div className="mobile-topbar">
          <button className="back-btn" onClick={onBack}>
            ← Atrás
          </button>
        </div>
      )}
      {copied && (
        <div className="toast">
          <Check size={14} /> Letra copiada
        </div>
      )}
      {!selected && (
        <div className="reader-empty">
          <div className="reader-empty-icon">
            <BookOpen size={30} />
          </div>
          <div>
            <div
              className="font-display"
              style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}
            >
              {allHymns.length === 0 ? 'Aún no se han importado himnos.' : 'Selecciona un himno'}
            </div>
            <div style={{ fontSize: 13.5 }}>
              {allHymns.length === 0
                ? 'Cuando se importen, aparecerán aquí listos para leer.'
                : 'Elige un himno de la lista para comenzar a leer.'}
            </div>
          </div>
        </div>
      )}
      {selected && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="reader-header">
            <div className="header-icon-slot">
              <img src={logoIcon} alt="" />
            </div>
            <div className="header-number">
              <div className="badge" style={{ width: 44, height: 44, borderRadius: 15, fontSize: 15 }}>
                {selected.number}
              </div>
            </div>
            <div className="header-title-zone">
              <div className="header-title-text">{selected.title}</div>
              <span className="tag-pill">{selected.category}</span>
            </div>
            <div className="header-actions-zone">
              <button
                className={`star-btn labeled ${favorites.has(selected.id) ? 'fav' : ''}`}
                onClick={(e) => toggleFavorite(selected.id, e)}
              >
                <Star size={16} fill={favorites.has(selected.id) ? 'currentColor' : 'none'} /> Favorito
              </button>
              <button className="star-btn labeled" onClick={() => shareHymn(selected)}>
                <Share2 size={16} /> Compartir
              </button>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '48px 56px 120px 56px' }}>
            <div className="lyrics-body">
              {selected.lyrics.map((block, i) => (
                <div key={i} className={`lyrics-verse ${block.type === 'coro' ? 'coro' : ''}`}>
                  <div className="verse-label">{block.type === 'coro' ? 'Coro' : `Estrofa ${i + 1}`}</div>
                  <div style={{ fontSize: fontSize, lineHeight: 1.85, color: 'var(--text-primary)' }}>
                    {block.lines.map((line, j) => (
                      <div key={j} className="line">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reader-footer">
            <div className="reader-footer-zone start">
              <button
                className="reader-footer-btn"
                disabled={filtered.findIndex((h) => h.id === selected.id) <= 0}
                onClick={() => goToAdjacent(-1)}
              >
                <ChevronLeft size={15} /> Anterior
              </button>
            </div>
            <div className="reader-footer-zone center">
              <div className="reader-footer-step">
                <button
                  className="reader-footer-btn"
                  style={{ padding: '9px 10px' }}
                  onClick={() => setFontSize((s) => Math.max(16, s - 2))}
                >
                  <Minus size={14} />
                </button>
                <span
                  style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 700, width: 40, textAlign: 'center' }}
                >
                  {Math.round((fontSize / 22) * 100)}%
                </span>
                <button
                  className="reader-footer-btn"
                  style={{ padding: '9px 10px' }}
                  onClick={() => setFontSize((s) => Math.min(40, s + 2))}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <div className="reader-footer-zone end">
              <button
                className="reader-footer-btn"
                disabled={filtered.findIndex((h) => h.id === selected.id) >= filtered.length - 1}
                onClick={() => goToAdjacent(1)}
              >
                Siguiente <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
