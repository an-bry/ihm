import React, { useEffect, useState } from "react";
import axios from "axios";
import { createAppointment } from "../services/appointmentService";

const AddAppointment = () => {
  // ===================== STATE =====================
  const [patients, setPatients] = useState<any[]>([]);
  const [searchPatient, setSearchPatient] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",   // 👈 AJOUT ICI
    date_rdv: "",
    heure_rdv: "",
    motif: "",
    statut: "En attente",
  });
  const [doctors, setDoctors] = useState<any[]>([]);
  // ===================== EFFECT =====================
  useEffect(() => {
    axios.get("http://localhost/backend/doctors/read.php")
      .then(res => setDoctors(res.data))
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    fetchPatients();
  }, []);

  // ===================== API =====================
  const fetchPatients = async () => {
    try {
      const res = await axios.get(
        "http://localhost/backend/patients/read.php"
      );
      setPatients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ===================== HANDLERS =====================
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createAppointment(formData);

      setSuccess(true);

      setFormData({
        patient_id: "",
        doctor_id:"",
        date_rdv: "",
        heure_rdv: "",
        motif: "",
        statut: "En attente",
      });

      setSearchPatient("");
      setSelectedPatient(null);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      alert("Erreur lors de l'ajout");
    } finally {
      setLoading(false);
    }
  };

  // ===================== FILTER =====================
  const filteredPatients = patients.filter((p) =>
    `${p.nom} ${p.prenom}`
      .toLowerCase()
      .includes(searchPatient.toLowerCase())
  );

  // ===================== UI =====================
  return (
    <div className="h-full flex items-center justify-center">

      {success && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl">
          ✅ Rendez-vous ajouté avec succès
        </div>
      )}

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-2xl font-bold mb-8">
          Nouveau Rendez-vous
        </h1>

        <div className="grid grid-cols-2 gap-5">

          {/* ================= PATIENT SEARCH ================= */}
          <div className="col-span-2">
            <label className="block mb-2 font-medium">
              Rechercher un patient
            </label>

            <div className="relative">

              <input
                type="text"
                placeholder="🔍 Nom ou prénom..."
                value={searchPatient}
                onChange={(e) => setSearchPatient(e.target.value)}
                className="w-full border rounded-xl p-3"
              />

              {searchPatient && !selectedPatient && (
                <div className="absolute z-20 w-full bg-white border rounded-xl shadow-lg mt-1 max-h-60 overflow-y-auto">

                  {filteredPatients.slice(0, 8).map((patient) => (
                    <div
                      key={patient.id}
                      className="p-3 hover:bg-blue-50 cursor-pointer border-b"
                      onClick={() => {
                        setSelectedPatient(patient);

                        setFormData({
                          ...formData,
                          patient_id: patient.id,
                        });

                        setSearchPatient(
                          `${patient.nom} ${patient.prenom}`
                        );
                      }}
                    >
                      <div className="font-medium">
                        {patient.nom} {patient.prenom}
                      </div>

                      <div className="text-xs text-gray-500">
                        {patient.telephone}
                      </div>
                    </div>
                  ))}

                </div>
              )}
            </div>
          </div>

          {/* ================= Doctor_id================= */}
          
        {/* ================= DOCTOR ================= */}
<div className="col-span-2">
  <label className="block mb-2 font-medium">
    Médecin
  </label>

  <select
    name="doctor_id"
    value={formData.doctor_id}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  >
    <option value="">Choisir un médecin</option>

    {doctors.map((doc) => (
      <option key={doc.id} value={doc.id}>
        Dr {doc.nom} {doc.prenom} - {doc.specialite}
      </option>
    ))}
  </select>
</div>
          {/* ================= DATE ================= */}
          <div>
            <label className="block mb-2 font-medium">
              Date
            </label>

            <input
              type="date"
              name="date_rdv"
              value={formData.date_rdv}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* ================= HEURE ================= */}
          <div>
            <label className="block mb-2 font-medium">
              Heure
            </label>

            <input
              type="time"
              name="heure_rdv"
              value={formData.heure_rdv}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* ================= MOTIF ================= */}
          <div className="col-span-2">
            <label className="block mb-2 font-medium">
              Motif
            </label>

            <textarea
              name="motif"
              value={formData.motif}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* ================= STATUT ================= */}
          <div className="col-span-2">
            <label className="block mb-2 font-medium">
              Statut
            </label>

            <select
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >
              <option>En attente</option>
              <option>Confirmé</option>
              <option>Annulé</option>
            </select>
          </div>

        </div>

        {/* ================= BUTTON ================= */}
        <div className="flex justify-end mt-8">

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default AddAppointment;