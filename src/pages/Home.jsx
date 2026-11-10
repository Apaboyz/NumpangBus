import { Link } from 'react-router-dom';
import { Bus, Shield, Tag, Ticket, ArrowRight, Star, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchForm from '../components/SearchForm';
import BusCard from '../components/BusCard';
import { busesData } from '../data/buses';

// ============================================================
// Home — halaman beranda NumpangBus
// ============================================================

// Kartu fitur keunggulan
const features = [
  {
    icon: <Tag size={24} color="#F5B942" />,
    bg: 'rgba(245,185,66,0.12)',
    title: 'Harga Transparan',
    desc: 'Tidak ada biaya tersembunyi. Harga yang kamu lihat adalah harga yang kamu bayar.',
  },
  {
    icon: <Bus size={24} color="#0C1446" />,
    bg: 'rgba(12,20,70,0.08)',
    title: 'Banyak Pilihan Bus',
    desc: 'Tersedia puluhan operator bus terpercaya dengan berbagai kelas dan rute.',
  },
  {
    icon: <Shield size={24} color="#16a34a" />,
    bg: 'rgba(22,163,74,0.1)',
    title: 'Pemesanan Mudah',
    desc: 'Pesan tiket hanya dalam beberapa langkah mudah, kapan saja dan di mana saja.',
  },
  {
    icon: <Ticket size={24} color="#2563eb" />,
    bg: 'rgba(37,99,235,0.1)',
    title: 'Tiket Elektronik',
    desc: 'Simpan e-tiket di smartphone, tidak perlu cetak. Praktis dan ramah lingkungan.',
  },
];

export default function Home() {
  // Ambil 6 bus rekomendasi
  const recommended = busesData.slice(0, 6);

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Star size={13} fill="#F5B942" /> Platform Tiket Bus #1 di Indonesia
            </div>
            <h1 className="hero-title">
              Perjalanan Nyaman,<br />
              Pesan Tiket <span>Lebih Mudah!</span>
            </h1>
            <p className="hero-subtitle">
              Temukan tiket bus terbaik untuk perjalananmu. Pesan kapan saja dan di mana saja bersama NumpangBus — cepat, mudah, dan terpercaya.
            </p>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {[
              { value: '50+', label: 'Operator Bus' },
              { value: '200+', label: 'Rute Tersedia' },
              { value: '100rb+', label: 'Penumpang Happy' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div className="hero-stat-value">{s.value}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEARCH FORM ===== */}
      <div className="container">
        <div className="search-card">
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0C1446', marginBottom: 20 }}>
            🔍 Cari Tiket Bus
          </h2>
          <SearchForm />
        </div>
      </div>

      {/* ===== KEUNGGULAN ===== */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Kenapa NumpangBus?</span>
            <h2 className="section-title">Keunggulan Layanan Kami</h2>
            <p className="section-subtitle">
              Kami hadir untuk memudahkan perjalananmu dengan layanan yang terpercaya, mudah, dan terjangkau.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon" style={{ background: f.bg }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0C1446', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REKOMENDASI BUS ===== */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Populer</span>
            <h2 className="section-title">Rekomendasi Bus</h2>
            <p className="section-subtitle">
              Bus-bus terpopuler yang banyak dipilih penumpang dengan rating dan fasilitas terbaik.
            </p>
          </div>

          <div className="bus-cards-grid">
            {recommended.map((bus) => (
              <BusCard key={bus.id} bus={bus} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/search" className="btn btn-primary">
              Lihat Semua Bus <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section style={{ background: '#0C1446', padding: '64px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 12 }}>
            Siap Memulai Perjalananmu?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 32 }}>
            Pesan tiket bus sekarang dan nikmati perjalanan yang nyaman bersama NumpangBus.
          </p>
          <Link to="/search" className="btn btn-accent btn-lg">
            Pesan Tiket Sekarang <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

