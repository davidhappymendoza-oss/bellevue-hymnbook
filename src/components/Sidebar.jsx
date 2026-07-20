import React from 'react';
import { Moon, Sun, Minus, Plus, ListMusic, X } from 'lucide-react';
import CATEGORY_ICONS from '../utils/categoryIcons';

// El logo vive en /public/logo-bellevue.png. Los archivos de /public se
// sirven tal cual desde la raíz del sitio, por eso se referencia con una
// ruta absoluta de string (convención estándar de Vite) y no con un
// import de módulo.
const logoBellevue = '/logo-bellevue.png';

/**
 * Barra lateral izquierda (~18% en escritorio): logo, navegación por
 * categorías, interruptor de tema y control de tamaño de letra.
 *
 * En móvil (<768px), App.jsx solo monta este componente cuando el
 * usuario abre el menú, y aquí se muestra como panel superpuesto a
 * pantalla completa con un botón para cerrarlo (misma lógica y
 * contenido, solo cambia cómo se presenta en pantallas angostas).
 */
export default function Sidebar({
  navCategories,
  category,
  setCategory,
  favorites,
  dark,
  setDark,
  fontSize,
  setFontSize,
  isMobile,
  onClose,
}) {
  return (
    <div className="sidebar">
      {isMobile && (
        <div className="mobile-topbar">
          <span className="font-display" style={{ fontWeight: 700, fontSize: 15 }}>
            Categorías
          </span>
          <button className="menu-btn" onClick={onClose} aria-label="Cerrar menú">
            <X size={18} />
          </button>
        </div>
      )}
      <div className="brand-row">
        <div className="brand-mark">
          <img src={logoBellevue} alt="Bellevue Iglesia de Cristo" />
        </div>
      </div>

      <div className="nav-scroll">
        {navCategories.map((c) => {
          const Icon = CATEGORY_ICONS[c] || ListMusic;
          return (
            <button
              key={c}
              className={`cat-btn ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(c)}
            >
              <Icon size={17} />
              <span>{c === 'Todos' ? 'Todos los himnos' : c}</span>
              {c === 'Favoritos' && favorites.size > 0 ? (
                <span className="cat-count">{favorites.size}</span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-card">
          <div className="sidebar-row">
            <span className="sidebar-row-label">
              <Moon size={14} /> Tema
            </span>
            <button
              className={`theme-switch ${dark ? 'on' : ''}`}
              onClick={() => setDark((d) => !d)}
              aria-label="Alternar modo oscuro"
            >
              <span className="knob">{dark ? <Moon size={10} /> : <Sun size={10} />}</span>
            </button>
          </div>
          <div className="sidebar-row">
            <span className="sidebar-row-label">Tamaño de letra</span>
            <div className="stepper-inline">
              <button onClick={() => setFontSize((s) => Math.max(16, s - 2))}>
                <Minus size={12} />
              </button>
              <span>{Math.round((fontSize / 22) * 100)}%</span>
              <button onClick={() => setFontSize((s) => Math.min(40, s + 2))}>
                <Plus size={12} />
              </button>
            </div>
          </div>
        </div>
        <div className="sidebar-footer-text">
          © 2026 Iglesia de Cristo Bellevue
          <br />
          OTSV
        </div>
      </div>
    </div>
  );
}
