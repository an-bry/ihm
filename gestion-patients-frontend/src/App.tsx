import { Routes, Route } from "react-router-dom";

import MainLayout from "./pages/MainLayout";

import PatientsList from "./pages/PatientsList";
import AddPatient from "./pages/AddPatient";

import AppointmentsList from "./pages/AppointmentsList";
import AddAppointment from "./pages/AddAppointment";

import ConsultationsList from "./pages/ConsultationsList";
import AddConsultation from "./pages/AddConsultation";

import DoctorsList from "./pages/DoctorsList";
import AddDoctor from "./pages/AddDoctor";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <MainLayout>
      <Routes>
      
        {/* PATIENTS */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<PatientsList />} />
        <Route path="/add-patient" element={<AddPatient />} />

        {/* RENDEZ-VOUS */}
        <Route path="/appointments" element={<AppointmentsList />} />
        <Route path="/add-appointment" element={<AddAppointment />} />

        {/* CONSULTATIONS */}
        <Route path="/consultations" element={<ConsultationsList />} />
        <Route path="/add-consultation" element={<AddConsultation />} />

        {/* DOCTEURS */}
        <Route path="/doctors" element={<DoctorsList />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
      </Routes>
    </MainLayout>
  );
}

export default App;