import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Star, Clock, MapPin, Wifi, AirVent, Coffee,
  Shield, Usb, ChevronRight, Info, Users
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeatSelection from '../components/SeatSelection';
import { busesData, rupiah } from '../data/buses';
import { useBooking } from '../context/BookingContext';

// ============================================================
// BusDetail — detail bus + pemilihan kursi interaktif
// ============================================================

const facilityIcons = {
  'AC': <AirVent size={16} />,
  'WiFi': <Wifi size={16} />,
  'Toilet': <Shield size={16} />,
  'Snack': <Coffee size={16} />,
  'USB Charger': <Usb size={16} />,
};

export default function BusDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectBus, selectSeats, booking } = useBooking();

  // Cari data bus berdasarkan id dari URL
  const bus = busesData.find((b) => b.id === Number(id));

  const [selectedSeats, setSelectedSeats] = useState([]);
  const MAX_SEATS = 4;

  if (!bus) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <h2>Bus tidak ditemukan.</h2>
          <Link to="/search" className="btn btn-primary" style={{ marginTop: 16 }}>
            Kembali ke Pencarian
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Toggle pilih / batal pilih kursi
  const toggleSeat = (num) => {
    setSelectedSeats((prev) => {
      if (prev.includes(num)) return prev.filter((s) => s !== num);
      if (prev.length >= MAX_SEATS) {
        alert(`Maks. ${MAX_SEATS} kursi per pemesanan.`);
        return prev;
      }
      return [...prev, num].sort((a, b) => a - b);
    });
  };

  const totalHarga = bus.price * selectedSeats.length;

  // Lanjut ke halaman data penumpang
  const handleNext = () => {
    if (selectedSeats.length === 0) {
      alert('Pilih minimal 1 kursi terlebih dahulu.');
      return;
    }
    selectBus(bus);
    selectSeats(selectedSeats);
    navigate('/passenger');
  };

  const availSeats = bus.totalSeats - bus.takenSeats.length;

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="page-content" style={{ paddingBottom: 80 }}>
        {/* Back button */}
        <div style={{ background: '#0C1446', padding: '16px 0' }}>
          <div className="container">
            <Link
              to="/search"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.8)', fontSize: 14 }}
            >
              <ArrowLeft size={16} /> Kembali ke Hasil Pencarian
            </Link>
          </div>
        </div>

        <div className="container" style={{ marginTop: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>

            {/* ===== KOLOM KIRI ===== */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Info Bus */}
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: 240, overflow: 'hidden', background: 'linear-gradient(135deg,#0C1446,#1a2567)' }}>
                  <img
                    src={bus.image}
                    alt={bus.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>

                <div style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div>
                      <span className="badge badge-primary" style={{ marginBottom: 8 }}>{bus.type}</span>
                      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0C1446' }}>{bus.name}</h1>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{bus.operator}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                        <Star size={14} fill="#F5B942" color="#F5B942" />
                        <span style={{ fontWeight: 700, fontSize: 16 }}>{bus.rating}</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{bus.reviews} ulasan</div>
                    </div>
                  </div>

                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{bus.description}</p>

                  {/* Rute */}
                  <div
                    style={{
                      background: 'var(--bg)', borderRadius: 12, padding: 16,
                      display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0',
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 800, color: '#0C1446' }}>{bus.departureTime}</div>
                      <div style={{ fontWeight: 700, color: '#0C1446' }}>{bus.from}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{bus.departureTerminal}</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
                        <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />{bus.duration}
                      </div>
                      <div style={{ borderTop: '2px dashed var(--border)', position: 'relative' }}>
                        <ChevronRight
                          size={16}
                          color="#0C1446"
                          style={{ position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)' }}
                        />
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 800, color: '#0C1446' }}>{bus.arrivalTime}</div>
                      <div style={{ fontWeight: 700, color: '#0C1446' }}>{bus.to}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{bus.arrivalTerminal}</div>
                    </div>
                  </div>

                  {/* Fasilitas */}
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0C1446', marginBottom: 12 }}>Fasilitas Bus</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {bus.facilities.map((f) => (
                        <span
                          key={f}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            background: 'rgba(12,20,70,0.07)', color: '#0C1446',
                            border: '1px solid rgba(12,20,70,0.15)',
                            borderRadius: 8, padding: '6px 12px', fontSize: 13, fontWeight: 500,
                          }}
                        >
                          {facilityIcons[f] || null}
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pemilihan Kursi */}
              <div className="card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                  <Users size={18} color="#0C1446" />
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0C1446' }}>Pilih Kursi</h2>
                  <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-secondary)' }}>
                    {availSeats} dari {bus.totalSeats} kursi tersedia
                  </span>
                </div>

                <div
                  style={{
                    background: 'rgba(12,20,70,0.04)', borderRadius: 10,
                    padding: '10px 16px', marginBottom: 20,
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: 13, color: 'var(--text-secondary)',
                  }}
                >
                  <Info size={14} color="#0C1446" />
                  Pilih 1–{MAX_SEATS} kursi. Kursi yang dipilih akan dikonfirmasi setelah pembayaran.
                </div>

                <SeatSelection
                  totalSeats={bus.totalSeats}
                  takenSeats={bus.takenSeats}
                  selectedSeats={selectedSeats}
                  onToggle={toggleSeat}
                />
              </div>
            </div>

            {/* ===== KOLOM KANAN (Ringkasan) ===== */}
            <aside style={{ position: 'sticky', top: 88 }}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0C1446', marginBottom: 20 }}>
                  Ringkasan Pemesanan
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  {[
                    { label: 'Bus', value: bus.name },
                    { label: 'Rute', value: `${bus.from} → ${bus.to}` },
                    { label: 'Berangkat', value: bus.departureTime },
                    { label: 'Tiba', value: bus.arrivalTime },
                    { label: 'Durasi', value: bus.duration },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                      <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{value}</span>
                    </div>
                  ))}
                </div>

                <hr className="divider" />

                {/* Kursi dipilih */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>Kursi Dipilih</div>
                  {selectedSeats.length === 0 ? (
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                      Belum ada kursi dipilih
                    </p>
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {selectedSeats.map((s) => (
                        <span
                          key={s}
                          style={{
                            background: '#0C1446', color: '#fff',
                            borderRadius: 6, padding: '4px 10px', fontSize: 13, fontWeight: 700,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Harga per kursi */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Harga × {selectedSeats.length} kursi
                  </span>
                  <span style={{ fontWeight: 600 }}>{rupiah(bus.price)} / kursi</span>
                </div>

                {/* Total */}
                <div
                  style={{
                    background: 'rgba(12,20,70,0.05)', borderRadius: 10,
                    padding: '14px 16px', marginBottom: 20,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}
                >
                  <span style={{ fontWeight: 700, color: '#0C1446' }}>Total Harga</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: '#0C1446' }}>{rupiah(totalHarga)}</span>
                </div>

                <button
                  className="btn btn-primary btn-full"
                  onClick={handleNext}
                  disabled={selectedSeats.length === 0}
                >
                  Lanjutkan Pemesanan <ChevronRight size={16} />
                </button>

                {selectedSeats.length === 0 && (
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center', marginTop: 10 }}>
                    Pilih kursi untuk melanjutkan
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

