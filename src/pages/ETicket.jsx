import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Home, Bus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useBooking } from '../context/BookingContext';
import { rupiah } from '../data/buses';

// ============================================================
// ETicket — tampilan tiket elektronik setelah pembayaran
// ============================================================

export default function ETicket() {
  const navigate  = useNavigate();
  const { booking, resetBooking } = useBooking();

  // Jika tidak ada data booking, redirect ke beranda
  useEffect(() => {
    if (!booking.bus || !booking.passenger) {
      navigate('/');
    }
  }, [booking, navigate]);

  if (!booking.bus || !booking.passenger) return null;

  const { bus, seats, passenger, totalPrice, bookingCode, paymentMethod } = booking;

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  // URL QR code simulasi (pakai API publik)
  const qrData = encodeURIComponent(`NUMPANGBUS-${bookingCode}-${passenger.name}`);
  const qrUrl  = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrData}`;

  const handlePrint = () => window.print();

  const handleHome = () => {
    resetBooking();
    navigate('/');
  };

  const paymentLabels = {
    transfer: 'Transfer Bank',
    va: 'Virtual Account',
    ewallet: 'E-Wallet',
    qris: 'QRIS',
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div style={{ background: '#0C1446', padding: '32px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <CheckCircle size={48} color="#F5B942" style={{ margin: '0 auto 12px' }} />
          <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
            Pembayaran Berhasil! 🎉
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15 }}>
            E-tiket kamu telah diterbitkan. Selamat menikmati perjalanan!
          </p>
        </div>
      </div>

      <div className="page-content" style={{ padding: '40px 0 80px' }}>
        <div className="container">

          {/* ===== E-TICKET CARD ===== */}
          <div className="ticket-card" id="eticket-print">

            {/* Header tiket */}
            <div className="ticket-header">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ background: '#F5B942', borderRadius: 8, padding: '5px 8px', display: 'flex' }}>
                    <Bus size={18} color="#0C1446" />
                  </div>
                  <span style={{ fontSize: 20, fontWeight: 800 }}>
                    Numpang<span style={{ color: '#F5B942' }}>Bus</span>
                  </span>
                </div>
                <span
                  style={{
                    background: '#F5B942', color: '#0C1446', borderRadius: 20,
                    padding: '4px 14px', fontSize: 13, fontWeight: 700,
                  }}
                >
                  ✓ LUNAS
                </span>
              </div>

              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>Kode Booking</div>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 3 }}>{bookingCode}</div>
              </div>
            </div>

            {/* Rute utama */}
            <div className="ticket-body">
              <div className="ticket-route" style={{ marginBottom: 24 }}>
                <div style={{ textAlign: 'center' }}>
                  <div className="ticket-city">{bus.from}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#0C1446' }}>{bus.departureTime}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{bus.departureTerminal}</div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 8px' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{bus.duration}</span>
                  <div className="ticket-dashed" />
                  <span style={{ fontSize: 20 }}>🚌</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div className="ticket-city">{bus.to}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#0C1446' }}>{bus.arrivalTime}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{bus.arrivalTerminal}</div>
                </div>
              </div>

              {/* Garis perforasi */}
              <div className="ticket-perforation">
                <div className="ticket-perforation-line" />
              </div>

              {/* Detail tiket */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '24px 0' }}>
                {[
                  { label: 'Penumpang', value: passenger.name },
                  { label: 'No. Telepon', value: passenger.phone },
                  { label: 'Operator', value: bus.operator },
                  { label: 'Jenis Bus', value: bus.type },
                  { label: 'Tanggal', value: today },
                  { label: 'Metode Bayar', value: paymentLabels[paymentMethod] || paymentMethod },
                  { label: 'Nomor Kursi', value: seats.join(', ') },
                  { label: 'Status', value: '✓ Dikonfirmasi' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {label}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0C1446' }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Total & QR */}
              <div
                style={{
                  background: 'var(--bg)', borderRadius: 12, padding: '16px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Total Pembayaran</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#0C1446' }}>{rupiah(totalPrice)}</div>
                </div>
                {/* QR Code */}
                <img
                  src={qrUrl}
                  alt="QR Code Tiket"
                  width={80}
                  height={80}
                  style={{ borderRadius: 8 }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  style={{
                    display: 'none', width: 80, height: 80, background: '#0C1446',
                    borderRadius: 8, color: '#F5B942', fontSize: 10, fontWeight: 700,
                    textAlign: 'center', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  QR CODE
                </div>
              </div>

              <p style={{ fontSize: 11, color: 'var(--text-secondary)', textAlign: 'center', marginTop: 12 }}>
                Tunjukkan kode booking atau QR code ini kepada petugas bus. Simpan tiket ini dengan baik.
              </p>
            </div>
          </div>

          {/* ===== TOMBOL AKSI ===== */}
          <div
            style={{
              display: 'flex', gap: 12, justifyContent: 'center',
              marginTop: 32, flexWrap: 'wrap',
            }}
          >
            <button className="btn btn-primary" onClick={handleHome}>
              <Home size={16} /> Kembali ke Beranda
            </button>
          </div>

          {/* Link ke riwayat pesanan */}
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Link
              to="/my-orders"
              style={{ fontSize: 14, color: '#0C1446', fontWeight: 600, textDecoration: 'underline' }}
            >
              Lihat semua pesanan saya →
            </Link>
          </div>
        </div>
      </div>

      <Footer />

      {/* CSS khusus untuk print */}
      <style>{`
        @media print {
          .navbar, .footer, button, a[href] { display: none !important; }
          #eticket-print { box-shadow: none !important; max-width: 100% !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}

