import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';

import Home          from './pages/Home';
import SearchTicket  from './pages/SearchTicket';
import BusDetail     from './pages/BusDetail';
import PassengerData from './pages/PassengerData';
import Payment       from './pages/Payment';
import ETicket       from './pages/ETicket';
import MyOrders      from './pages/MyOrders';
import About         from './pages/About';

// ============================================================
// App — routing utama NumpangBus
// ============================================================

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/search"      element={<SearchTicket />} />
          <Route path="/bus/:id"     element={<BusDetail />} />
          <Route path="/passenger"   element={<PassengerData />} />
          <Route path="/payment"     element={<Payment />} />
          <Route path="/eticket"     element={<ETicket />} />
          <Route path="/my-orders"   element={<MyOrders />} />
          <Route path="/about"       element={<About />} />
        </Routes>
      </BrowserRouter>
    </BookingProvider>
  );
}
