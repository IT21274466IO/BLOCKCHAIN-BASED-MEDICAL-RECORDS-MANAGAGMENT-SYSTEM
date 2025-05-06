import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./screens/hero";
import DoctorDashboard from "./screens/DoctorDashboard";
import DashboardHome from "./pages/DashboardHome";
import Appointments from "./pages/Appointments";
import Availability from "./pages/Availability";
import ProfilePage from "./pages/ProfilePage";
import Conversation from "./pages/Conversation";
import ProtectedRoute from "./components/ProtectedRoute";
import MedicalRecords from "./pages/MedicalRecords";
import ImagePredictions from "./pages/ImagePredictions";

// import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="availability" element={<Availability />} />
            <Route path="medical-records" element={<MedicalRecords />} />
            <Route path="conversation" element={<Conversation />} />
            <Route path="images-predictions" element={<ImagePredictions />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          {/* <Route path="settings" element={<SettingsPage />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
