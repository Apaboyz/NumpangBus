import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search, ArrowRight } from 'lucide-react';
import { cities } from '../data/buses';

// ============================================================
// SearchForm — form pencarian tiket di hero dan halaman search
// ============================================================

export default function SearchForm({ initialValues = {} }) {
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    from: initialValues.from || '',
    to: initialValues.to || '',
    date: initialValues.date || today,
    passengers: initialValues.passengers || 1,
  });

  const [errors, setErrors] = useState({});

  const set = (field, val) => {
    setForm((p) => ({ ...p, [field]: val }));
    setErrors((p) => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.from)       e.from = 'Pilih kota asal';
    if (!form.to)         e.to   = 'Pilih kota tujuan';
    if (form.from && form.to && form.from === form.to)
      e.to = 'Kota tujuan harus berbeda dengan asal';
    if (!form.date)       e.date = 'Pilih tanggal';
    if (form.passengers < 1) e.passengers = 'Min. 1 penumpang';
    return e;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    const q = new URLSearchParams(form).toString();
    navigate(`/search?${q}`);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px 12px 42px',
    border: '2px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 15,
    fontFamily: 'Poppins, sans-serif',
    color: 'var(--text)',
    background: 'var(--white)',
    outline: 'none',
    transition: 'border-color 0.2s',
    appearance: 'none',
  };

  const iconWrap = {
    position: 'absolute',
    left: 14,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#0C1446',
    display: 'flex',
  };

  const field = (label, icon, content, error) => (
    <div className="form-group">
      <label className="form-label" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: '#6b7280' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <span style={iconWrap}>{icon}</span>
        {content}
      </div>
      {error && <span className="form-error">{error}</span>}
    </div>
  );

  return (
    <form onSubmit={handleSearch}>
      <div className="search-grid">
        {/* Kota Asal */}
        {field(
          'Kota Asal',
          <MapPin size={16} />,
          <select
            value={form.from}
            onChange={(e) => set('from', e.target.value)}
            style={{ ...inputStyle, borderColor: errors.from ? '#dc2626' : '' }}
          >
            <option value="">Pilih kota asal...</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>,
          errors.from
        )}

        {/* Kota Tujuan */}
        {field(
          'Kota Tujuan',
          <MapPin size={16} />,
          <select
            value={form.to}
            onChange={(e) => set('to', e.target.value)}
            style={{ ...inputStyle, borderColor: errors.to ? '#dc2626' : '' }}
          >
            <option value="">Pilih kota tujuan...</option>
            {cities.filter((c) => c !== form.from).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>,
          errors.to
        )}

        {/* Tanggal */}
        {field(
          'Tanggal Keberangkatan',
          <Calendar size={16} />,
          <input
            type="date"
            value={form.date}
            min={today}
            onChange={(e) => set('date', e.target.value)}
            style={{ ...inputStyle, borderColor: errors.date ? '#dc2626' : '' }}
          />,
          errors.date
        )}

        {/* Penumpang */}
        {field(
          'Jumlah Penumpang',
          <Users size={16} />,
          <input
            type="number"
            min={1}
            max={10}
            value={form.passengers}
            onChange={(e) => set('passengers', Number(e.target.value))}
            style={{ ...inputStyle, borderColor: errors.passengers ? '#dc2626' : '' }}
          />,
          errors.passengers
        )}

        {/* Tombol Cari */}
        <button
          type="submit"
          className="btn btn-accent"
          style={{ padding: '12px 28px', whiteSpace: 'nowrap', height: 48, alignSelf: 'flex-end' }}
        >
          <Search size={18} />
          Cari Tiket
        </button>
      </div>
    </form>
  );
}

