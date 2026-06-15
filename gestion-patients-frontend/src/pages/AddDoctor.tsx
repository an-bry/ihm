import { useState } from "react";
import { createDoctor } from "../services/doctorService";
import { useNavigate } from "react-router-dom";

export default function AddDoctor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    specialite: "",
    telephone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");

    // validation simple IHM
    if (!form.nom || !form.prenom || !form.specialite) {
      setError("Nom, prénom et spécialité sont obligatoires");
      return;
    }

    try {
      setLoading(true);

      await createDoctor(form);

      navigate("/doctors");

    } catch (err) {
      setError("Erreur lors de l'ajout du médecin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Ajouter un médecin
        </h1>

        <p className="text-gray-500 mb-6">
          Remplissez les informations du docteur
        </p>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* NOM */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Nom
            </label>
            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: Rakoto"
            />
          </div>

          {/* PRENOM */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Prénom
            </label>
            <input
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: Jean"
            />
          </div>

          {/* SPECIALITE */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Spécialité
            </label>
            <input
              name="specialite"
              value={form.specialite}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: Cardiologue"
            />
          </div>

          {/* TELEPHONE */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Téléphone
            </label>
            <input
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: 034 00 000 00"
            />
          </div>

          {/* EMAIL */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: doctor@gmail.com"
            />
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={() => navigate("/doctors")}
            className="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
          >
            Annuler
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>

        </div>

      </div>

    </div>
  );
}