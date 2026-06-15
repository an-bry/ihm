import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Search, Plus } from "lucide-react";
import {
  getConsultations,
  deleteConsultation,
} from "../services/consultationService";
import { useNavigate } from "react-router-dom";

export default function ConsultationsList() {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [editData, setEditData] = useState<any>(null);
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const res = await getConsultations();

      setConsultations(
        Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : []
      );
    } catch (error) {
      console.log(error);
      setConsultations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer cette consultation ?")) return;

    try {
      await deleteConsultation(id);

      setConsultations((prev) =>
        prev.filter((c) => c.id !== id)
      );
    } catch (error) {
      alert("Erreur suppression");
    }
  };

  const filtered = consultations.filter((c) =>
    `${c.nom ?? ""} ${c.prenom ?? ""} ${c.medecin ?? ""} ${c.diagnostic ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Consultations
          </h1>
          <p className="text-slate-500">
            Gestion des consultations médicales
          </p>
        </div>

        <button
          onClick={() => navigate("/add-consultation")}
          className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={18} />
          Nouvelle consultation
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">Total</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {consultations.length}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">Aujourd'hui</p>
          <h2 className="text-2xl font-bold text-green-600">
            {
              consultations.filter(
                (c) =>
                  c.date_consultation ===
                  new Date().toISOString().split("T")[0]
              ).length
            }
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">Consultations</p>
          <h2 className="text-2xl font-bold text-purple-600">
            {consultations.length}
          </h2>
        </div>

      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-2xl shadow mb-6 flex items-center gap-3">

        <Search className="text-gray-400" />

        <input
          type="text"
          placeholder="Rechercher patient, médecin, diagnostic..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none"
        />

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">Patient</th>
              <th className="text-left p-4">Médecin</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Diagnostic</th>
              <th className="text-center p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500">
                  Aucune consultation
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="border-t hover:bg-slate-50">

                  <td className="p-4 font-medium">
                    {c.nom} {c.prenom}
                  </td>

                  <td className="p-4">{c.medecin}</td>

                  <td className="p-4">{c.date_consultation}</td>

                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {c.diagnostic}
                    </span>
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                    <button
  onClick={() => {
    setSelected(c);
    setShowModal(true);
  }}
  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
>
  <Eye size={16} />
</button>

<button
  onClick={() => {
    setEditData(c);
    setShowEdit(true);
  }}
  className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
>
  <Pencil size={16} />
</button>

                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>
        {showModal && selected && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold mb-4">
        Détails Consultation
      </h2>

      <div className="space-y-3 text-gray-700">

        <p><b>Patient :</b> {selected.nom} {selected.prenom}</p>
        <p><b>Médecin :</b> {selected.medecin}</p>
        <p><b>Date :</b> {selected.date_consultation}</p>
        <p><b>Diagnostic :</b> {selected.diagnostic}</p>

      </div>

      <div className="flex justify-end mt-6">

        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Fermer
        </button>

      </div>

    </div>

  </div>
)}
{showEdit && editData && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold mb-4">
        Modifier Consultation
      </h2>

      {/* FORM */}
      <div className="space-y-3">

        <input
          type="text"
          value={editData.medecin}
          onChange={(e) =>
            setEditData({ ...editData, medecin: e.target.value })
          }
          className="w-full border p-3 rounded-lg"
          placeholder="Médecin"
        />

        <input
          type="text"
          value={editData.diagnostic}
          onChange={(e) =>
            setEditData({ ...editData, diagnostic: e.target.value })
          }
          className="w-full border p-3 rounded-lg"
          placeholder="Diagnostic"
        />

        <input
          type="date"
          value={editData.date_consultation}
          onChange={(e) =>
            setEditData({ ...editData, date_consultation: e.target.value })
          }
          className="w-full border p-3 rounded-lg"
        />

      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowEdit(false)}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Annuler
        </button>

        <button
          onClick={async () => {
            try {
              await fetch(
                `http://localhost/backend/consultations/update.php?id=${editData.id}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(editData),
                }
              );

              setShowEdit(false);
              fetchConsultations();

            } catch (error) {
              alert("Erreur modification");
            }
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Sauvegarder
        </button>

      </div>

    </div>

  </div>
)}
      </div>

    </div>
    
  );
}