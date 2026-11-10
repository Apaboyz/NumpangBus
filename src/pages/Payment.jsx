import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Landmark, Wallet, QrCode, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useBooking } from '../context/BookingContext';
import { rupiah } from '../data/buses';

// ============================================================
// Payment — halaman pemilihan metode & simulasi pembayaran
// ============================================================

const STEPS = ['Pilih Kursi', 'Data Penumpang', 'Pembayaran', 'E-Ticket'];

function Stepper({ current }) {
  return (
    <div className="stepper">
      {STEPS.map((label, i) => {
        const done = i < current, active = i === current;
        return (
          <div key={label} className="step-item">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={`step-circle ${done ? 'done' : active ? 'active' : 'idle'}`}>
                {done ? '✓' : i + 1}
              </div>
              <span className={`step-label ${done ? 'done' : active ? 'active' : 'idle'}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`step-line ${done ? 'done' : ''}`} />}
          </div>
        );
      })}
    </div>
  );
}

const paymentMethods = [
  {
    id: 'transfer',
    label: 'Transfer Bank',
    desc: 'BCA, Mandiri, BNI, BRI',
    icon: <Landmark size={22} color="#0C1446" />,
  },
  {
    id: 'va',
    label: 'Virtual Account',
    desc: 'Bayar lewat ATM atau m-banking',
    icon: <CreditCard size={22} color="#0C1446" />,
  },
  {
    id: 'ewallet',
    label: 'E-Wallet',
    desc: 'GoPay, OVO, Dana, ShopeePay',
    icon: <Wallet size={22} color="#0C1446" />,
  },
  {
    id: 'qris',
    label: 'QRIS',
    desc: 'Scan QR dengan aplikasi apapun',
    icon: <QrCode size={22} color="#0C1446" />,
  },
];

export default function Payment() {
  const navigate = useNavigate();
  const { booking, selectPayment, completeOrder } = useBooking();
  const [method, setMethod]     = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  if (!booking.bus || !booking.passenger) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <AlertCircle size={48} color="#dc2626" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ marginBottom: 8 }}>Data pemesanan tidak lengkap</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Silakan mulai proses pemesanan dari awal.</p>
          <button className="btn btn-primary" onClick={() => navigate('/search')}>Cari Tiket</button>
        </div>
        <Footer />
      </div>
    );
  }

  const { bus, seats, passenger, totalPrice, bookingCode } = booking;

  // Simulasi pembayaran: tunggu 2 detik lalu arahkan ke e-ticket
  const handlePay = () => {
    if (!method) { setError('Pilih metode pembayaran terlebih dahulu.'); return; }
    setError('');
    setLoading(true);
    selectPayment(method);
    setTimeout(() => {
      completeOrder();
      navigate('/eticket');
    }, 2000);
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div style={{ background: '#0C1446', padding: '32px 0' }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Pembayaran</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Pilih metode pembayaran dan selesaikan pemesanan.</p>
        </div>
      </div>

      <div className="page-content" style={{ padding: '32px 0 80px' }}>
        <div className="container">
          <Stepper current={2} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>

            {/* ===== METODE PEMBAYARAN ===== */}
            <div>
              <div className="card" style={{ padding: 28, marginBottom: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0C1446', marginBottom: 20 }}>
                  Pilih Metode Pembayaran
                </h2>

                <div className="payment-methods">
                  {paymentMethods.map((pm) => (
                    <label
                      key={pm.id}
                      className={`payment-option ${method === pm.id ? 'selected' : ''}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={pm.id}
                        checked={method === pm.id}
                        onChange={() => { setMethod(pm.id); setError(''); }}
                        style={{ display: 'none' }}
                      />
                      <div
                        style={{
                          width: 44, height: 44, borderRadius: 10,
                          background: method === pm.id ? 'rgba(12,20,70,0.08)' : 'var(--bg)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}
                      >
                        {pm.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{pm.label}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{pm.desc}</div>
                      </div>
                      {method === pm.id && (
                        <CheckCircle size={20} color="#16a34a" />
                      )}
                    </label>
                  ))}
                </div>

                {error && (
                  <div className="alert alert-danger" style={{ marginTop: 16 }}>
                    <AlertCircle size={16} /> {error}
                  </div>
                )}
              </div>

              {/* Info simulasi */}
              <div
                style={{
                  background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)',
                  borderRadius: 12, padding: 16, display: 'flex', gap: 10, alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: 20 }}>ℹ️</span>
                <p style={{ fontSize: 13, color: '#1d4ed8', lineHeight: 1.6 }}>
                  <strong>Simulasi Pembayaran:</strong> Ini adalah demo tanpa transaksi nyata.
                  Klik "Bayar Sekarang" untuk melanjutkan ke e-ticket simulasi.
                </p>
              </div>
            </div>

            {/* ===== RINGKASAN PEMBAYARAN ===== */}
            <aside style={{ position: 'sticky', top: 88 }}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0C1446', marginBottom: 20 }}>
                  Detail Pemesanan
                </h3>

                {/* Kode booking */}
                <div
                  style={{
                    background: 'rgba(12,20,70,0.05)', borderRadius: 10, padding: '12px 14px',
                    marginBottom: 16, textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>Kode Booking</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#0C1446', letterSpacing: 2 }}>
                    {bookingCode}
                  </div>
                </div>

                {[
                  { label: 'Bus',       value: bus.name },
                  { label: 'Rute',      value: `${bus.from} → ${bus.to}` },
                  { label: 'Tgl Berangkat', value: 'Hari ini' },
                  { label: 'Jam',       value: `${bus.departureTime} WIB` },
                  { label: 'Penumpang', value: passenger.name },
                  { label: 'Kursi',     value: seats.join(', ') },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 10 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                    <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{value}</span>
                  </div>
                ))}

                <hr className="divider" />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Harga × {seats.length}</span>
                  <span>{rupiah(bus.price)} / kursi</span>
                </div>

                <div
                  style={{
                    background: '#0C1446', borderRadius: 10, padding: '14px 16px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: 20,
                  }}
                >
                  <span style={{ fontWeight: 700, color: '#fff' }}>Total Bayar</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: '#F5B942' }}>{rupiah(totalPrice)}</span>
                </div>

                <button
                  className="btn btn-accent btn-full btn-lg"
                  onClick={handlePay}
                  disabled={loading}
                  style={{ position: 'relative' }}
                >
                  {loading ? (
                    <>
                      <span style={{ marginRight: 8 }}>⏳</span>
                      Memproses Pembayaran...
                    </>
                  ) : (
                    <>
                      Bayar Sekarang <ChevronRight size={18} />
                    </>
                  )}
                </button>

                {loading && (
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center', marginTop: 10 }}>
                    Mohon tunggu, sistem sedang memproses...
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

