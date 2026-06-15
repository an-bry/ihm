import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
const viewPatient = async (id: number) => {
    try {
      const res = await axios.get(
        `http://localhost/backend/patients/detail.php?id=${id}`
      );
  
      const p = res.data;
  
      alert(
        `🧾 FICHE PATIENT
  
  Nom: ${p.nom}
  Prénom: ${p.prenom}
  Sexe: ${p.sexe}
  Téléphone: ${p.telephone}
  Adresse: ${p.adresse}
  Groupe sanguin: ${p.groupe_sanguin}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  
const PatientsList = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔄 FETCH PATIENTS
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost/backend/patients/read.php");
      setPatients(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // 🔍 FILTER SEARCH
  const filteredPatients = patients.filter((p) =>
    `${p.nom} ${p.prenom}`.toLowerCase().includes(search.toLowerCase()) ||
    p.telephone?.includes(search)
  );
  const editPatient = (id: number) => {
    navigate(`/edit-patient/${id}`);
  };
  const deletePatient = async (id: number) => {
    if (!confirm("Voulez-vous supprimer ce patient ?")) return;
  
    try {
      await axios.post("http://localhost/backend/patients/delete.php", {
        id,
      });
  
      // refresh list
      fetchPatients();
  
      alert("Patient supprimé avec succès");
    } catch (err) {
      console.log(err);
    }
  };
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const openEdit = (patient: any) => {
    setSelectedPatient(patient);
    setEditOpen(true);
  };
  const handleEditChange = (e: any) => {
    setSelectedPatient({
      ...selectedPatient,
      [e.target.name]: e.target.value,
    });
  };
  const updatePatient = async () => {
    try {
      await axios.post("http://localhost/backend/patients/update.php", selectedPatient);
  
      setEditOpen(false);
      fetchPatients();
  
      alert("Patient modifié avec succès");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h1 className="text-2xl font-bold text-gray-800">
          Liste des patients
        </h1>

        <div className="flex items-center gap-3">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 border rounded-lg w-48 md:w-56 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />

          {/* ADD BUTTON */}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm shadow-sm transition"
            onClick={() => navigate("/add-patient")}
          >
            + Ajouter
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full text-sm">

          {/* HEADER */}
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-3">Nom</th>
              <th className="text-left px-4 py-3">Prénom</th>
              <th className="text-left px-4 py-3">Sexe</th>
              <th className="text-left px-4 py-3">Téléphone</th>
              <th className="text-left px-4 py-3">Groupe</th>
              <th className="text-center px-4 py-3">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  Chargement...
                </td>
              </tr>
            ) : filteredPatients.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  Aucun patient trouvé
                </td>
              </tr>
            ) : (
              filteredPatients.map((p, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition cursor-pointer"
                >

                  {/* NOM */}
                  <td className="px-4 py-3 font-medium">
                    {p.nom}
                  </td>

                  {/* PRENOM */}
                  <td className="px-4 py-3">
                    {p.prenom}
                  </td>

                  {/* SEXE */}
                  <td className="px-4 py-3">
                    {p.sexe}
                  </td>

                  {/* TELEPHONE */}
                  <td className="px-4 py-3">
                    {p.telephone}
                  </td>

                  {/* GROUPE */}
                  <td className="px-4 py-3">
                    {p.groupe_sanguin || "-"}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3">
                  <td className="px-4 py-3">
  <div className="flex justify-center gap-4">

    {/* VIEW */}
    <button onClick={() => viewPatient(p.id)}>
      <FaEye className="text-gray-600 hover:text-black" />
    </button>

    {/* EDIT */}
    <button onClick={() => openEdit(p)}>
  <FaEdit className="text-blue-600 hover:text-blue-800" />
</button>

    {/* DELETE */}
    <button onClick={() => deletePatient(p.id)}>
      <FaTrash className="text-red-600 hover:text-red-800" />
    </button>

  </div>
</td>

                  </td>
                </tr>
              ))
            )}

          </tbody>
          {editOpen && selectedPatient && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 animate-fadeIn">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Modifier patient
        </h2>

        <button
          onClick={() => setEditOpen(false)}
          className="text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-2 gap-4">

        <input
          name="nom"
          value={selectedPatient.nom}
          onChange={handleEditChange}
          className="border p-2 rounded-lg"
          placeholder="Nom"
        />

        <input
          name="prenom"
          value={selectedPatient.prenom}
          onChange={handleEditChange}
          className="border p-2 rounded-lg"
          placeholder="Prénom"
        />

        <input
          name="telephone"
          value={selectedPatient.telephone}
          onChange={handleEditChange}
          className="border p-2 rounded-lg col-span-2"
          placeholder="Téléphone"
        />

        <select
          name="sexe"
          value={selectedPatient.sexe}
          onChange={handleEditChange}
          className="border p-2 rounded-lg col-span-2"
        >
          <option value="M">Homme</option>
          <option value="F">Femme</option>
        </select>

        <input
          name="groupe_sanguin"
          value={selectedPatient.groupe_sanguin}
          onChange={handleEditChange}
          className="border p-2 rounded-lg col-span-2"
          placeholder="Groupe sanguin"
        />

      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setEditOpen(false)}
          className="px-4 py-2 border rounded-lg"
        >
          Annuler
        </button>

        <button
          onClick={updatePatient}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Sauvegarder
        </button>

      </div>

    </div>
  </div>
)}
        </table>
      </div>
    </div>
    
  );
};

export default PatientsList;