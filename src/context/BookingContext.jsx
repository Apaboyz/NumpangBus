import { createContext, useContext, useState, useEffect } from 'react';
import { makeBookingCode } from '../data/buses';

// ============================================================
// Booking Context — menyimpan state pemesanan antar halaman
// ============================================================

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  // Data pemesanan aktif
  const [booking, setBooking] = useState({
    bus: null,           // objek bus yang dipilih
    seats: [],           // kursi yang dipilih, misal [1, 2]
    passenger: null,     // { name, phone, email, idNumber }
    paymentMethod: '',   // 'transfer' | 'va' | 'ewallet' | 'qris'
    bookingCode: '',     // kode booking unik
    totalPrice: 0,
  });

  // Daftar riwayat pesanan (dari localStorage)
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('numpangbus_orders') || '[]');
    } catch {
      return [];
    }
  });

  // Simpan orders ke localStorage tiap kali berubah
  useEffect(() => {
    localStorage.setItem('numpangbus_orders', JSON.stringify(orders));
  }, [orders]);

  // Pilih bus
  const selectBus = (bus) => {
    setBooking((prev) => ({
      ...prev,
      bus,
      seats: [],
      totalPrice: 0,
      bookingCode: makeBookingCode(),
    }));
  };

  // Update kursi yang dipilih
  const selectSeats = (seats) => {
    setBooking((prev) => ({
      ...prev,
      seats,
      totalPrice: prev.bus ? prev.bus.price * seats.length : 0,
    }));
  };

  // Simpan data penumpang
  const savePassenger = (passenger) => {
    setBooking((prev) => ({ ...prev, passenger }));
  };

  // Pilih metode pembayaran
  const selectPayment = (method) => {
    setBooking((prev) => ({ ...prev, paymentMethod: method }));
  };

  // Selesaikan pemesanan → simpan ke riwayat
  const completeOrder = () => {
    const order = {
      ...booking,
      status: 'Dibayar',
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
  };

  // Reset state pemesanan
  const resetBooking = () => {
    setBooking({
      bus: null,
      seats: [],
      passenger: null,
      paymentMethod: '',
      bookingCode: makeBookingCode(),
      totalPrice: 0,
    });
  };

  return (
    <BookingContext.Provider value={{
      booking,
      orders,
      selectBus,
      selectSeats,
      savePassenger,
      selectPayment,
      completeOrder,
      resetBooking,
    }}>
      {children}
    </BookingContext.Provider>
  );
}

// Hook untuk memakai context
export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking harus dipakai di dalam BookingProvider');
  return ctx;
};

