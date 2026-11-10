import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Wifi, AirVent, Coffee, Shield, ChevronRight } from 'lucide-react';
import { rupiah } from '../data/buses';

// ============================================================
// BusCard — kartu bus untuk homepage & hasil pencarian
// ============================================================

// Mapping nama fasilitas ke ikon Lucide
const FacilityIcon = ({ name }) => {
  const map = {
    'WiFi': <Wifi size={13} />,
    'AC': <AirVent size={13} />,
    'Snack': <Coffee size={13} />,
    'Toilet': <Shield size={13} />,
  };
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        background: 'var(--bg)', border: '1px solid var(--border)',
        borderRadius: 6, padding: '3px 8px', fontSize: 11,
        color: 'var(--text-secondary)', whiteSpace: 'nowrap',
      }}
    >
      {map[name] || null}
      {name}
    </span>
  );
};

export default function BusCard({ bus, compact = false }) {
  const availSeats = bus.totalSeats - bus.takenSeats.length;
  const lowStock  = availSeats <= 5;

  return (
    <div
      className="card"
      style={{
        transition: 'box-shadow 0.2s, transform 0.2s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '';
        e.currentTarget.style.transform = '';
      }}
    >
      {/* Gambar bus */}
      {!compact && (
        <div style={{ height: 180, overflow: 'hidden' }}>
          <img
            src={bus.image}
            alt={bus.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = 'linear-gradient(135deg,#0C1446,#1a2567)';
            }}
          />
        </div>
      )}

      {/* Konten kartu */}
      <div style={{ padding: compact ? '16px' : '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Nama operator + rating */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 2 }}>
              {bus.operator}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{bus.name}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <Star size={13} fill="#F5B942" color="#F5B942" />
            <span style={{ fontSize: 13, fontWeight: 600 }}>{bus.rating}</span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>({bus.reviews})</span>
          </div>
        </div>

        {/* Rute */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--bg)', borderRadius: 10, padding: '10px 14px',
            margin: '10px 0',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#0C1446' }}>{bus.departureTime}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{bus.from}</div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 2 }}>{bus.duration}</div>
            <div style={{ width: '100%', height: 1, background: 'var(--border)', position: 'relative' }}>
              <div
                style={{
                  position: 'absolute', right: -1, top: '50%', transform: 'translateY(-50%)',
                  width: 6, height: 6, background: '#0C1446', borderRadius: '50%',
                }}
              />
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#0C1446' }}>{bus.arrivalTime}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{bus.to}</div>
          </div>
        </div>

        {/* Fasilitas */}
        {!compact && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {bus.facilities.slice(0, 4).map((f) => <FacilityIcon key={f} name={f} />)}
            {bus.facilities.length > 4 && (
              <span style={{ fontSize: 11, color: 'var(--text-secondary)', alignSelf: 'center' }}>
                +{bus.facilities.length - 4} lainnya
              </span>
            )}
          </div>
        )}

        {/* Harga + sisa kursi + tombol */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#0C1446' }}>{rupiah(bus.price)}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>/ kursi</div>
            <div
              style={{
                fontSize: 12, fontWeight: 600,
                color: lowStock ? '#dc2626' : '#16a34a',
                marginTop: 2,
              }}
            >
              {availSeats} kursi tersisa
            </div>
          </div>
          <Link
            to={`/bus/${bus.id}`}
            className="btn btn-primary btn-sm"
            style={{ gap: 4 }}
          >
            Lihat Tiket <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

