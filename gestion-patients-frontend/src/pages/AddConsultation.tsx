import { useEffect, useState } from "react";
import axios from "axios";
import { createConsultation } from "../services/consultationService";

export default function AddConsultation() {

  const [rdvs, setRdvs] = useState<any[]>([]);
  const [selectedRdv, setSelectedRdv] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    rendez_vous_id: "",
    patient_id: "",
    doctor_id: "",
    date_consultation: "",
    motif: "",
    diagnostic: "",
    traitement: "",
    observations: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔥 GET RDV CONFIRMÉS
  useEffect(() => {
    axios
      .get("http://localhost/backend/rendez_vous/read_confirmed.php")
      .then((res) => {
        console.log("API RESPONSE =", res.data);
  
        // ✅ FIX ULTRA IMPORTANT
        const data = Array.isArray(res.data)
          ? res.data.flat().filter(Boolean)
          : [];
          console.log("RDVS FRONT =", res.data);
        setRdvs(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔥 OUVRIR MODAL AVEC RDV
  const openModal = (rdv: any) => {

    setSelectedRdv(rdv);
  
    setFormData({
      rendez_vous_id: rdv.id,
      patient_id: rdv.patient_id,
      doctor_id: rdv.doctor_id ?? "", // 🔥 IMPORTANT FIX
      date_consultation: rdv.date_rdv,
      motif: rdv.motif,
      diagnostic: "",
      traitement: "",
      observations: "",
    });
  
    setShowModal(true);
  };
  // 🔥 SUBMIT CONSULTATION
  const handleSubmit = async () => {
    try {
      setLoading(true);
  
      const payload = {
        rendez_vous_id: selectedRdv.id,
        patient_id: selectedRdv.patient_id,
        doctor_id: selectedRdv.doctor_id,
        date_consultation: selectedRdv.date_rdv,
        motif: selectedRdv.motif,
        diagnostic: formData.diagnostic,
        traitement: formData.traitement,
        observations: formData.observations,
      };
      console.log("PAYLOAD =", JSON.stringify(payload, null, 2));
  
      const res = await createConsultation(formData);

      console.log("RESPONSE =", res.data);
      
      if (!res.data.success) {
        console.log("ERROR BACKEND =", res.data);
        alert(res.data.message || res.data.error);
        return;
      }
  
      if (res.data.success) {
        setSuccess(true);
  
        setShowModal(false);
        setSelectedRdv(null);
  
        setTimeout(() => setSuccess(false), 3000);
  
        // refresh list
        const refresh = await axios.get(
          "http://localhost/backend/rendez_vous/read_confirmed.php"
        );
  
        setRdvs(Array.isArray(refresh.data) ? refresh.data : []);
      } else {
        alert(res.data.message || "Erreur backend");
      }
  
    } catch (err) {
      console.log("ERROR =", err);
      alert("Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      {/* SUCCESS */}
      {success && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-xl">
          Consultation créée
        </div>
      )}

      {/* LIST RDV */}
      <h1 className="text-2xl font-bold mb-4">
        RDV confirmés
      </h1>

      <div className="grid gap-3">

        {rdvs.map((rdv) => (
          <div key={rdv.id} className="bg-white p-4 rounded-xl shadow flex justify-between">

            <div>
              <p className="font-bold">{rdv.patient_nom} {rdv.patient_prenom}</p>
              <p className="text-sm text-gray-500">
                Dr {rdv.doctor_nom} {rdv.doctor_prenom}
              </p>
              <p className="text-xs">
                {rdv.date_rdv} - {rdv.heure_rdv}
              </p>
            </div>

            <button
              onClick={() => openModal(rdv)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              Créer consultation
            </button>

          </div>
          
        ))}

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl w-[500px]">

            <h2 className="text-xl font-bold mb-4">
              Nouvelle consultation
            </h2>

            <div className="bg-gray-50 p-3 rounded-xl mb-4">

<p>
  <strong>Patient :</strong>
  {" "}
  {selectedRdv?.patient_nom}
  {" "}
  {selectedRdv?.patient_prenom}
</p>

<p>
  <strong>Médecin :</strong>
  {" "}
  Dr {selectedRdv?.doctor_nom}
  {" "}
  {selectedRdv?.doctor_prenom}
</p>

<p>
  <strong>Date :</strong>
  {" "}
  {selectedRdv?.date_rdv}
</p>

<p>
  <strong>Motif :</strong>
  {" "}
  {selectedRdv?.motif}
</p>

</div>

            <textarea
              placeholder="Diagnostic"
              className="w-full border p-2 rounded mb-2"
              onChange={(e) =>
                setFormData({ ...formData, diagnostic: e.target.value })
              }
            />

            <textarea
              placeholder="Traitement"
              className="w-full border p-2 rounded mb-2"
              onChange={(e) =>
                setFormData({ ...formData, traitement: e.target.value })
              }
            />

            <textarea
              placeholder="Observations"
              className="w-full border p-2 rounded mb-2"
              onChange={(e) =>
                setFormData({ ...formData, observations: e.target.value })
              }
            />

            <div className="flex gap-2 mt-4">

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-xl w-full"
              >
                {loading ? "..." : "Valider"}
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-xl w-full"
              >
                Annuler
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}