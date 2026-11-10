import { Link } from 'react-router-dom';
import { Bus, MapPin, Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

// ============================================================
// Footer — bagian bawah setiap halaman
// ============================================================

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Kolom 1: Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ background: '#F5B942', borderRadius: 10, padding: '6px 10px', display: 'flex' }}>
                <Bus size={20} color="#0C1446" />
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>
                Numpang<span style={{ color: '#F5B942' }}>Bus</span>
              </span>
            </Link>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
              Platform pemesanan tiket bus online terpercaya. Pesan kapan saja, di mana saja, dengan mudah dan aman.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <button
                  key={i}
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none', color: '#fff', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F5B942'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h4 className="footer-title">Navigasi</h4>
            <ul className="footer-links">
              {[
                { label: 'Beranda', to: '/' },
                { label: 'Cari Tiket', to: '/search' },
                { label: 'Pesanan Saya', to: '/my-orders' },
                { label: 'Tentang Kami', to: '/about' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Layanan */}
          <div>
            <h4 className="footer-title">Layanan</h4>
            <ul className="footer-links">
              {['Pemesanan Tiket', 'Pilih Kursi', 'E-Ticket', 'Riwayat Pesanan', 'Batalkan Pesanan'].map((s) => (
                <li key={s}>
                  <span className="footer-link" style={{ cursor: 'default' }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h4 className="footer-title">Kontak Kami</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { Icon: MapPin, text: 'Jl. Sudirman No. 123, Jakarta Pusat' },
                { Icon: Phone, text: '+62 812-3456-7890' },
                { Icon: Mail, text: 'cs@numpangbus.id' },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Icon size={16} color="#F5B942" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 14 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>© 2024 NumpangBus. Hak cipta dilindungi.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <span className="footer-link" style={{ cursor: 'default' }}>Kebijakan Privasi</span>
            <span className="footer-link" style={{ cursor: 'default' }}>Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

