import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, CreditCard, ChevronRight, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useBooking } from '../context/BookingContext';
import { rupiah } from '../data/buses';

// ============================================================
// PassengerData — form data penumpang
// ============================================================

// Langkah-langkah pemesanan (stepper)
const STEPS = ['Pilih Kursi', 'Data Penumpang', 'Pembayaran', 'E-Ticket'];

function Stepper({ current }) {
  return (
    <div className="stepper">
      {STEPS.map((label, i) => {
        const done   = i < current;
        const active = i === current;
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

export default function PassengerData() {
  const navigate = useNavigate();
  const { booking, savePassenger } = useBooking();

  const [form, setForm] = useState({
    name: '', phone: '', email: '', idNumber: '',
  });
  const [errors, setErrors] = useState({});

  // Redirect jika tidak ada bus / kursi dipilih
  if (!booking.bus || booking.seats.length === 0) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <AlertCircle size={48} color="#dc2626" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ marginBottom: 8 }}>Belum ada pemesanan aktif</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Silakan pilih bus dan kursi terlebih dahulu.</p>
          <button className="btn btn-primary" onClick={() => navigate('/search')}>Cari Tiket</button>
        </div>
        <Footer />
      </div>
    );
  }

  const { bus, seats, totalPrice } = booking;

  const set = (field, val) => {
    setForm((p) => ({ ...p, [field]: val }));
    setErrors((p) => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Nama lengkap wajib diisi';
    if (!form.phone.trim()) e.phone = 'Nomor telepon wajib diisi';
    else if (!/^[0-9+\-\s]{9,15}$/.test(form.phone)) e.phone = 'Format nomor tidak valid';
    if (!form.email.trim()) e.email = 'Email wajib diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Format email tidak valid';
    return e;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    savePassenger(form);
    navigate('/payment');
  };

  const inputField = (label, field, type = 'text', placeholder = '', required = true, icon) => (
    <div className="form-group">
      <label className="form-label">
        {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }}>
            {icon}
          </span>
        )}
        <input
          type={type}
          className={`form-control ${errors[field] ? 'error' : ''}`}
          style={{ paddingLeft: icon ? 42 : 16 }}
          placeholder={placeholder}
          value={form[field]}
          onChange={(e) => set(field, e.target.value)}
        />
      </div>
      {errors[field] && <span className="form-error">{errors[field]}</span>}
    </div>
  );

  return (
    <div className="page-wrapper">
      <Navbar />

      <div style={{ background: '#0C1446', padding: '32px 0' }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Data Penumpang</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Isi data penumpang dengan benar sesuai identitas resmi.</p>
        </div>
      </div>

      <div className="page-content" style={{ padding: '32px 0 80px' }}>
        <div className="container">
          <Stepper current={1} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>

            {/* ===== FORM DATA PENUMPANG ===== */}
            <form onSubmit={handleNext}>
              <div className="card" style={{ padding: 28 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0C1446', marginBottom: 24 }}>
                  Informasi Penumpang
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {inputField('Nama Lengkap', 'name', 'text', 'Sesuai KTP/paspor', true, <User size={16} />)}
                  {inputField('Nomor Telepon', 'phone', 'tel', '081234567890', true, <Phone size={16} />)}
                  {inputField('Email', 'email', 'email', 'email@contoh.com', true, <Mail size={16} />)}
                  {inputField('Nomor Identitas (KTP/Paspor)', 'idNumber', 'text', 'Opsional', false, <CreditCard size={16} />)}
                </div>

                {/* Nomor kursi (read-only) */}
                <div className="form-group" style={{ marginTop: 20 }}>
                  <label className="form-label">Nomor Kursi Dipilih</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {seats.map((s) => (
                      <span
                        key={s}
                        style={{
                          background: '#0C1446', color: '#fff',
                          borderRadius: 8, padding: '8px 16px',
                          fontSize: 15, fontWeight: 700,
                        }}
                      >
                        Kursi {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
                    Kembali
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Lanjut ke Pembayaran <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </form>

            {/* ===== RINGKASAN PEMESANAN ===== */}
            <aside style={{ position: 'sticky', top: 88 }}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0C1446', marginBottom: 20 }}>Ringkasan Pesanan</h3>

                <div
                  style={{
                    background: 'var(--bg)', borderRadius: 10, padding: 14, marginBottom: 16,
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 40, height: 40, borderRadius: 8,
                      background: '#0C1446', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <span style={{ color: '#F5B942', fontSize: 18 }}>🚌</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0C1446' }}>{bus.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{bus.operator} · {bus.type}</div>
                  </div>
                </div>

                {[
                  { label: 'Rute', value: `${bus.from} → ${bus.to}` },
                  { label: 'Berangkat', value: `${bus.departureTime} WIB` },
                  { label: 'Tiba', value: `${bus.arrivalTime} WIB` },
                  { label: 'Terminal', value: bus.departureTerminal },
                  { label: 'Kursi', value: seats.join(', ') },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 10 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                    <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{value}</span>
                  </div>
                ))}

                <hr className="divider" />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Harga tiket</span>
                  <span>{rupiah(bus.price)} × {seats.length}</span>
                </div>

                <div
                  style={{
                    background: 'rgba(12,20,70,0.05)', borderRadius: 10, padding: '12px 14px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}
                >
                  <span style={{ fontWeight: 700, color: '#0C1446' }}>Total</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#0C1446' }}>{rupiah(totalPrice)}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

