import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCheck,
  FaTimes,
  FaSearch
} from "react-icons/fa";

import {
  getAppointments,
  deleteAppointment
} from "../services/appointmentService";

export default function AppointmentsList() {

  const navigate = useNavigate();

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [selectedRdv, setSelectedRdv] = useState<any>(null);
  const [editRdv, setEditRdv] = useState<any>(null);
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();
      setAppointments(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer ce rendez-vous ?")) return;

    try {
      await deleteAppointment(id);
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  // CONFIRM
  const confirmRdv = async (id: number) => {
    await fetch("http://localhost/backend/rendez_vous/confirm.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });

    fetchAppointments();
  };

  // CANCEL
  const cancelRdv = async (id: number) => {
    await fetch("http://localhost/backend/rendez_vous/cancel.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });

    fetchAppointments();
  };

  // FILTER LOGIC
  const filteredAppointments = appointments.filter((rdv) => {

    const searchText = search.toLowerCase();

    const fullName = `${rdv.nom ?? ""} ${rdv.prenom ?? ""}`.toLowerCase();

    const matchSearch =
      searchText === "" || fullName.includes(searchText);
      let matchDate = true;

      if (selectedDate) {
      
        const selected = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        );
      
        const rdvDate = rdv.date_rdv
          ? new Date(rdv.date_rdv)
          : null;
      
        if (!rdvDate) {
          matchDate = false;
        } else {
          matchDate =
            rdvDate.getFullYear() === selected.getFullYear() &&
            rdvDate.getMonth() === selected.getMonth() &&
            rdvDate.getDate() === selected.getDate();
        }
      }

    return matchSearch && matchDate;
  });

  // STATS
  const enAttente = appointments.filter(r => r.statut === "En attente").length;
  const confirmes = appointments.filter(r => r.statut === "Confirmé").length;
  const annules = appointments.filter(r => r.statut === "Annulé").length;

  return (
    <div className="p-6 flex flex-col gap-4">

      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow">

        <h1 className="text-xl font-bold">
          Rendez-vous
        </h1>

        <button
          onClick={() => navigate("/add-appointment")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <FaPlus />
          Nouveau RDV
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3">

        <div className="bg-yellow-50 p-3 rounded-xl">
          <p className="text-yellow-700">En attente</p>
          <p className="font-bold">{enAttente}</p>
        </div>

        <div className="bg-green-50 p-3 rounded-xl">
          <p className="text-green-700">Confirmés</p>
          <p className="font-bold">{confirmes}</p>
        </div>

        <div className="bg-red-50 p-3 rounded-xl">
          <p className="text-red-700">Annulés</p>
          <p className="font-bold">{annules}</p>
        </div>

      </div>

      {/* FILTERS */}
      <div className="flex gap-4">

        {/* SEARCH */}
        <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow w-full">

          <FaSearch className="text-gray-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un patient..."
            className="w-full outline-none"
          />

        </div>

        {/* DATE PICKER */}
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="p-3 border rounded-xl"
          placeholderText="Filtrer par date"
        />

        <button
          onClick={() => setSelectedDate(null)}
          className="bg-gray-100 px-4 rounded-xl"
        >
          Reset
        </button>

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {loading ? (
          <div>Chargement...</div>
        ) : filteredAppointments.length === 0 ? (
          <div>Aucun rendez-vous</div>
        ) : (

          filteredAppointments.map((rdv) => (

            <div
              key={rdv.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between"
            >

              {/* INFO */}
              <div>
                <h3 className="font-bold">
                  {rdv.nom} {rdv.prenom}
                </h3>

                <p className="text-sm text-gray-500">
                  {rdv.motif}
                </p>

                <p className="text-xs text-gray-400">
                  {rdv.date_rdv} • {rdv.heure_rdv}
                </p>
              </div>

              {/* STATUS */}
              <div>
                <span className="text-sm font-semibold">
                  {rdv.statut}
                </span>
              </div>

              {/* ACTIONS */}
             {/* ACTIONS */}
<div className="flex items-center gap-3">

{/* VIEW */}
<button
  onClick={() => setSelectedRdv(rdv)}
  title="Voir détails"
  className="text-blue-600 hover:scale-110 transition"
>
  <FaEye />
</button>

{/* EDIT */}
<button
  onClick={() => setEditRdv(rdv)}
  title="Modifier"
  className="text-green-600 hover:scale-110 transition"
>
  <FaEdit />
</button>

{/* DELETE */}
<button
  onClick={() => handleDelete(rdv.id)}
  title="Supprimer"
  className="text-red-600 hover:scale-110 transition"
>
  <FaTrash />
</button>

{/* CONFIRM */}
{rdv.statut === "En attente" && (
  <button
    onClick={() => confirmRdv(rdv.id)}
    title="Confirmer"
    className="text-green-700 hover:scale-110 transition"
  >
    <FaCheck />
  </button>
)}

{/* CANCEL */}
{rdv.statut === "En attente" && (
  <button
    onClick={() => cancelRdv(rdv.id)}
    title="Annuler"
    className="text-red-700 hover:scale-110 transition"
  >
    <FaTimes />
  </button>
)}

</div>
            </div>

          ))

        )}

      </div>

      {/* MODAL VIEW */}
      {selectedRdv && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-xl font-bold mb-4">
              Détails RDV
            </h2>

            <p>{selectedRdv.nom} {selectedRdv.prenom}</p>
            <p>{selectedRdv.motif}</p>
            <p>{selectedRdv.date_rdv}</p>
            <p>{selectedRdv.heure_rdv}</p>

            <button
              onClick={() => setSelectedRdv(null)}
              className="mt-4 w-full bg-gray-200 py-2 rounded-xl"
            >
              Fermer
            </button>

          </div>

        </div>
      )}

    </div>
  );
}