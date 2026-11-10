# Tiket Bus Online (simulasi)

React + Vite + Material UI — Pemesanan tiket bus 5 langkah tanpa login.

## Menjalankan

```bash
npm install
npm run dev      # buka alamat yang tampil, biasanya http://localhost:5173
npm run build    # hasil produksi ada di folder dist
npm run preview  # preview hasil build secara lokal
```

## Stack

- **React 19** + **Vite 8** (HMR, build cepat)
- **Material UI v5** (`@mui/material`, `@mui/icons-material`)
- **ESLint** (konfigurasi dari template Vite)

## Struktur `src/`

| File | Keterangan |
|---|---|
| `main.jsx` | Entry point React |
| `App.jsx` | Komponen utama + logika pemesanan 5 langkah |
| `data.js` | Data rute, harga, jam keberangkatan |
| `SeatMap.jsx` | Komponen peta kursi |
| `QrSample.jsx` | Komponen QR code simulasi |
| `utils.js` | Fungsi pembantu (format rupiah, localStorage, dll.) |
| `index.css` | CSS global (variabel warna, tipografi) |

## Mengubah Data

- **Rute, harga, jam**: edit `src/data.js`
- **Batas kursi per pesanan**: ubah `MAX_SEATS` di `src/data.js`
- Kursi yang sudah dipesan tersimpan di **localStorage** browser — hapus via DevTools → Application → Local Storage untuk mengosongkan.

## Catatan

> Website ini adalah **simulasi**. Tidak ada transaksi atau pembayaran nyata yang terjadi.
