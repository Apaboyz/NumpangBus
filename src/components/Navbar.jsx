import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bus, Menu, X } from 'lucide-react';

// ============================================================
// Navbar — navigasi utama NumpangBus
// ============================================================

const navLinks = [
  { label: 'Beranda',      path: '/' },
  { label: 'Cari Tiket',   path: '/search' },
  { label: 'Pesanan Saya', path: '/my-orders' },
  { label: 'Tentang Kami', path: '/about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
            <div className="nav-logo-icon">
              <Bus size={20} color="#0C1446" />
            </div>
            <span className="nav-logo-text">
              Numpang<span style={{ color: '#F5B942' }}>Bus</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="nav-links">
            {navLinks.map((l) => (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className={`nav-link ${pathname === l.path ? 'active' : ''}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>



          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`mobile-nav ${open ? 'open' : ''}`}>
        {navLinks.map((l) => (
          <Link
            key={l.path}
            to={l.path}
            className={`mobile-nav-link ${pathname === l.path ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <div className="mobile-nav-actions">
          <div />
        </div>
      </div>
    </nav>
  );
}

