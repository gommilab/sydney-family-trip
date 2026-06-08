import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppHeader } from "./components/AppHeader";
import { BottomNav } from "./components/BottomNav";
import { HomePage } from "./pages/HomePage";
import { ItineraryPage } from "./pages/ItineraryPage";
import { DayDetailPage } from "./pages/DayDetailPage";
import { EmergencyPage } from "./pages/EmergencyPage";
import { ReservationsPage } from "./pages/ReservationsPage";
import { HotelPage } from "./pages/HotelPage";
import { MiscInfoPage } from "./pages/MiscInfoPage";

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <AppHeader />
        <main className="flex-1 w-full mx-auto max-w-screen-sm px-4 pt-4 pb-28">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/itinerary/:day" element={<DayDetailPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/hotel" element={<HotelPage />} />
            <Route path="/misc" element={<MiscInfoPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </HashRouter>
  );
}
