import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Bus, ChevronRight, Trash2, Calendar, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { rupiah } from '../data/buses';

// ============================================================
// MyOrders — riwayat pesanan dari LocalStorage
// ============================================================

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  // Muat pesanan dari localStorage saat komponen pertama dimuat
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('numpangbus_orders') || '[]');
      setOrders(saved);
    } catch {
      setOrders([]);
    }
  }, []);

  // Hapus semua riwayat pesanan
  const clearAll = () => {
    if (window.confirm('Hapus semua riwayat pesanan?')) {
      localStorage.removeItem('numpangbus_orders');
      setOrders([]);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Header */}
      <div style={{ background: '#0C1446', padding: '32px 0' }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Pesanan Saya</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
            Riwayat semua pemesanan tiket bus kamu.
          </p>
        </div>
      </div>

      <div className="page-content" style={{ padding: '40px 0 80px' }}>
        <div className="container">

          {orders.length === 0 ? (
            /* Kosong */
            <div
              style={{
                textAlign: 'center', padding: '80px 20px',
                background: '#fff', borderRadius: 16,
                border: '1px solid var(--border-light)',
              }}
            >
              <Package size={56} color="#e5e7eb" style={{ margin: '0 auto 16px' }} />
              <h2 style={{ color: '#0C1446', marginBottom: 8 }}>Belum ada pesanan</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
                Kamu belum pernah memesan tiket. Yuk, pesan tiket sekarang!
              </p>
              <Link to="/search" className="btn btn-primary">
                Cari Tiket Bus
              </Link>
            </div>
          ) : (
            <>
              {/* Tombol hapus semua */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                <button
                  className="btn btn-outline btn-sm"
                  style={{ color: '#dc2626', borderColor: '#dc2626' }}
                  onClick={clearAll}
                >
                  <Trash2 size={14} /> Hapus Semua
                </button>
              </div>

              {/* Daftar pesanan */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {orders.map((order, idx) => (
                  <div
                    key={idx}
                    className="card"
                    style={{ padding: 0, overflow: 'hidden' }}
                  >
                    {/* Strip warna atas */}
                    <div style={{ height: 4, background: '#0C1446' }} />

                    <div style={{ padding: 24 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>

                        {/* Kiri: info pesanan */}
                        <div style={{ flex: 1, minWidth: 200 }}>
                          {/* Kode booking + status */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                            <span
                              style={{
                                fontSize: 16, fontWeight: 800, color: '#0C1446',
                                letterSpacing: 1,
                              }}
                            >
                              {order.bookingCode}
                            </span>
                            <span className="badge badge-success">✓ {order.status}</span>
                          </div>

                          {/* Rute */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                            <Bus size={16} color="#0C1446" />
                            <span style={{ fontWeight: 700, fontSize: 15 }}>
                              {order.bus?.from} → {order.bus?.to}
                            </span>
                          </div>

                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                            {/* Tanggal */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                              <Calendar size={13} />
                              {new Date(order.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric', month: 'long', year: 'numeric',
                              })}
                            </div>
                            {/* Terminal */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                              <MapPin size={13} />
                              {order.bus?.departureTerminal}
                            </div>
                          </div>

                          <div style={{ marginTop: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                            <strong style={{ color: 'var(--text)' }}>{order.bus?.name}</strong>
                            {' · '}Kursi: <strong>{order.seats?.join(', ')}</strong>
                            {' · '}Penumpang: <strong>{order.passenger?.name}</strong>
                          </div>
                        </div>

                        {/* Kanan: harga & tombol */}
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
                          <div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Total Pembayaran</div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: '#0C1446' }}>
                              {rupiah(order.totalPrice)}
                            </div>
                          </div>
                          <Link to="/eticket" className="btn btn-primary btn-sm">
                            Lihat E-Ticket <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

