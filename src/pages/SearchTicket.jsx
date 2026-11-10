import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, Bus, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchForm from '../components/SearchForm';
import BusCard from '../components/BusCard';
import { busesData, rupiah } from '../data/buses';

// ============================================================
// SearchTicket — halaman hasil pencarian bus
// ============================================================

export default function SearchTicket() {
  const [params] = useSearchParams();
  const from      = params.get('from')       || '';
  const to        = params.get('to')         || '';
  const date      = params.get('date')       || '';
  const passengers = Number(params.get('passengers') || 1);

  // Filter & sort state
  const [sortBy,       setSortBy]       = useState('price_asc');
  const [filterType,   setFilterType]   = useState('');
  const [maxPrice,     setMaxPrice]     = useState(1000000);
  const [showFilter,   setShowFilter]   = useState(true);

  // Filter berdasarkan rute pencarian
  const matched = useMemo(() => {
    return busesData.filter((b) => {
      const routeOk = (!from || b.from.toLowerCase() === from.toLowerCase()) &&
                      (!to   || b.to.toLowerCase()   === to.toLowerCase());
      const typeOk  = !filterType || b.type === filterType;
      const priceOk = b.price <= maxPrice;
      return routeOk && typeOk && priceOk;
    });
  }, [from, to, filterType, maxPrice]);

  // Sort
  const sorted = useMemo(() => {
    return [...matched].sort((a, b) => {
      if (sortBy === 'price_asc')  return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating')     return b.rating - a.rating;
      if (sortBy === 'departure')  return a.departureTime.localeCompare(b.departureTime);
      return 0;
    });
  }, [matched, sortBy]);

  const busTypes = [...new Set(busesData.map((b) => b.type))];

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Header pencarian */}
      <div style={{ background: '#0C1446', padding: '32px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              color: '#fff', marginBottom: 20,
            }}
          >
            <Bus size={20} />
            <span style={{ fontSize: 18, fontWeight: 700 }}>
              {from || 'Semua kota'} → {to || 'Semua tujuan'}
            </span>
            {date && (
              <span
                style={{
                  background: 'rgba(255,255,255,0.15)', borderRadius: 20,
                  padding: '4px 14px', fontSize: 13,
                }}
              >
                {new Date(date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
            <span
              style={{
                background: '#F5B942', color: '#0C1446', borderRadius: 20,
                padding: '4px 14px', fontSize: 13, fontWeight: 700,
              }}
            >
              {passengers} Penumpang
            </span>
          </div>

          {/* Form pencarian di sini juga */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '24px' }}>
            <SearchForm initialValues={{ from, to, date, passengers }} />
          </div>
        </div>
      </div>

      <div className="page-content" style={{ padding: '32px 0' }}>
        <div className="container">
          <div className="search-layout">
            {/* ===== FILTER SIDEBAR ===== */}
            <aside>
              <div className="filter-card">
                <div
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: showFilter ? 20 : 0, cursor: 'pointer',
                  }}
                  onClick={() => setShowFilter((v) => !v)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#0C1446' }}>
                    <SlidersHorizontal size={16} /> Filter
                  </div>
                  {showFilter ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                {showFilter && (
                  <>
                    {/* Reset */}
                    <button
                      className="btn btn-outline btn-sm btn-full"
                      style={{ marginBottom: 20 }}
                      onClick={() => { setFilterType(''); setMaxPrice(1000000); setSortBy('price_asc'); }}
                    >
                      Reset Filter
                    </button>

                    {/* Urutkan */}
                    <div className="form-group" style={{ marginBottom: 20 }}>
                      <label className="form-label">
                        <ArrowUpDown size={12} style={{ display: 'inline', marginRight: 4 }} />
                        Urutkan
                      </label>
                      <select
                        className="form-control"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{ padding: '10px 14px', fontSize: 13 }}
                      >
                        <option value="price_asc">Harga Termurah</option>
                        <option value="price_desc">Harga Termahal</option>
                        <option value="rating">Rating Tertinggi</option>
                        <option value="departure">Jam Berangkat</option>
                      </select>
                    </div>

                    {/* Jenis bus */}
                    <div className="form-group" style={{ marginBottom: 20 }}>
                      <label className="form-label">Jenis Bus</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14, cursor: 'pointer' }}>
                          <input
                            type="radio" name="type" value=""
                            checked={filterType === ''}
                            onChange={() => setFilterType('')}
                          />
                          Semua Jenis
                        </label>
                        {busTypes.map((t) => (
                          <label key={t} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14, cursor: 'pointer' }}>
                            <input
                              type="radio" name="type" value={t}
                              checked={filterType === t}
                              onChange={() => setFilterType(t)}
                            />
                            {t}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Harga max */}
                    <div className="form-group">
                      <label className="form-label">Harga Maks: {rupiah(maxPrice)}</label>
                      <input
                        type="range"
                        min={100000} max={1000000} step={50000}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        style={{ width: '100%', accentColor: '#0C1446' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
                        <span>Rp 100.000</span>
                        <span>Rp 1.000.000</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </aside>

            {/* ===== HASIL PENCARIAN ===== */}
            <main>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontWeight: 600, color: '#0C1446' }}>
                  {sorted.length} bus ditemukan
                  {(from || to) && ` untuk rute ${from || '...'} → ${to || '...'}`}
                </span>
              </div>

              {sorted.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center', padding: '60px 20px',
                    background: '#fff', borderRadius: 16,
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <Bus size={48} color="#e5e7eb" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ color: '#0C1446', marginBottom: 8 }}>Tidak ada bus ditemukan</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                    Coba ubah rute, tanggal, atau filter pencarian.
                  </p>
                  <Link to="/" className="btn btn-primary btn-sm">Kembali ke Beranda</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {sorted.map((bus) => (
                    <BusCard key={bus.id} bus={bus} compact />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

