import { Link } from 'react-router-dom';
import { Bus, Target, Users, Zap, Shield, Heart, ChevronRight, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ============================================================
// About — halaman tentang NumpangBus
// ============================================================

const teamValues = [
  {
    icon: <Shield size={24} color="#0C1446" />,
    bg: 'rgba(12,20,70,0.08)',
    title: 'Keamanan',
    desc: 'Transaksi aman dan data pengguna terlindungi dengan enkripsi terkini.',
  },
  {
    icon: <Zap size={24} color="#F5B942" />,
    bg: 'rgba(245,185,66,0.12)',
    title: 'Kecepatan',
    desc: 'Pesan tiket dalam hitungan menit tanpa antri dan tanpa repot.',
  },
  {
    icon: <Heart size={24} color="#dc2626" />,
    bg: 'rgba(220,38,38,0.08)',
    title: 'Kepuasan Pelanggan',
    desc: 'Layanan pelanggan 24/7 siap membantu setiap pertanyaan dan kendala.',
  },
  {
    icon: <Users size={24} color="#2563eb" />,
    bg: 'rgba(37,99,235,0.08)',
    title: 'Komunitas',
    desc: 'Membangun ekosistem transportasi yang lebih baik untuk semua lapisan masyarakat.',
  },
];

const steps = [
  { no: '01', title: 'Cari Bus', desc: 'Masukkan kota asal, tujuan, dan tanggal keberangkatan.' },
  { no: '02', title: 'Pilih Kursi', desc: 'Pilih kursi yang kamu inginkan secara interaktif.' },
  { no: '03', title: 'Isi Data', desc: 'Lengkapi data penumpang dengan informasi yang valid.' },
  { no: '04', title: 'Bayar', desc: 'Pilih metode pembayaran yang paling nyaman untukmu.' },
  { no: '05', title: 'Dapat E-Ticket', desc: 'E-tiket langsung dikirim dan siap ditunjukkan ke petugas.' },
];

const stats = [
  { value: '50+', label: 'Operator Bus Mitra' },
  { value: '200+', label: 'Rute Tersedia' },
  { value: '100rb+', label: 'Pengguna Aktif' },
  { value: '4.8★', label: 'Rating Aplikasi' },
];

export default function About() {
  return (
    <div className="page-wrapper">
      <Navbar />

      {/* ===== HERO ABOUT ===== */}
      <section style={{ background: 'linear-gradient(135deg, #0C1446 0%, #1a2567 100%)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(245,185,66,0.15)', color: '#F5B942',
              borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 600,
              marginBottom: 20,
            }}
          >
            <Bus size={14} /> Tentang NumpangBus
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 20 }}>
            Solusi Pemesanan Tiket Bus{' '}
            <span style={{ color: '#F5B942' }}>Modern & Terpercaya</span>
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8 }}>
            NumpangBus hadir untuk memudahkan perjalananmu. Kami menyediakan platform pemesanan tiket bus online yang cepat, mudah, dan terpercaya — kapan saja dan di mana saja.
          </p>
        </div>
      </section>

      {/* ===== STATISTIK ===== */}
      <section style={{ background: '#fff', padding: '48px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: 'center', padding: '20px 16px' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#0C1446', marginBottom: 6 }}>{s.value}</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VISI MISI ===== */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <span className="section-label">Tentang Kami</span>
              <h2 className="section-title" style={{ marginTop: 12 }}>
                Siapa NumpangBus?
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 20 }}>
                NumpangBus adalah platform digital pemesanan tiket bus yang didirikan dengan misi mempermudah mobilitas masyarakat Indonesia. Kami menghubungkan penumpang dengan ratusan operator bus terpercaya di seluruh Nusantara.
              </p>
              <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 24 }}>
                Dengan teknologi terkini, NumpangBus menghadirkan pengalaman pemesanan yang mulus — mulai dari pencarian, pemilihan kursi, pembayaran, hingga e-ticket digital yang praktis.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <div
                  style={{
                    background: 'rgba(12,20,70,0.07)', borderRadius: 10, padding: '12px 20px',
                    textAlign: 'center',
                  }}
                >
                  <Target size={20} color="#0C1446" style={{ margin: '0 auto 6px' }} />
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0C1446' }}>Visi</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                    Jadi platform bus #1 di Indonesia
                  </div>
                </div>
                <div
                  style={{
                    background: 'rgba(245,185,66,0.1)', borderRadius: 10, padding: '12px 20px',
                    textAlign: 'center',
                  }}
                >
                  <Star size={20} color="#F5B942" style={{ margin: '0 auto 6px' }} />
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0C1446' }}>Misi</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                    Perjalanan nyaman untuk semua
                  </div>
                </div>
              </div>
            </div>

            {/* Ilustrasi / visual */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0C1446, #1a2567)',
                borderRadius: 20, padding: 40, textAlign: 'center',
                aspectRatio: '4/3', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <div style={{ fontSize: 72, marginBottom: 16 }}>🚌</div>
              <div style={{ color: '#F5B942', fontSize: 20, fontWeight: 800 }}>NumpangBus</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 8 }}>
                Pesan. Berangkat. Sampai.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NILAI-NILAI ===== */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Nilai Kami</span>
            <h2 className="section-title">Yang Kami Junjung Tinggi</h2>
            <p className="section-subtitle">
              Empat nilai utama yang menjadi landasan layanan NumpangBus setiap harinya.
            </p>
          </div>
          <div className="features-grid">
            {teamValues.map((v) => (
              <div key={v.title} className="feature-card">
                <div className="feature-icon" style={{ background: v.bg }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0C1446', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CARA KERJA ===== */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Cara Kerja</span>
            <h2 className="section-title">Pesan Tiket dalam 5 Langkah</h2>
            <p className="section-subtitle">Proses pemesanan tiket di NumpangBus sangat sederhana dan cepat.</p>
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            {steps.map((s, i) => (
              <div
                key={s.no}
                style={{
                  flex: '1 1 160px', maxWidth: 200,
                  textAlign: 'center', position: 'relative',
                }}
              >
                <div
                  style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: '#0C1446', color: '#F5B942',
                    fontSize: 18, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  {s.no}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0C1446', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
                {i < steps.length - 1 && (
                  <div
                    style={{
                      position: 'absolute', right: -16, top: 20,
                      color: '#e5e7eb', display: 'flex',
                    }}
                  >
                    <ChevronRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ background: '#0C1446', padding: '64px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 12 }}>
            Siap Mencoba NumpangBus?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 32 }}>
            Pesan tiket bus pertamamu sekarang dan rasakan kemudahannya!
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

