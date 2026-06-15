import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Search, UserPlus } from "lucide-react";
import {
  getDoctors,
  deleteDoctor,
} from "../services/doctorService";
import { useNavigate } from "react-router-dom";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await getDoctors();
      setDoctors(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      setDoctors([]);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer ce médecin ?")) return;

    await deleteDoctor({ id });
    fetchDoctors();
  };

  const filtered = doctors.filter((d) =>
    `${d.nom} ${d.prenom} ${d.specialite}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">Médecins</h1>
          <p className="text-gray-500">Gestion des docteurs</p>
        </div>

        <button
          onClick={() => navigate("/add-doctor")}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex gap-2"
        >
          <UserPlus size={18} />
          Ajouter
        </button>

      </div>

      {/* SEARCH */}
      <div className="mb-6">

        <div className="relative">

          <Search className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Rechercher médecin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 pl-10 p-3 border rounded-xl"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-left">Nom</th>
              <th className="p-4 text-left">Spécialité</th>
              <th className="p-4 text-left">Téléphone</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-6">
                  Aucun médecin
                </td>
              </tr>
            ) : (
              filtered.map((d) => (
                <tr key={d.id} className="border-t hover:bg-slate-50">

                  <td className="p-4 font-medium">
                    {d.nom} {d.prenom}
                  </td>

                  <td className="p-4">{d.specialite}</td>

                  <td className="p-4">{d.telephone}</td>

                  <td className="p-4">{d.email}</td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/edit-doctor/${d.id}`)
                        }
                        className="p-2 bg-green-100 text-green-600 rounded-lg"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(d.id)}
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

      </div>

    </div>
  );
}