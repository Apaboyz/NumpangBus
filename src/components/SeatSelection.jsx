// ============================================================
// SeatSelection — tampilan pemilihan kursi interaktif
// ============================================================

export default function SeatSelection({ totalSeats, takenSeats, selectedSeats, onToggle }) {
  // Buat array nomor kursi 1..totalSeats
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  // Konfigurasi 2+2: setiap baris ada 4 kursi + lorong di tengah
  const rows = [];
  for (let i = 0; i < seats.length; i += 4) {
    rows.push(seats.slice(i, i + 4));
  }

  const getStatus = (num) => {
    if (takenSeats.includes(num)) return 'taken';
    if (selectedSeats.includes(num)) return 'selected';
    return 'available';
  };

  return (
    <div>
      {/* Legenda */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { status: 'available', label: 'Tersedia', bg: '#fff', border: '#e5e7eb', color: '#6b7280' },
          { status: 'selected',  label: 'Dipilih',  bg: '#0C1446', border: '#0C1446', color: '#fff' },
          { status: 'taken',     label: 'Dipesan',  bg: '#fee2e2', border: '#fca5a5', color: '#fca5a5' },
        ].map((l) => (
          <div key={l.status} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 24, height: 24, borderRadius: 6,
                background: l.bg, border: `2px solid ${l.border}`,
              }}
            />
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Kursi depan (sopir) */}
      <div
        style={{
          background: 'var(--bg)', borderRadius: 10, padding: '8px 16px',
          marginBottom: 16, fontSize: 13, color: 'var(--text-secondary)',
          textAlign: 'center', border: '1px dashed var(--border)',
        }}
      >
        🚌 Depan (Sopir)
      </div>

      {/* Grid kursi */}
      <div className="seat-map-wrapper">
        {rows.map((row, ri) => (
          <div key={ri} className="seat-row">
            {/* 2 kursi kiri */}
            {row.slice(0, 2).map((num) => {
              const status = getStatus(num);
              return (
                <button
                  key={num}
                  className={`seat-btn ${status}`}
                  onClick={() => status !== 'taken' && onToggle(num)}
                  disabled={status === 'taken'}
                  title={
                    status === 'taken' ? 'Kursi sudah dipesan' :
                    status === 'selected' ? 'Klik untuk batal pilih' :
                    'Klik untuk pilih kursi ini'
                  }
                >
                  {num}
                </button>
              );
            })}

            {/* Lorong */}
            <div className="seat-aisle" />

            {/* 2 kursi kanan */}
            {row.slice(2, 4).map((num) => {
              const status = getStatus(num);
              return (
                <button
                  key={num}
                  className={`seat-btn ${status}`}
                  onClick={() => status !== 'taken' && onToggle(num)}
                  disabled={status === 'taken'}
                >
                  {num}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

